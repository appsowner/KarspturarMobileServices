const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const vehiclesSchema = new mongoose.Schema(
  {
    idCompany: {
      type: ObjectId,
      ref: "companies",
    },
    vin: {
      type: String,
      required: "VIN de Vehiculo es requerido",
    },
    plateNumber: {
      type: String,
      required: "Identificacion de Vehiculo es requerido",
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      uppercase: true,
    },
    brand: {
      type: String,
      required: "Marca de Vehiculo es requerido",
    },
    model: {
      type: String,
      required: "Modelo de Vehiculo es requerido",
    },
    year: {
      type: Number,
      required: "Año de Vehiculo es requerido",
      maxlength: 4,
    },
    imgUrl: {
      type: String,
    },
    idPlatformVehicle: {
      type: String,
      required: "Id de Vehiculo es requerido",
    },
    initialKm: {
      type: String,
    },
    active: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicles", vehiclesSchema);
