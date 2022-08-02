const express = require("express");

const router = express.Router();

const {
  createUserAppNotification,
  updateUserAppNotification,
  readUserAppNotification,
} = require("../controllers/userAppNotification");

//endpoints

router.post(
  "/userAppNotification/createUserAppNotification",
  createUserAppNotification
);
router.get(
  "/userAppNotification/readUserAppNotification",
  readUserAppNotification
);
router.put(
  "/userAppNotification/updateUserAppNotification",
  updateUserAppNotification
);

module.exports = router;
