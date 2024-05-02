const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const moment = require('moment');

app.use(cors({
  origin: ['http://localhost:3000',],
  credentials: true
}));
const swaggerjsdoc=require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}


// using morgan middleware 
// Create a rotating write stream
const time=Date()
const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream((time, index) => {
  const currentDate = moment().format('YYYY-MM-DD');
  return `${currentDate}-access.log`; // file name with date
}, {
  interval: '1d', // rotate daily
  path: logDirectory,
});

// Custom token to include request URL and method in log
morgan.token('custom', (req, res) => {
  return `a request to ${req.url} arrived on ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
});

// Morgan middleware setup to log requests to a file with custom format
app.use(morgan(':custom and this is method :method server took :response-time to reply this request with a status code :status', { stream: accessLogStream }));


// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const payment = require("./controller/payment");
const order = require("./controller/order");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const withdraw = require("./controller/withdraw");
const { timeStamp } = require("console");

app.use("/api/v2/order", order);
app.use("/api/v2/user", user);

app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/payment", payment);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/withdraw", withdraw);

const options = {
  definition :{
    openapi:"3.0.0",
    info:{
    title:"Happy Home Api documentation",
    version:"3.0.0"
    },
    servers:[
      {
        url: "http://localhost:8000/api/v2"
      },

    ]
  },
  apis:["./routes/*.js"]
};
// it's for ErrorHandling
const spacs= swaggerjsdoc(options);
app.use("/api-docs",
swaggerui.serve,
swaggerui.setup(spacs));
app.use(ErrorHandler);

module.exports = app;
