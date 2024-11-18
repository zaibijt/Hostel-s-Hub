import mongoose from "mongoose";

const { Schema } = mongoose;

const hostelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    map: {
      type: String,
      required: true,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

const Hostel = mongoose.model("Hostel", hostelSchema);

export default Hostel;
