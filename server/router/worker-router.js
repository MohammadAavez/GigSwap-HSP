const express = require("express");
const workerController = require("../controllers/worker-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const workerMiddleware = require("../middlewares/worker-middleware");

const router = express.Router();

// 🔴 workerMiddleware ADD KARNA ZAROORI HAI
router
  .route("/contacts")
  .get(
    authMiddleware,
    workerMiddleware,   // 🔴 THIS LINE WAS MISSING
    workerController.getAllContacts
  );

module.exports = router;
