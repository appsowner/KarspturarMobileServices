const express = require("express");

const router = express.Router();

const {
  create,
  read,
  update,
  //  listDetails,
  list,
} = require("../controllers/companies");

//endpoints
router.post("/companies/create", create);
router.get("/companies/list", list);
//router.get("/companies/listdetails/:slug", listDetails);
router.get("/companies/:slug", read);
router.put("/companies/:slug", update);

module.exports = router;
