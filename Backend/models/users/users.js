import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    image: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    hostel: {
      type: Schema.Types.ObjectId,
      ref: "Hostel",
    },
    bookedRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    verificationToken: String,
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// userSchema.methods.validatePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", userSchema);

export default User;
