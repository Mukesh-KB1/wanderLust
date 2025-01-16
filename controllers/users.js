
const User = require("../models/user");

// SignUp-Rendering
module.exports.signUpRendering = (req,res)=>{
    res.render("./user/signup.ejs");
};

//Sign-Up
module.exports.signUp = async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({username,email});
        const registerUser = await User.register(newUser,password)
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Registered SuccessFully!");
            res.redirect("/listings");
        })
        // req.flash("success","Registered SuccessFully!");
        // res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signUp");
    }
};

//logIN-rendering
module.exports.logInRendering = (req,res)=>{
    res.render("./user/logIn.ejs")
};

//logIn
module.exports.logIn = async(req,res)=>{
    req.flash("success","Welcome To WanderLust");
    let redirectUrl = res.locals.currentRedirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logOut
module.exports.logOut = (req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You Logged Out From WanderLust");
        res.redirect("/listings");
    });
};