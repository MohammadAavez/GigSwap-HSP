const express = require("express");
const workerController = require("../controllers/worker-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const workerMiddleware = require("../middlewares/worker-middleware");

const router = express.Router();

router.route("/contacts").get(authMiddleware, workerMiddleware, workerController.getAllContacts);

// 🟢 Naya Route status update ke liye
router.route("/update-status/:id").patch(authMiddleware, workerMiddleware, workerController.updateBookingStatus);

module.exports = router;