const express = require("express");

const router = express.Router();

const {
  create,
  list,
  read,
  update,
  listForCompany,
  readForCompany,
} = require("../controllers/clients");

//endpoints

router.post("/clients/create", create);
router.get("/clients/list", list);
router.get("/clients/listForCompany", listForCompany);
router.get("/clients/readForCompany", readForCompany);
router.get("/clients/:slug", read);
router.put("/clients/:slug", update);

module.exports = router;
