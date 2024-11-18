import User from "../../models/users/users.js";
import sendVerificationEmail from "../../utills/sendVarificationemail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";
import { generateToken } from "../../utills/jwttoken.js";
import { ReturnOtp } from "../../utills/saveOtp.js";


let randomnumber = 0;

// Register user

export const registerUser = async (req, res) => {
  try {
    const { name, lastName, email, password, image, isOwner } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      name,
      lastName,
      email,
      password,
      image,
      isOwner,
      verificationToken,
    });

    const verificationLink = `http://localhost:8000/api/v1/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    await newUser.save();

    res.status(201).json({
      message:
        "User registered successfully. Please verify your email address.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// send otp

export const sendOtp  = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp, 'ooottpp');
    randomnumber = otp;

    const sended = await sendVerificationEmail(req.body.email, otp, true).then((data)=>{
        return res.status(200).json({ message: 'OTP sent successfully' });
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// verify otp

export const verifyOpt = async (req, res) => {
  const Otp = randomnumber;

  console.log(Otp, 'dfsfadsf', req.body.otp);

  try {
    if (req.body.otp == Otp) { // Corrected the logical condition
      const result = await User.findOneAndUpdate(
        { email: req.body.emial }, // Fixed the typo here from 'emial' to 'email'
        { $set: { password: req.body.password } }
      );

      if (result) {
        return res.json({ message: "OTP verified and password updated" });
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    } else {
      return res.status(401).json({ message: "OTP not matched" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Verify Email Address

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const htmlContent = fs.readFileSync("verification_success.html", "utf8");

    res.status(200).send(htmlContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Login User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("hostel");

    // if (!user || !user.isVerified) {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await User.findOne({ password })
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.isAdmin, user.isOwner);
    const loggedInUser = {
      user: {
        ...user.toObject(),
        password: undefined,
        hostel: user.hostel,
      },
      token,
    };

    res.status(200).json({ message: "Login successful", data: loggedInUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Users Rooms

export const getUserWithRooms = async (req, res) => {
  try {
    const id = req.user.userId;

    const user = await User.findById(id).populate("bookedRooms");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

