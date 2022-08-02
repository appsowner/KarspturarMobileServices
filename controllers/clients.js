const Clients = require("../models/clients");
const slugify = require("slugify");
const mongoose = require("mongoose");

//create

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.email);

    const NewClients = await new Clients(req.body).save();
    res.json(NewClients);
  } catch (error) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.list = async (req, res) => {
  try {
    console.log("get List Clients");
    res.json(await Clients.find().sort({ createAt: -1 }).exec());
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.listForCompany = async (req, res) => {
  try {
    const { idCompany } = req.body;
    console.log("get List Clients forCompany", idCompany);
    const id2 = mongoose.Types.ObjectId(idCompany);
    console.log(req.body);
    res.json(
      await Clients.find({ idCompany: id2 }).sort({ createAt: -1 }).exec()
    );
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.readForCompany = async (req, res) => {
  try {
    const { idCompany, idClient } = req.body;
    console.log(req.body);
    const idCompanyQuery = mongoose.Types.ObjectId(idCompany);
    const idClientQuery = mongoose.Types.ObjectId(idClient);
    res.json(
      await Clients.find({
        idCompany: idCompanyQuery,
        id: idClientQuery,
      }).exec()
    );
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.read = async (req, res) => {
  console.log("cliente :", req.param.slug);
  Clients.findOne({ slug: req.params.slug }, (err, client) => {
    if (err || !client) {
      return res.status(404).json({
        error: "Cliente no existe",
      });
    }
    return res.json(client);
  });
};

exports.update = async (req, res) => {
  try {
    console.log("slug :", req.params.slug);
    const updated = await Clients.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Clients UPDATE ERROR ----->", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};
