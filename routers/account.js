const express = require("express");
const router = express.Router();
const AccountModel = require("../models/account");

// get all account
router.get("/", (req, res, next) => {
  AccountModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json("loi server");
    });
});

// register account
router.post("/", (req, res, next) => {});

// update account
router.put("/", (req, res, next) => {});

// delete account
router.delete("/", (req, res, next) => {});

module.exports = router;
