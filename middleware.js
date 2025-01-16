const {listingSchema } = require("./schema.js")
const expressE = require("./utils/ExpressError.js")
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {reviewSchema} = require("./schema.js")

module.exports.isAuthenticate = (req,res,next)=>{
  // console.log(req.user);
  // console.log(req.path ,"..",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.currentUrl = req.originalUrl;
        req.flash("error","Please Login to Create Posts");
        return res.redirect("/logIn");
      }
      next();
}

module.exports.saveCurrentUrl = (req,res,next)=>{
  if(req.session.currentUrl){
    res.locals.currentRedirectUrl = req.session.currentUrl;
  }
  next();
}

//listingValidation middleware
module.exports.schemaValidation = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  // console.log(error);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressE(400,errMsg)
  }
  else{
    next();
  }
  // let {result} = listingSchema.validate(req.body);
  // console.log(result);
  // if(result.error){
  //   throw new expressE(400,result.error)
  // }
}

  //--> Review validation middleware

module.exports.reviewValidation = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new expressE(400,errMsg)
  }
  else{
    next();
  }
  
}


module.exports.isOwner = async(req,res,next)=>{
  const {id} = req.params;
      const list = await Listing.findById(id);
      if(!list.owner._id.equals(res.locals.userCheck._id)){
        req.flash("error","Sorry! You don't have access to make changes");
        return res.redirect(`/listings/${id}`);
      }
      else{
        next();
      }
}

module.exports.isReviewOwner = async(req,res,next)=>{
  let {id,reviewId} = req.params;
      const review = await Review.findById(reviewId);
      if(!review.author.equals(res.locals.userCheck._id)){
        req.flash("error","Sorry! You don't have access to make changes");
        return res.redirect(`/listings/${id}`);
      }
      else{
        next();
      }
}
