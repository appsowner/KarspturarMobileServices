const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const clientsSchema = new mongoose.Schema(
  {
    idCompany: { type: ObjectId, ref: "companies", required: true },
    name: {
      type: String,
      required: "Nombre de Cliente es requerido",
    },
    slug: {
      type: String,
      index: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: "Apellido de Cliente es requerido",
    },
    email: {
      type: String,
      required: "Email de Cliente es requerido",
      lowercase: true,
    },
    citizenId: {
      type: String,
      required: "Identificacion de Cliente es requerido",
    },
    phoneNumber: {
      type: String,
      required: "Fono de Cliente es requerido",
    },
    active: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    role: {
      type: String,
      default: "suscriptor",
      enum: ["suscriptor", "supervisor", "admin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("clients", clientsSchema);
