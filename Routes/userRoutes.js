const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userControllers");

// router.route('/login').get(() => {}).post() this can also be done for routing
// we can write router.route("/").post(registerUser); and also router.post("/",registerUser) both are same

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
