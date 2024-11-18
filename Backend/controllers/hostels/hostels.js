import Hostel from "../../models/hostels/hostels.js";
import User from "../../models/users/users.js";

const createHostel = async (req, res) => {
  try {
    const userId = req.user.userId;

    const existingHostel = await Hostel.findOne({ user: userId });

    if (existingHostel) {
      return res.status(400).json({
        message: "User already has a registered hostel",
      });
    }

    const newHostel = new Hostel({ ...req.body, user: userId });
    await newHostel.save();

    const user = await User.findById(userId);
    if (user) {
      user.hostel = newHostel._id;
      await user.save();
    } else {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(201)
      .json({ message: "Hostel created successfully", data: newHostel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error?.message });
  }
};

const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().populate("rooms");
    res.status(200).json({ data: hostels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch hostels" });
  }
};

// Get a single hostel by ID
const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }
    res.status(200).json({ data: hostel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch hostel" });
  }
};

const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }
    res
      .status(200)
      .json({ message: "Hostel updated successfully", data: hostel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update hostel" });
  }
};

// Delete a hostel by ID
const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }
    res.status(200).json({ message: "Hostel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete hostel" });
  }
};

export {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
};
