const express = require("express");
const route = express.Router();
const User = require("../models/user");
const asyncWrap = require("../utils/asyncWrap.js");
const passport = require("passport");
const {saveCurrentUrl} = require("../middleware.js")

const userController = require("../controllers/users.js");


route.route("/signUp")
.get(userController.signUpRendering)
.post(asyncWrap(userController.signUp))

route.route("/logIn")
.get(userController.logInRendering)
.post(saveCurrentUrl,passport.authenticate("local",{ failureRedirect: '/logIn' , failureFlash : true}),userController.logIn)

// SignUp-Rendering
// route.get("/signUp",userController.signUpRendering);

//Sign-Up
// route.post("/signUp",asyncWrap(userController.signUp));

//logIn-Rendering
// route.get("/logIn",userController.logInRendering);

//logIn
// route.post("/logIn",saveCurrentUrl,passport.authenticate("local",{ failureRedirect: '/logIn' , failureFlash : true}),userController.logIn);

//logOut
route.get("/logOut",userController.logOut);

module.exports = route;