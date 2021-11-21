import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from 'cookie-parser';
import  userRouter  from './routes/users';
var mongodbutil = require( './db/connection');

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongodbutil.connectToServer(function (err: any) {
  var customerRouter = require('./routes/customer');
  var iceCreamRouter = require('./routes/iceCream');
  var orderDetailsRouter = require('./routes/orderDetails');
  var itemOrderRouter = require('./routes/itemOrder');

  app.use('/users', userRouter);

  app.use('/api/customer', customerRouter);
  app.use('/api/ice-cream', iceCreamRouter);

  // Serve the React static files after build
  app.use(express.static("../client/build"));

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  // All other unmatched requests will return the React app
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
});
