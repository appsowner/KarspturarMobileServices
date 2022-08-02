const express = require("express");

const router = express.Router();

//middlewares

//controllers

const {
  list,
  listForCompany,
  read,
  readForCompany,
  createForCompany,
  updateForCompany,
  changeStatus,
} = require("../controllers/vehicles");

//endpoints
router.get("/vehicles/list", list);
router.get("/vehicles/listForCompany", listForCompany);
router.get("/vehicles/readForCompany", readForCompany);
router.get("/vehicles/:slug", read);

router.post("/vehicles/createForCompany", createForCompany);
router.put("/vehicles/updateForCompany", updateForCompany);
router.put("/vehicles/changeStatus/:slug", changeStatus);

module.exports = router;
