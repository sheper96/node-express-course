const express = require("express");
const router = express.Router();
const {getPeople, addPerson, getPersonById,updatePersonById,deletPersonById} = require("../controllers/people")

router.get("/", getPeople)

router.get("/:id", getPersonById)

router.put("/:id", updatePersonById)

router.delete("/:id", deletPersonById)

router.post("/", addPerson)

module.exports = router;