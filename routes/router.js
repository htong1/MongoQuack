const express = require("express");
const server = express();

const body_parser = require("body-parser");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongo = require("./db");
const dbName = "msgsdb";
const userCollection = "users";
const msgCollection = "msgs";


const userMiddleware = require("../middleware/users.js");

// << db init >>
mongo.initialize(dbName, userCollection, function(userColl) { // successCallback
    // get all items
    userColl.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    })
})

mongo.initialize(dbName, msgCollection, function(msgColl) { // successCallback
    // get all items
    msgColl.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result)
    });
});

router.get("/read-message", userMiddleware.isLoggedIn, (req, res, next) => {

});

router.get("/read-yourmessage", userMiddleware.isLoggedIn, (req, res, next) => {

});

router.post("/post-message", userMiddleware.isLoggedIn, (req, res, next) => {

});

router.post("/like-message", userMiddleware.isLoggedIn, (req, res, next) => {

});

router.post("/follow-user", userMiddleware.isLoggedIn, (req, res, next) => {

});


router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
  const item = req.body.info;
    userColl.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        console.log(result)
    });
});

router.post("/login", (req, res, next) => {

});

module.exports = router;