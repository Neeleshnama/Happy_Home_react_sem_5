const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin, isverified } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");
const dotenv = require("dotenv");

router.use(express.urlencoded({ extended: true }));


const { Redis }=require('@upstash/redis')

const client = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
})

async function getOrSetCache(key, cb) {

  const data = await client.get(key);
  if (data) {
    console.log("Cache hit");
    return data;
  }
  console.log("Cache miss");
  const freshData = await cb();
  client.set(key, freshData);
  return freshData;
}


router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
     
      const cachedData = await getOrSetCache("allsellers", async () => {
        return await Shop.find().sort({ createdAt: -1 });
      });
      res.status(200).json({
        success: true,
        sellers: cachedData,
        message: 'Data retrieved from Redis cache',
      });
      
      }
    catch (error) {
      console.error('Route handler error:', error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);





// create shop
router.post("/create-shop", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });


    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "45m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar,address, zipCode,phoneNumber,country,state,city } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
        country,
        state,
        city,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      if(!user.verified) {
        
        return next(new ErrorHandler("your verification is under review! we will reach you shortly", 400));

      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      alert(error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
    // 
      if (!seller ) {
        return next(new ErrorHandler("seller doesn't exists ", 400));
      }
      if (seller.verified === false) {
        
        return next(new ErrorHandler("seller  not verified ", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      alert(error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  async (req, res, next) => {
    try {
      const cachedShops = await getOrSetCache("allsellers", async () => {
        // Retrieve all shops from the database if not found in cache
        const allShops = await Shop.find().lean(); // Use .lean() to get plain JS objects
        return allShops;
      });

      // Check if the requested shop ID exists in the cached data
      const shop = cachedShops.find((shop) => shop._id.toString() === req.params.id);
      if (!shop) {
        // If shop with the requested ID is not found in the cache, fetch from the database
        const freshShop = await Shop.findById(req.params.id);
        if (!freshShop) {
          throw new ErrorHandler(`Shop not found with ID: ${req.params.id}`, 404);
        }
        res.status(201).json({
          success: true,
          shop: freshShop,
          message: "Data retrieved from MongoDB",
        });
      } else {
        // Shop found in the cached data
        res.status(200).json({
          success: true,
          shop,
          message: "Data retrieved from Redis cache",
        });
      }
    } catch (error) {
      console.error("Route handler error:", error);
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsSeller = await Shop.findById(req.seller._id);

        const imageId = existsSeller.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });

        existsSeller.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

  
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller:existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin





// -- admin seller approval

// Update seller verification status
router.put('/approve-seller/:id',
 async (req, res) => {
  try {
    const seller = await Shop.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    if (seller.verified) {
      return res.status(400).json({ message: 'Seller is already verified' });
    }
    seller.verified = true;
    await seller.save();
    res.json({ message: 'Seller verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Fetch all verified sellers
router.get('/verified',isAuthenticated,
isAdmin("Admin"), async (req, res) => {
  try {
    const sellers = await Shop.find({ verified: true });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all not verified sellers
router.get('/notverified',isAuthenticated,
isAdmin("Admin"), async (req, res) => {
  try {
    const sellers = await Shop.find({ verified: false });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/reject-seller/:id', async (req, res) => {
  try {
    const seller = await Shop.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    if (!seller.verified) {
      return res.status(400).json({ message: 'Seller is already unverified' });
    }
    seller.verified = false;
    await seller.save();
    res.json({ message: 'Seller rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});








// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
