import Room from "../../models/hostels/rooms.js";
import Hostel from "../../models/hostels/hostels.js";
import User from "../../models/users/users.js";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PIuE506w2DqiReyXGltb56qWecRr5jye6S5IUdQoeoGVT5VBM2W9FCWpIsPsnpXhVPTJQCIQPQZBspb4b4m6hkP005BNN7AFz"
);

export const createRoom = async (req, res) => {
  try {
    const { hostelId } = req.body;
    // console.log(req.body,'hostelid');

    if (!hostelId) {
      return res.status(400).json({ message: "Hostel ID is required" });
    }

    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    const room = new Room({
      ...req.body,
      hostel: hostelId,
    });
    await room.save();

    hostel.rooms.push(room._id);
    await hostel.save();

    res.status(201).json({ message: "Room created successfully", data: room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ data: rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ data: room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateRoomById = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room updated successfully", data: room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoomById = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Booked Room

export const bookRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (user.bookedRooms.includes(roomId)) {
      return res.status(400).json({ message: "Room already booked by user" });
    }

    user.bookedRooms.push(roomId);
    await user.save();

    room.bookedBy = userId;
    await room.save();

    res.status(200).json({ message: "Room booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//// unbooked

export const unbookedroom = async (req, res) => {
  try {
    const { userId, roomId, userfirstname, userlastname, text, rating } =
      req.body.obj;
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    if (user && room) {
      const objectIdRoomIdToRemove = new mongoose.Types.ObjectId(roomId);
      // rating
      const ratingNumber = parseInt(rating);
      room.rating.push({ rating: ratingNumber });
      // await room.save();
      // const sumOfRatings = room.rating.reduce((total, rating) => total + rating, 0);
      // const averageRating = sumOfRatings / rating.length;
      // room.rating = averageRating
      console.log(room.rating, "room rating");
      // review
      room.reviews.push({ userfirstname, userlastname, text });
      ////
      user.bookedRooms = user.bookedRooms.filter(
        (roomId) => !roomId.equals(objectIdRoomIdToRemove)
      );
      await user.save();
      await room.save();
      res.status(200).json({ message: "remove succesfully" });
    } else {
      res.status(404).json({ message: "user or room not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

////

export const getroombyhostelid = async (req, res) => {
  try {
    const { hostelId } = req.body;

    if (!hostelId) {
      return res.status(400).json({ message: "Hostel ID is required" });
    } else {
      const rooms = await Room.findById(hostelId);
      return res.status(200).json({ rooms: rooms });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

////

export const checkout = async (req, res) => {
  try {
    const cards = req.body.products;

    // Debug: Log the cards array to inspect the prices
    console.log("Cards:", cards);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cards.map((card) => {
        // Debug: Log each card's price to check its value
        console.log("Card Price:", card.price);

        return {
          price_data: {
            currency: "pkr",
            product_data: {
              name: card.title,
            },
            unit_amount: Math.round(card.price * 100), // Stripe requires amount in cents
          },
          quantity: 1,
        };
      }),
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
