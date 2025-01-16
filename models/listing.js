const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");

const listing = mongoose.Schema;
const { Schema } = mongoose;

const listingSchema = new listing({

    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        url : String,
        fileName : String
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    category : {
        type : [String],
        enum : ["Trending","Beachfront","Bed&Breakfasts","Boats","Arctic","Camping","Luxe","AmazingPools","Castle","LakeFront"]
    }

})


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;