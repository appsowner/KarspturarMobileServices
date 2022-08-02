const { response } = require("express");
const Companies = require("../models/companies");
const Vehicles = require("../models/vehicles");

axios = require("axios");

exports.getToken = async (req, res, next) => {
  const { id } = req.body;
  const dateObject = new Date();
  const date = `0 ${dateObject.getDate()}`.slice(-2);
  const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const miliSeconds = dateObject.getMilliseconds();
  console.log(
    "inicio Token:" +
      `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
  );
  console.log("pasando por getToken :" + id);
  const platform = await Companies.findById(id).exec();
  const seconds2 = dateObject.getSeconds();
  const miliSeconds2 = dateObject.getMilliseconds();
  console.log(
    "paso por Companies:" +
      `${year}-${month}-${date} ${hours}:${minutes}:${seconds2}:${miliSeconds2}`
  );

  if (!platform) {
    errTxt = JSON.parse('{"Err": "Token No encontrado"}');
    res.send(errTxt).status(400);
  } else {
    console.log("datos platform db:", platform);
    cadena_cmd =
      process.env.BASE_URL_WIALON +
      `svc=token/login&params={"token": "${platform.platformToken}","operatingAs": "apiMovinguard"}`;

    console.log("cadena: " + cadena_cmd);
    const resp = await axios.get(cadena_cmd);
    //    sid = resp.data.eid;
    res.locals.sid = resp.data.eid;
    res.locals.reportResourceId = platform.reportResourceId;
    res.locals.reportTemplateId = platform.reportTemplateId;
    res.locals.geofenceResourceId = platform.geofenceResourceId;

    console.log("resultado sid: " + res.locals.sid);
    console.log("resultado reportResourceId: " + res.locals.reportResourceId);
    console.log("resultado reportTemplateId: " + res.locals.reportTemplateId);
    console.log(
      "resultado geofenceResourceId: " + res.locals.geofenceResourceId
    );

    const seconds3 = dateObject.getSeconds();
    const miliSeconds3 = dateObject.getMilliseconds();
    console.log(
      "fin token:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds3}:${miliSeconds3}`
    );
    next();
  }
};
exports.setTimeZone = async (req, res, next) => {
  const { TimeZone } = req.body;
  console.log("datos :" || TimeZone);
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
    "inicio setTimeZone:" +
      `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
  );

  Url_search =
    process.env.BASE_URL_WIALON +
    "svc=render/set_locale&params=" +
    `{"tzOffset":${TimeZone},"language":"ES","flags":0,"formatDate":"%25Y-%25m-%25E %25H:%25M:%25S"}"&sid=` +
    sid;
  console.log(Url_search);
  const setTimeZone = await axios.get(Url_search);
  console.log("response:", setTimeZone.status);

  console.log(
    "fin setTimeZone:" +
      `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
  );

  if (setTimeZone.status == 200) {
    next();
  } else {
    errTxt = JSON.parse('{"Err": "SetTimeZone con errores"}');
    res.send(errTxt).status(400);
  }
};
exports.setCleanUpReport = async (req, res, next) => {
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
    "inicio setCleanUpReport:" +
      `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
  );

  Url_search =
    process.env.BASE_URL_WIALON +
    "svc=report/cleanup_result&params={}&sid=" +
    sid;
  console.log(Url_search);
  const setCleanUpReport = await axios.get(Url_search);
  console.log("response:", setCleanUpReport.status);

  console.log(
    "fin setCleanUpReport:" +
      `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
  );

  if (setCleanUpReport.status == 200) {
    next();
  } else {
    errTxt = JSON.parse('{"Err": "setCleanUpReport con errores"}');
    res.send(errTxt).status(400);
  }
};
exports.getTravelCar = async (req, res, next) => {
  try {
    const sid = res.locals.sid;
    const reportResourceId = res.locals.reportResourceId;
    const reportTemplateId = res.locals.reportTemplateId;

    const dateObject = new Date();
    const date = `0 ${dateObject.getDate()}`.slice(-2);
    const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const miliSeconds = dateObject.getMilliseconds();

    console.log(
      "inicio getTravelCar:" +
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
    );

    console.log("req body:", req.body);
    const { id, TimeZone, idCar, fechaIni, fechaFin } = req.body;
    console.log("datos:", id, TimeZone, idCar, fechaIni, fechaFin);
    const mfecIni = new Date(fechaIni);
    const pFecIni = mfecIni.getTime() / 1000.0;
    const mfecFin = new Date(fechaFin);
    const pFecFin = mfecFin.getTime() / 1000.0;
    console.log("epoch ini:", pFecIni);
    console.log("epoch fin:", pFecFin);

    const VehiclesFound = await Vehicles.findById(idCar).exec();
    // console.log(VehiclesFound);
    console.log(VehiclesFound.idPlatformVehicle);
    if (!VehiclesFound) {
      console.log("error");
    } else {
      console.log("Sin error");
      idCarPlatform = VehiclesFound.idPlatformVehicle;
    }

    Url_search =
      process.env.BASE_URL_WIALON +
      "svc=report/exec_report&params=" +
      `{"reportResourceId":${reportResourceId},"reportTemplateId":${reportTemplateId},"reportObjectId":${idCarPlatform},"reportObjectSecId":0,"interval":{"from":${pFecIni},"to":${pFecFin},"flags":"0x00"}}
      "&sid=` +
      sid;
    console.log(Url_search);
    var Respuesta = [];
    var RespuestaResult = [];
    var RespuestaTables = [];
    var RespuestaTrips = [];
    var TableRows = 0;
    const getTravelCar = await axios.post(Url_search);
    //console.log(getTravelCar);
    Object.entries(getTravelCar).forEach(([key, value]) => {
      if (key == "data") {
        Respuesta = value;
      }
    });
    //  console.log("respuesta", Respuesta);
    Object.entries(Respuesta).forEach(([key, value]) => {
      console.log(key);
      if (key == "reportResult") {
        //       console.log(value);
        RespuestaResult = value;
      }
    });

    //console.log("parseando", RespuestaResult);

    Object.entries(RespuestaResult).forEach(([key, value]) => {
      //   console.log(key);
      if (key == "tables") {
        console.log(value);
        RespuestaTables = value;
      }
    });

    console.log("parseando Tables", RespuestaTables);
    console.log("tables resultado:");

    Object.entries(RespuestaTables).forEach(([key, value]) => {
      //console.log("key:", key);
      // console.log("valores:", value);
      if (key == 0) {
        RespuestaTrips = value;
      }
    });
    console.log("tables trips:");
    Object.entries(RespuestaTrips).forEach(([key, value]) => {
      //   console.log(key);
      if (key == "rows") {
        //   console.log(value);
        TableRows = value;
      }
    });
    console.log("tables rows:", TableRows);

    if (getTravelCar.data !== null) {
      console.log(
        "fin getTravelCar:" +
          `${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${miliSeconds}`
      );
      if (TableRows != 0) {
        //res.status(200).send(getTravelCar.data);
        next();
      } else {
        errTxt = JSON.parse('{"Err": "No hay Datos para intervalo"}');
        res.status(400).send(errTxt);
      }
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
