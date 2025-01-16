const express = require("express");
const route = express.Router();

const {listingSchema } = require("../schema.js")
const asyncWrap = require("../utils/asyncWrap.js")
const expressE = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

const {isAuthenticate ,schemaValidation,isOwner} = require("../middleware.js")

  //Controller 
  const listingController = require("../controllers/listings.js");

  //Listing
  route.get("/",asyncWrap(listingController.allListing));

  //Create List Rendering
  route.get("/new",isAuthenticate,listingController.renderCreateListing);


  //Listing Category
  route.get("/cateogry/:category",asyncWrap(listingController.categoryListing));
  // route.get("cateogry/:category/search",asyncWrap(listingController.searchListing));  //Search in filter Working on it...

  //SearchBar
  // route.get("/search",asyncWrap(listingController.searchListing));
  // route.get("/search",asyncWrap(listingController.searchListing));


  
  //Show,Update and Delete route
  route
  .route("/:id")
  .get(asyncWrap(listingController.showListing))
  .put(upload.single("listing[image]"),schemaValidation,isOwner,asyncWrap(listingController.updateListing))
  .delete(isAuthenticate,isOwner,asyncWrap(listingController.deleteListing))

  
  //Show List
  // route.get("/:id",asyncWrap(listingController.showListing));

  // Create List
  route.post("/create",
    upload.single("listing[image]"),
    asyncWrap(listingController.createListing),
    schemaValidation
  ); //schemaValidation,asyncWrap(listingController.createListing)

  // Create List Choose file
  // route.post("/create",upload.single("listing[image]"),(req,res)=>{
  //   res.send(req.file);
  // })
  
  //Edit List
  route.get("/:id/edit",isAuthenticate,isOwner,asyncWrap(listingController.editListing));
  
  //Update List
  // route.put("/:id",schemaValidation,isOwner,asyncWrap(listingController.updateListing));
  
  //Delete List
  // route.delete("/:id",isAuthenticate,isOwner,asyncWrap(listingController.deleteListing));

  

  module.exports = route;