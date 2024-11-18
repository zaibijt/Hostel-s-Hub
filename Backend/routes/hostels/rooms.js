import express from "express";
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
  bookRoom,
  getroombyhostelid,
  unbookedroom,
  checkout,
} from "../../controllers/hostels/rooms.js";
import AuthChecks from "../../middlewares/auth.js";

const router = express.Router();

// Routes for rooms
router.post("/rooms", AuthChecks, createRoom);
router.post("/book-room", AuthChecks, bookRoom);
router.post("/getroomsbyhostelid", getroombyhostelid);
router.get("/rooms", getRooms);
router.get("/rooms/:id", getRoomById);
router.put("/rooms/:id", updateRoomById);
router.delete("/rooms/:id", deleteRoomById);
router.post('/unbooked',unbookedroom)
router.post('/checkout',checkout)


export default router;
