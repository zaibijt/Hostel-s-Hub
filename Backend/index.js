import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users/users.js";
import hostelsRoutes from "./routes/hostels/hostels.js";
import roomsRoutes from "./routes/hostels/rooms.js";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// ============= Middlewares Here ===========
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// =====================================
connectDB();

// ============= Routes Here ===========
app.use("/api/v1", userRoutes);
app.use("/api/v1", hostelsRoutes);

app.use("/api/v1", roomsRoutes);

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USERNAME,
    subject: `${name} - ${subject}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message); // Log error message
    res
      .status(500)
      .send({ error: "Error sending email", message: error.message });
  }
});

// =====================================

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
