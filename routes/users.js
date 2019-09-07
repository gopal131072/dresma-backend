const express = require('express');
const router = express.Router();
const controller = require("../controller/users");

router.get("/", controller.getUsers);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;