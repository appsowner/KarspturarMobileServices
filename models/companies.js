const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema(
  {
    legalName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 45,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
    legalCitizen: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: "Fono de Compañia es requerido",
    },
    platformName: {
      type: String,
      required: "Plataforma de Compañia es requerido",
    },
    platformToken: {
      type: String,
      required: "Token de Compañia es requerido",
    },
    active: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    reportResourceId: {
      type: String,
    },
    reportTemplateId: {
      type: String,
    },
    geofenceResourceId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("companies", companiesSchema);
