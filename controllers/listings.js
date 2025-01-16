
const Listing = require("../models/listing.js");


// All Listings
module.exports.allListing = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listing/allListings.ejs",{allListings});
};

//SearchBar

module.exports.searchListing = async(req,res)=>{
  // let allListings = await Listing.find({});
  let search = req.query.search;
  // let search = `${search1.charAt(0).toUpperCase()}${search1.slice(1)}}`;
  console.log(search);

  const allListings = await Listing.find({country: new RegExp(search, 'i') });

  if(!allListings || allListings.length === 0){
    req.flash("error","Destination You Searching For NOT AVAILABLE !");
    res.redirect("/listings");
  }
  else{
    res.render("./listing/search.ejs",{allListings,search});
  }
}

// module.exports.searchListing = async(req,res)=>{
//   const allListings = await Listing.find({});
//   let search = req.query.search;
//   console.log(search.toLowerCase());
//   res.render("./listing/search.ejs",{allListings,search});
// }

//Create Listing Rendering
module.exports.renderCreateListing = (req,res)=>{
    // console.log(req.user);
    res.render("./listing/new.ejs");
};


//Category Listings
module.exports.categoryListing = async(req,res)=>{
  let {category} = req.params;
  console.log(category);
  const allListings = await Listing.find({category : category});

  res.render("./listing/categoryListings.ejs",{allListings,category});
};

//Show Listing
module.exports.showListing = async(req,res)=>{
    let {id}= req.params;
    let lists = await Listing.findById(id).populate({path : "reviews",populate : {path : "author"}}).populate("owner");
    console.log(lists);
    if(!lists){
      req.flash("error","List You Searching For NOT AVAILABLE !");
      res.redirect("/listings");
    }
    else{
      res.render("./listing/viewList.ejs",{lists});
    }
};


//Create Listing
module.exports.createListing = async(req,res)=>{
    // let {title,description,image,price,location,country} = req.body;
  
    // const post = new Listing({
    //   title : title,
    //   description : description,
    //   image : image,
    //   price : price,
    //   location : location,
    //   country : country
    // });
    
    //Storing Link and fileName from req.file
    let url = req.file.path;
    let fileName = req.file.filename;

    // console.log(url + "....." + fileName);

    // res.send(req.body);
    const listing = req.body.listing;
  
    // if(!listing){
    //   throw new expressE(400,"Listing Not Found");
    // }
  
    const post = new Listing(listing);
    
    // if(!post.description){
    //   throw new expressE(400,"Description is missing");
    // }
    // if(!post.country){
    //   throw new expressE(400,"Country is missing");
    // }
    // if(!post.location){
    //   throw new expressE(400,"Location is missing");
    // }
    post.owner = req.user._id;
    post.image = {url,fileName};
    await post.save();
    console.log(listing);
    req.flash("success","New List Added");
    res.redirect("/listings")
};



//Edit Listing
module.exports.editListing = async(req,res,next)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    console.log(list);
    if(!list){
      req.flash("error","List You Search For NOT AVAILABLE !");
      res.redirect("/listings");
    }
    else{
      let originalImage = list.image.url;
      originalImage = originalImage.replace("/upload","/upload/ar_1.0,c_fill,h_100,w_150/bo_5px_solid_lightblue");
      res.render("./listing/edit.ejs",{list,originalImage});
    }
};


//Update Listing
module.exports.updateListing = async(req,res,next)=>{

      const{id} = req.params;
      let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

      if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let fileName = req.file.filename;

        listing.image = {url,fileName};
        await listing.save();
      }
      console.log(await Listing.findById(id));
      req.flash("success","List Updated!");
      res.redirect(`/listings/${id}`)
};

//Delete Listing
module.exports.deleteListing = async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("Post Deleted successfully")
    req.flash("success","List Deleted!");
    res.redirect("/listings");
};

