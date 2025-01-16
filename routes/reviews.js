const express = require("express");
const route = express.Router({mergeParams : true});

const asyncWrap = require("../utils/asyncWrap.js")
const expressE = require("../utils/ExpressError.js")
const {reviewSchema} = require("../schema.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {reviewValidation,isAuthenticate,isReviewOwner} = require("../middleware.js")

  //----> Review Controller 
  const reviewController = require("../controllers/reviews.js");
  
  //Create review route
  route.post("/",isAuthenticate,reviewValidation,asyncWrap(reviewController.reviewCreate));
  
  //Delete review route
  route.delete("/:reviewId",isAuthenticate,isReviewOwner,asyncWrap(reviewController.destroyReview));

module.exports = route;