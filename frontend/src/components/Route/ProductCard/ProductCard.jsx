import react , { useState } from "react";
import "./styleproduct.css";
import './ribbion.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
const ProductCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  
  
  const styles = {
    banner: {
      position: 'relative',
      right: -40,
      top: 20,
      width: 160,
      transform: [{ rotate: "45deg" }],
      backgroundColor: 'black',
      color: 'white',
      padding: 8,
      textAlign: 'center',
    },
  };

  return (
    <div>
     {/* //write for new product card */}
     <MDBContainer fluid className="my-5 h-[22rem] w-auto corners">
    <MDBRow>
      <MDBCol md="12" lg="4" className="mb-4 mb-lg-0 h-80">
        <MDBCard>
          <div className="d-flex  p-3">
            <p className="lead mb-0 mr-3"> Combo Offer</p>
            
            <div
              className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
              style={{ width: "35px", height: "35px" }}
            > 
            <div className="ribbion"><div class="box">
  <div class="ribbon-2 ">{data.tags}</div>
</div></div>
            
              {/* {data.tags!=undefined ?(<p className="text-white mb-0 small">{data.tags}</p>):('no')
              } */}
              {/* <p className="text-white mb-0 small">{data.tags}</p>
               */}
            </div>
           
            {/* // wishlist item */}
            <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-12 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-12 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          {/* <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          /> */}
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-4"
            onClick={() => addToCartHandler(data._id)}
            color="#FF0000"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
          </div>
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small">
              <Link to={`/shop/preview/${data?.shop._id}`}>
        <h5 className=" w-36  text-base">{data.shop.name}</h5>
      </Link>
              </p>
              <p className="small text-danger">
                <s>  {data.originalPrice ? data.originalPrice +  "₹" : null}</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
            <h4 className="pb-3 font-[500] w-36">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
              <h4 >
              &nbsp;&nbsp;&nbsp;&nbsp;₹{data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
               
            </h4>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <p class="text-muted mb-0 text-green w-36">
               slots: <span class="fw-bold text-danger"> {data?.sold_out*(-1) }&nbsp;booked</span>
              </p>
              <div class="ms-auto text-warning">
              <Ratings rating={data?.ratings} />
              </div>
            </div>
            
         
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      
      
    </MDBRow>
  </MDBContainer>

    </div>
  );
};

export default ProductCard;
