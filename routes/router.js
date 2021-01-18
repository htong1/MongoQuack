const express = require("express");

const body_parser = require("body-parser");

const router = express.Router();
//const router = express();
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
 console.log("Proceed to find username");
 userColl.find({username: req.body.username}).toArray((error, result) => {
    console.log(result)
    if (result.length > 0) {
      console.log("username is in use!")
      return res.status(409).send({
        msg: "This username is already in use!",
      });
    } else {
      console.log("username is not in use")
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

mongo.initialize(dbName, userCollection, function(userColl) { // successCallback
    // get all items
    userColl.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });

router.post("/login", (req, res, next) => {
console.log("entering/logging in with " + req.body.username);
  console.log(req.body);
   userColl.find({username: req.body.username}).toArray((err, result) => {
    // user does not exists
    if (err) {
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    if (!result.length) {
      return res.status(401).send({
        msg: "You don't exist",
      });
    }
    // check password
    bcrypt.compare(req.body.password, result[0]["password"], (bErr, bResult) => {
      // wrong password
      if (bErr) {
        throw bErr;
        return res.status(401).send({
          msg: "Password is incorrect!",
        });
      }
      if (bResult) {
        const token = jwt.sign(
          {
            username: result[0].username,
            userId: result[0].id,
          },
          "SECRETKEY",
          {
            expiresIn: "7d",
          }
        );
        //userColl.updateOne({})
        return res.status(200).send({
          msg: "Logged in!",
          token,
          user: result[0],
        });
      }
      return res.status(401).send({
        msg: "Username or password is incorrect!",
      });
    });
  });
});
})
module.exports = router;