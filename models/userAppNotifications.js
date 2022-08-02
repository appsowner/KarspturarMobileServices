const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userAppNotification = new mongoose.Schema(
  {
    idCompany: { type: ObjectId, ref: "companies", required: true },
    idCar: { type: ObjectId, ref: "vehicles", required: true },
    idUserApp: { type: ObjectId, ref: "userApp", required: true },
    statusGeofence: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    statusEngineStart: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    statusEngineStop: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    statusEngineLock: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    statusEngineUnLock: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    statusMaxVelocity: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userAppNotification", userAppNotification);
