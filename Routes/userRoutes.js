const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

// router.route('/login').get(() => {}).post() this can also be done for routing
// we can write router.route("/").post(registerUser); and also router.post("/",registerUser) both are same

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);






module.exports = router;
