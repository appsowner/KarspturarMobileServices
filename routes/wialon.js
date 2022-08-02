const express = require("express");

const router = express.Router();

// middlewares

const {
  getToken,
  setTimeZone,
  setCleanUpReport,
  getTravelCar,
} = require("../middleware/wialon");

// controller

const {
  getVehiclesAllCia,
  getVehicleCia,
  getVehicleProfile,
  execVehicleCommand,
  getGeolocation,
  searchPlateNumber,
  getTravelDetailCar,
  getTravelStreetCar,
  getMessageInterval,
  createGeofence,
  updateGeofence,
  deleteGeofence,
  createNotificationGeofence,
  deleteNotificationGeofence,
  changeStatusNotificationGeofence,
} = require("../controllers/wialon");

// endpoints-routes
router.get("/wialon/getVehiclesAllCia", getToken, getVehiclesAllCia);
router.get("/wialon/getVehicleCia", getToken, getVehicleCia);
router.get("/wialon/getVehicleProfile", getToken, getVehicleProfile);
router.get("/wialon/getGeolocation", getToken, getGeolocation);
router.get("/wialon/searchPlateNumber", getToken, searchPlateNumber);
router.get("/wialon/getMessageInterval", getToken, getMessageInterval);
router.get(
  "/wialon/getTravelDetailCar",
  getToken,
  setCleanUpReport,
  setTimeZone,
  getTravelCar,
  getTravelDetailCar
);

router.get(
  "/wialon/getTravelStreetCar",
  getToken,
  setCleanUpReport,
  setTimeZone,
  getTravelCar,
  getTravelStreetCar
);

router.post("/wialon/createGeofence", getToken, createGeofence);
router.post("/wialon/updateGeofence", getToken, updateGeofence);
router.post("/wialon/deleteGeofence", getToken, deleteGeofence);
router.post(
  "/wialon/createNotificationGeofence",
  getToken,
  createNotificationGeofence
);

router.post(
  "/wialon/deleteNotificationGeofence",
  getToken,
  deleteNotificationGeofence
);

router.post(
  "/wialon/changeStatusNotificationGeofence",
  getToken,
  changeStatusNotificationGeofence
);

router.post("/wialon/execVehicleCommand", getToken, execVehicleCommand);

module.exports = router;
