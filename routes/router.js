const express = require("express");

const body_parser = require("body-parser");

//const router = express.Router();
const router = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongo = require("../lib/db.js");
const dbName = "msgsdb";
const userCollection = "users";
const msgCollection = "msgs";


const userMiddleware = require("../middleware/users.js");

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

mongo.initialize(dbName, userCollection, function(userColl) { // successCallback
    // get all items
    userColl.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });

router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
 const item = req.body;
 const username = req.body.username;
 userColl.find(username).toArray((error, result) => {
    if (result.length) {
      return res.status(409).send({
        msg: "This username is already in use!",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          console.log("Proceed to insert" + item);
           userColl.insertOne(item, (error, result) => {
            if (error) {
              throw error;
              return res.status(400).send({
                msg: error,
              });
            }
            return res.status(201).send({
              msg: "Registered!",
            });
          });
        }
      });
    }
  });
})
});

router.post("/login", (req, res, next) => {

});

module.exports = router;