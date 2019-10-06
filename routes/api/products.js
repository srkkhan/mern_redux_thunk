const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoosePaginate = require('mongoose-paginate-v2');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Products= require("../../models/Products");
const options = {
  page: 2,
  limit: 5,
  collation: {
    locale: 'en'
  }
};
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.get("/", (req, res) => {
  // Form validation
  options.page=req.query.pagenum || 1;
  // Find user by email
  // Products.find({skip: 10, limit: 5}).then(products => {
  //     return res.status(200).json({ products});
  // });
  
  Products.paginate({}, options, function(err, result) {
    return res.status(200).json({ result});
    
    // result.docs
    // result.totalDocs = 100
    // result.limit = 10
    // result.page = 1
    // result.totalPages = 10    
    // result.hasNextPage = true
    // result.nextPage = 2
    // result.hasPrevPage = false
    // result.prevPage = null
    // result.pagingCounter = 1
  });
});

module.exports = router;
