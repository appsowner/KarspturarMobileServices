const Companies = require("../models/companies");
const Clients = require("../models/clients");
const slugify = require("slugify");

// create

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.legalCitizen);
    const NewCompanies = await new Companies(req.body).save();
    res.json(NewCompanies);
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.list = async (req, res) => {
  try {
    res.json(await Companies.find({}).sort({ createAt: -1 }).exec());
  } catch (err) {
    res.status(400).send("Error Get Companies:" || err.message);
  }
};

exports.listdetails = async (req, res) => {
  console.log("slug :" + req.params.slug);

  const companies = await Companies.findOne({ slug: req.params.slug }).exec();
  //  console.log(companies);

  const { _id } = companies;

  console.log(companies);
  console.log(_id);

  //res.json(companies);

  const clients = await Clients.find({ companies: _id })
    //    .populate("companies")
    .exec();

  res.json({
    companies,
    clients,
  });
};
exports.read = async (req, res) => {
  try {
    console.log("params :", req.params.slug);
    const companies = await Companies.findOne({ slug: req.params.slug }).exec();
    res.json(companies);
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug);
      console.log("updte :", req.body.slug);
    }
    const updated = await Companies.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    console.log("upd :", updated);
    res.json(updated);
  } catch (err) {
    console.log("Companie UPDATE ERROR ----->", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listRelated = async (req, res) => {
  const companies = await Companies.findById(req.params.slug).exec();

  const related = await Companies.find({
    _id: { $ne: product._id },
  })
    .limit(3)
    //    .populate("category")
    //    .populate("subs")
    .exec();

  res.json(related);
};
