const express = require("express");
const ethController = require("../controllers/ethController");
const multipart = require('connect-multiparty');
const rateLimit = require("express-rate-limit");

const multipartMiddleware = multipart({maxFieldsSize: 100 * 1024 * 1024}); // 100MB
const createLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests to this endpoint. Please wait a moment and try again.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();

router.get("/blockNumber", ethController.getBlockNumber);
router.get("/getWalletBalance", ethController.getWalletBalance);
router.get("/getTransactionHistory", ethController.getTransactionHistory);

module.exports = router;