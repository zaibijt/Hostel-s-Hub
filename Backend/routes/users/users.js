import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  getUserWithRooms,
  sendOtp,
  verifyOpt,
} from "../../controllers/users/users.js";
import AuthChecks from "../../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/verify-email", verifyEmail);

router.get("/get-userrooms", AuthChecks, getUserWithRooms);

router.post('/sendOtp',sendOtp)

router.post('/verifyOpt',verifyOpt)

export default router;
