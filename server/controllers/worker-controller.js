const Contact = require("../models/contact-model");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// 🟢 Naya Function: Status Update karne ke liye
const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, workerName } = req.body;

    const updateData = { status };
    
    // Agar Accept hua toh worker ka naam daalo, warna hata do
    if (status === "Accepted") {
      updateData.acceptedBy = workerName;
    } else if (status === "Pending") {
      updateData.acceptedBy = null;
    }

    const updatedBooking = await Contact.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllContacts, updateBookingStatus };