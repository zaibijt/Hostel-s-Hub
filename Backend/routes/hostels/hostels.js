import express from "express";
import {
  createHostel,
  deleteHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
} from "../../controllers/hostels/hostels.js";
import AuthChecks from "../../middlewares/auth.js";

const router = express.Router();

router.post("/create-hostel", AuthChecks, createHostel);

router.get("/hostels", getAllHostels);

router.get("/hostels/:id", getHostelById);

router.put("/hostels/:id", updateHostel);

router.delete("/hostels/:id", deleteHostel);

export default router;
