axios = require("axios");
const mongoose = require("mongoose");
const Vehicles = require("../models/vehicles");

exports.getVehiclesAllCia = async (req, res) => {
  try {
    const sid = res.locals.sid;
    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=core/search_items&params=" +
      `{"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*","sortType":"sys_name"},"force":1,"flags":1,"from":0,"to":0}"&sid=` +
      sid;
    console.log(Url_search);
    const vehicleAllCia = await axios.get(Url_search);
    res.status(200).send(vehicleAllCia.data.items);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getVehicleCia = async (req, res) => {
  try {
    const { plateNumber } = req.body;
    const sid = res.locals.sid;
    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=core/search_items&params=" +
      `{"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"${plateNumber}","sortType":"sys_name"},"force":1,"flags":8388608,"from":0,"to":0}"&sid=` +
      sid;
    const vehicleCia = await axios.get(Url_search);
    if (vehicleCia.data.items !== null) {
      res.status(200).send(vehicleCia.data.items);
    } else {
      errTxt = JSON.parse('{"Err": "No encontrado"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getVehicleProfile = async (req, res) => {
  try {
    const { plateNumber } = req.body;
    const sid = res.locals.sid;
    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=core/search_items&params=" +
      `{"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"${plateNumber}","sortType":"sys_name"},"force":1,"flags":4611686018427387903,"from":0,"to":0}"&sid=` +
      sid;
    const vehicleCia = await axios.get(Url_search);
    console.log("datos :" + vehicleCia.data.items);

    if (vehicleCia.data.items !== null) {
      res.status(200).send(vehicleCia.data.items);
    } else {
      errTxt = JSON.parse('{"Err": "No encontrado"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.execVehicleCommand = async (req, res) => {
  try {
    const { plateNumber, command } = req.body;
    const sid = res.locals.sid;
    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=unit/exec_cmd&params=" +
      `{"itemId":23415191,"commandName":"${command}","linkType":"gsm","param":"","timeout":1}&sid=` +
      sid;
    console.log(Url_search);
    console.log("variable local:" + res.locals.sid);
    const exeCommand = await axios.get(Url_search);
    console.log(exeCommand.data.error);
    if (exeCommand.data.error === 5) {
      errTxt = JSON.parse('{"Status": "NOK"}');
      res.status(400).send(errTxt);
    } else {
      errTxt = JSON.parse('{"Status": "OK"}');
      res.status(200).send(errTxt);
    }
  } catch (err) {
    res.sendStatus(400).send(errTxt);
  }
};

exports.getGeolocation = async (req, res) => {
  try {
    const { plateNumber } = req.body;
    const sid = res.locals.sid;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio Geoloction:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=core/search_items&params=" +
      `{"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"${plateNumber}","sortType":"sys_name"},"force":1,"flags":1024,"from":0,"to":0}"&sid=` +
      sid;
    const Geolocation = await axios.get(Url_search);
    if (Geolocation.data.items !== null) {
      console.log(
        "fin Geolocation:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).send(Geolocation.data);
    } else {
      errTxt = JSON.parse('{"Err": "No encontrado"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.searchPlateNumber = async (req, res) => {
  try {
    const { plateNumber } = req.body;
    const sid = res.locals.sid;

    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio searchPlateNumber:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);
    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=core/search_items&params=" +
      `{"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"${plateNumber}","sortType":"sys_name"},"force":1,"flags":1024,"from":0,"to":0}"&sid=` +
      sid;
    console.log(Url_search);
    const searchPlateNumber = await axios.get(Url_search);

    if (searchPlateNumber.data.items !== null) {
      console.log(
        "fin searchPlateNumber:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).send(searchPlateNumber.data);
    } else {
      errTxt = JSON.parse('{"Err": "No encontrado"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.getMessageInterval = async (req, res) => {
  try {
    console.log("req body:", req.body);
    const { id, idCar, fechaIni, fechaFin } = req.body;
    console.log("datos:", id, idCar, fechaIni, fechaFin);
    const mfecIni = new Date(fechaIni);
    const pFecIni = mfecIni.getTime() / 1000.0;
    const mfecFin = new Date(fechaFin);
    const pFecFin = mfecFin.getTime() / 1000.0;
    console.log("epoch ini:", pFecIni);
    console.log("epoch fin:", pFecFin);
    const sid = res.locals.sid;

    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio getMessageInterval:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    const VehiclesFound = await Vehicles.findById(idCar).exec();
    // console.log(VehiclesFound);
    //console.log(VehiclesFound.idPlatformVehicle);
    if (!VehiclesFound) {
      console.log("error");
    } else {
      console.log("Sin error");
      idCarPlatform = VehiclesFound.idPlatformVehicle;
    }

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=messages/load_interval&params=" +
      `{"itemId":${idCarPlatform},"timeFrom":${pFecIni},"timeTo":${pFecFin},"flags":1,"flagsMask":"1","loadCount":"0xffffffff"}"&sid=` +
      sid;

    var RespuestaPos = [];
    var RespuestaPosMessage = [];
    const getMessageInterval = await axios.put(Url_search);
    // console.log("json Interval");
    // console.log(getMessageInterval.status);
    // console.log(getMessageInterval.statusText);

    Object.entries(getMessageInterval).forEach(([key, value]) => {
      if (key === "data") {
        RespuestaPos = value;
      }
    });
    Object.entries(RespuestaPos).forEach(([key, value]) => {
      if (key == "messages") {
        RespuestaPosMessage = value;
      }
    });

    if ((getMessageInterval.status = 200)) {
      console.log(
        "fin getMessageInterval:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(RespuestaPosMessage);
    } else {
      errTxt = JSON.parse('{"Err": "No encontrado"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.getTravelDetailCar = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio getTravelDetailCar:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=report/get_result_rows&params=" +
      `{"tableIndex":0,"indexFrom":0,"indexTo":1000}&sid=` +
      sid;
    console.log(Url_search);

    const getTravelDetailCar = await axios.post(Url_search);
    console.log(getTravelDetailCar);

    if (getTravelDetailCar.data !== null) {
      console.log(
        "fin getTravelDetailCar:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(getTravelDetailCar.data);
    } else {
      errTxt = JSON.parse('{"Err": "No encontrado"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.getTravelStreetCar = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio getTravelDetailCar:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=report/get_result_rows&params=" +
      `{"tableIndex":0,"indexFrom":0,"indexTo":1000}&sid=` +
      sid;
    console.log(Url_search);

    getTravelDetailCar = await axios.post(Url_search);
    console.log(getTravelDetailCar);

    if (getTravelDetailCar.data !== null) {
      console.log(
        "fin getTravelDetailCar:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(getTravelDetailCar.data);
    } else {
      errTxt = JSON.parse('{"Err": "No encontrado"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.createGeofence = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const reportResourceId = res.locals.reportResourceId;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio createGeofence:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);
    const { nameGeofence, descriptionGeofence, longitude, latitude, radius } =
      req.body;

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=resource/update_zone&params=" +
      `{"n":"${nameGeofence}","d":"${descriptionGeofence}","t":3,"w":${radius},"f":112,"c":2568583984,"tc":16733440,"ts":12,"min":0,"max":18,"libId":"","path":"","p":[{"x":${latitude},"y":${longitude},"r":${radius}}],"itemId":${reportResourceId},"id":0,"callMode":"create"}&sid=` +
      sid;
    console.log("url search:", Url_search);

    const createGeofence = await axios.post(Url_search);

    console.log(createGeofence);
    if (createGeofence.status == 200) {
      console.log(
        "fin createGeofence:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(createGeofence.data);
    } else {
      errTxt = JSON.parse('{"Err": "Error createGeofence"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.updateGeofence = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const reportResourceId = res.locals.reportResourceId;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio updateGeofence:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);
    const {
      idCar,
      idGeofence,
      nameGeofence,
      descriptionGeofence,
      radius,
      longitude,
      latitude,
    } = req.body;

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=resource/update_zone&params=" +
      `{"itemId":${reportResourceId} ,"id": ${idGeofence},"callMode": "update","n": "${nameGeofence}","d": "${descriptionGeofence}","t": 3,"w": ${radius},"f": 112,"c": 2566914303,"tc": 16733440,"ts": 12,"min": 0,"max": 18,"p": [{"x":${latitude} ,"y":${longitude},"r": ${radius}}]}&sid=` +
      sid;
    console.log("url search:", Url_search);

    const updateGeofence = await axios.post(Url_search);

    console.log(updateGeofence);
    if (updateGeofence.status == 200) {
      console.log(
        "fin updateGeofence:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(updateGeofence.data);
    } else {
      errTxt = JSON.parse('{"Err": "Error updateGeofence"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.deleteGeofence = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const reportResourceId = res.locals.reportResourceId;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio deleteGeofence:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);
    const { idCar, idGeofence } = req.body;

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=resource/update_zone&params=" +
      `{"id": ${idGeofence},"itemId": ${reportResourceId},"callMode":"delete"}&sid=` +
      sid;
    console.log("url search:", Url_search);

    const deleteGeofence = await axios.post(Url_search);

    console.log(deleteGeofence);
    if (deleteGeofence.status == 200) {
      console.log(
        "fin deleteGeofence:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(deleteGeofence.data);
    } else {
      errTxt = JSON.parse('{"Err": "Error deleteGeofence"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
// exports.changeStatusNotificationGeofence = async (req, res) => {};
exports.createNotificationGeofence = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const reportResourceId = res.locals.reportResourceId;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio createNotificationGeofence:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    const mfecIni = new Date();
    const pFecIni = mfecIni.getTime() / 1000;
    console.log("epoch ini:", pFecIni);

    console.log("req body:", req.body);
    const { idCar, idGeofence, TypeNotificationGeofence } = req.body;
    idCarPlatform = "";

    const VehiclesFound = await Vehicles.findById(idCar).exec();
    // console.log(VehiclesFound);
    //console.log(VehiclesFound.idPlatformVehicle);
    if (!VehiclesFound) {
      console.log("error");
    } else {
      console.log("Sin error");
      idCarPlatform = VehiclesFound.idPlatformVehicle;
    }
    //    txtNotificacion = `{\n   \'plateNumber\': \'25%UNIT%25\',\n   \'Location\': \'25%LAST_LOCATION%25\',\n   \'Time\': \'25%MSG_TIME%25\'\n}`;
    porcentaje = `%25`;
    porcentaje2 = `%25`;
    units = `UNIT`;
    zone_desc = `ZONE_DESC`;

    saltoLinea = "\n";

    txtNotificacion = `{'idCar':'${porcentaje}${units}${porcentaje}','Geofence_desc':${porcentaje}${zone_desc}${porcentaje}}`;

    if (TypeNotificationGeofence == 0) {
      txtTypeNotification = "IN";
      urlNotificacion = process.env.BASE_URL_GEOFENCE_IN;
    } else {
      txtTypeNotification = "OUT";
      urlNotificacion = process.env.BASE_URL_GEOFENCE_OUT;
    }

    NameNotificacion = idCar + "_" + idGeofence + "_" + txtTypeNotification;
    Url_search =
      process.env.BASE_URL_WIALON +
      `svc=resource/update_notification&params={"n":"${NameNotificacion}","ta":${Math.trunc(
        pFecIni
      )},"td":0,"tz":134217728,"la":"ru","ma":0,"sch":{"f1":0,"f2":0,"t1":0,"t2":0,"m":0,"y":0,"w":0,"fl":0},"ctrl_sch":{"f1":0,"f2":0,"t1":0,"t2":0,"m":0,"y":0,"w":0,"fl":0},"un":[${idCarPlatform}],"trg": {"t": "geozone","p": {"geozone_id": "${idGeofence}","geozone_ids": "${idGeofence}","type": "${TypeNotificationGeofence}"}},"d":"","act": [{"t": "push_messages","p": {"get": "0","url": "${urlNotificacion}"}}],"txt":"${txtNotificacion}","fl":0,"mast":0,"mpst":0,"cdt":0,"mmtd":3600,"cp":3600,"id":0,"itemId":${reportResourceId},"callMode":"create"}&sid=` +
      sid;

    console.log("url search:", Url_search);

    const createNotificationGeofence = await axios.post(Url_search);

    console.log(createNotificationGeofence);
    if (createNotificationGeofence.status == 200) {
      console.log(
        "fin createNotificationGeofence:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(createNotificationGeofence.data);
      console.log("txtNotificacion :", txtNotificacion);
    } else {
      errTxt = JSON.parse('{"Err": "Error createNotificationGeofence"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.deleteNotificationGeofence = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const reportResourceId = res.locals.reportResourceId;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio deleteNotificationGeofence:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);
    const { idCar, idGeofence } = req.body;

    Url_search =
      process.env.BASE_URL_WIALON +
      `svc=resource/update_notification&params={"id":${idGeofence},"itemId":${reportResourceId},"callMode":"delete"}&sid=` +
      sid;

    console.log("url search:", Url_search);

    const deleteNotificationGeofence = await axios.post(Url_search);

    console.log(deleteNotificationGeofence);
    if (deleteNotificationGeofence.status == 200) {
      console.log(
        "fin deleteNotificationGeofence:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(deleteNotificationGeofence.data);
    } else {
      errTxt = JSON.parse('{"Err": "Error deletecreateNotificationGeofence"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
exports.changeStatusNotificationGeofence = async (req, res) => {
  try {
    const sid = res.locals.sid;
    const reportResourceId = res.locals.reportResourceId;
    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio createNotificationGeofence:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    const mfecIni = new Date();
    const pFecIni = mfecIni.getTime() / 1000;
    console.log("epoch ini:", pFecIni);

    console.log("req body:", req.body);
    const { idCar, idGeofence, TypeNotificationGeofence, status } = req.body;
    idCarPlatform = "";

    const VehiclesFound = await Vehicles.findById(idCar).exec();
    // console.log(VehiclesFound);
    //console.log(VehiclesFound.idPlatformVehicle);
    if (!VehiclesFound) {
      console.log("error");
    } else {
      console.log("Sin error");
      idCarPlatform = VehiclesFound.idPlatformVehicle;
    }
    //    txtNotificacion = `{\n   \'plateNumber\': \'25%UNIT%25\',\n   \'Location\': \'25%LAST_LOCATION%25\',\n   \'Time\': \'25%MSG_TIME%25\'\n}`;
    porcentaje = `%25`;
    porcentaje2 = `%25`;
    units = `UNIT`;
    zone_desc = `ZONE_DESC`;

    saltoLinea = "\n";

    txtNotificacion = `{'idCar':'${porcentaje}${units}${porcentaje}','Geofence_desc':${porcentaje}${zone_desc}${porcentaje}}`;

    if (TypeNotificationGeofence == 0) {
      txtTypeNotification = "IN";
      urlNotificacion = process.env.BASE_URL_GEOFENCE_IN;
    } else {
      txtTypeNotification = "OUT";
      urlNotificacion = process.env.BASE_URL_GEOFENCE_OUT;
    }

    NameNotificacion = idCar + "_" + idGeofence + "_" + txtTypeNotification;
    Url_search =
      process.env.BASE_URL_WIALON +
      `svc=resource/update_notification&params={"n":"${NameNotificacion}","ta":${Math.trunc(
        pFecIni
      )},"td":0,"tz":134217728,"la":"ru","ma":0,"sch":{"f1":0,"f2":0,"t1":0,"t2":0,"m":0,"y":0,"w":0,"fl":0},"ctrl_sch":{"f1":0,"f2":0,"t1":0,"t2":0,"m":0,"y":0,"w":0,"fl":0},"un":[${idCarPlatform}],"trg": {"t": "geozone","p": {"geozone_id": "${idGeofence}","geozone_ids": "${idGeofence}","type": "${TypeNotificationGeofence}"}},"d":"","act": [{"t": "push_messages","p": {"get": "0","url": "${urlNotificacion}"}}],"txt":"${txtNotificacion}","fl":${status},"mast":0,"mpst":0,"cdt":0,"mmtd":3600,"cp":3600,"id":${idGeofence},"itemId":${reportResourceId},"callMode":"update"}&sid=` +
      sid;

    console.log("url search:", Url_search);

    const createNotificationGeofence = await axios.post(Url_search);

    console.log(createNotificationGeofence);
    if (createNotificationGeofence.status == 200) {
      console.log(
        "fin createNotificationGeofence:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      res.status(200).json(createNotificationGeofence.data);
      console.log("txtNotificacion :", txtNotificacion);
    } else {
      errTxt = JSON.parse('{"Err": "Error createNotificationGeofence"}');
      res.status(400).send(errTxt);
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};
