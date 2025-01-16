if(process.env.NODE_ENV != "production"){
   require('dotenv').config();
}
// console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const asyncWrap = require("./utils/asyncWrap.js")
const expressE = require("./utils/ExpressError.js")
const {listingSchema , reviewSchema} = require("./schema.js")
const Review = require("./models/review.js");
const listingController = require("./controllers/listings.js");
// const { MongoClient, ServerApiVersion } = require('mongodb');


// All routes used in Project
const listRoute = require("./routes/listings.js");
const reviewRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");

// ---> session and Flash included
const session = require("express-session");
const flash = require("connect-flash");
//-->MongoStore session 
const MongoStore = require('connect-mongo'); 

// Passport included
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

// View path
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")));

app.engine("ejs",ejsMate);

const atlasUrl = process.env.ATLASDB_URL;

main().then(()=>console.log("Connection Created")).catch(err => console.log(err));


async function main() {
  await mongoose.connect(atlasUrl);
}


//---> Mongo session store
const store = MongoStore.create({
    mongoUrl:atlasUrl,
    crypto: {
      secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error",()=>{
  console.log("ERROR FOUND IN MONGO SESSION STORE",err);
})

// ---->session Express
const sessionOption = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000  ,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true
  }
}

// Express session and Flash Middleware
app.use(session(sessionOption));
app.use(flash());


// Passport Middlewares 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Flash Midlleware
app.use((req,res,next)=>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.userCheck = req.user;
  // console.log(res.locals.successMsg);
  next();
})

// app.get("/",(req,res)=>{
//     res.send("Root working")
// })
//Search Box in Main Page
app.get("/search",asyncWrap(listingController.searchListing));


// app.get("/demoUser",async(req,res)=>{
//   const demoUser = new User({
//     email : "Mukesh@123Gmail.com",
//     username : "Gukesh"
//   })

//   const user = await User.register(demoUser,"Mukesh666");
//   res.send(user);
// })

// All Routes Used
app.use("/listings",listRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute);


app.listen(8080,()=>{
  console.log("App is listening at the port 8080");
})

app.all("*",(req,res,next)=>{
  next(new expressE(404,"PAGE NOT FOUND"));
})

//Error-handling-Middleware

app.use((err,req,res,next)=>{
  // res.send("Some Error occured");
  const{status = 500,message = "Something Went Wrong"} = err;
  
  res.status(status).render("error.ejs",{err});
  // res.status(status).send(message);
})




// --> Testing and Delete 


// app.get("/testListings",async(req,res)=>{
//     const l1 = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await l1.save();
//     console.log("sample was saved");
//     res.send("testListing working...");
// })

// Listing.findByIdAndDelete('676d939a80fe0d5fc9f4861f').then(()=>{
//   console.log("Deleted")
// }).catch((err)=>{
//   console.log(err);
  
// })