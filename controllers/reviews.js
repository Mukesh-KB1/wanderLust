const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create Review
module.exports.reviewCreate = async(req,res)=>{
    let list = await Listing.findById(req.params.id);
    let newUser = new Review(req.body.review);

    newUser.author = req.user._id;
    console.log(newUser);

    list.reviews.push(newUser);
  
    await newUser.save();
    await list.save();
  
    console.log("Review saved");
    // res.redirect("/listings/:id");
    // res.send("Review saved");
    req.flash("success","New Review Added!");
    res.redirect(`/listings/${list._id}`);
};

//Delete Review
module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
  
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted!");

    res.redirect(`/listings/${id}`)
};