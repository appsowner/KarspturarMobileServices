const userAppNotificationMd = require("../models/userAppNotifications");
const mongoose = require("mongoose");

exports.createUserAppNotification = async (req, res) => {
  try {
    console.log("in createUserAppNotification");
    console.log(req.body);
    const userAppNotification = await new userAppNotificationMd(
      req.body
    ).save();
    res.json(userAppNotification);
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.updateUserAppNotification = async (req, res) => {
  try {
    console.log("slug :", req.params.slug);
    const updated = await userAppNotificationMd
      .findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })
      .exec();
    res.json(updated);
  } catch (err) {
    console.log("userAppNotificationMd UPDATE ERROR ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.readUserAppNotification = async (req, res) => {
  console.log("in readUserAppNotification");
  console.log(req.body);
  const { idCompany, idCar, idUserApp } = req.body;

  const idCompanyQuery = mongoose.Types.ObjectId(idCompany);
  const idCarQuery = mongoose.Types.ObjectId(idCar);
  const idUserAppQuery = mongoose.Types.ObjectId(idUserApp);

  userAppNotificationMd.findOne(
    {
      idCompany: idCompanyQuery,
      idCar: idCarQuery,
      idUserApp: idUserAppQuery,
    },
    (err, userAppNotificationqry) => {
      if (err || !userAppNotificationqry) {
        return res.status(404).json({
          error: "No existe Configuracion Notificaciones",
        });
      }
      return res.json(userAppNotificationqry);
    }
  );
};
