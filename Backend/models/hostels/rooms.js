import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    capacity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    near: {
      type: String,
      required: false,
    },
    rating: {
      type: [],
      required: false,
    },
    hostel: {
      type: Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
