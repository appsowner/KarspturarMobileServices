const Vehicles = require("../models/vehicles");
const slugify = require("slugify");
const mongoose = require("mongoose");

exports.list = async (req, res) => {
  try {
    res.json(await Vehicles.find({}).sort({ createAt: -1 }).exec());
  } catch (err) {
    res.status(400).send("Err get list vehicles", err);
  }
};

exports.listForCompany = async (req, res) => {};
exports.read = async (req, res) => {
  try {
    console.log("params", req.params.slug);
    Vehicles.findOne({ slug: req.params.slug }, (err, vehicle) => {
      if (err || !vehicle) {
        return res.status(404).json({
          error: "Vehiculo no existe",
        });
      }
      return res.json(vehicle);
    });
  } catch (err) {
    send.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.readForCompany = async (req, res) => {
  try {
    const { idCompany, idVehicle } = req.body;
    console.log(req.body);
    res.json(
      await Vehicles.find({
        _id: idVehicle,
        idCompany: idCompany,
      }).exec()
    );
  } catch (err) {
    res.status(400).send(err.message);
  }
};
exports.createForCompany = async (req, res) => {
  try {
    console.log(req.body);
    const vehicle = new Vehicles(req.body);
    vehicle.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        vehicle,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      code: err.code,
    });
  }
};
exports.updateForCompany = async (req, res) => {
  try {
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug);
      console.log("update vehicle:", req.body.slug);
    }
    const update = await Vehicles.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      req.body,
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.changeStatus = async (req, res) => {
  try {
    console.log(req.body);
    const { status } = req.body;
    const update = await Vehicles.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { active: status },
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
