const Contact = require("../models/contact-model");

// *-----------------------
//   getAllContacts Logic
// *-----------------------
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

// *---------------------------
//  updateBookingStatus Logic
// *---------------------------
const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, workerName } = req.body;

    const updateData = { status };

    // ✅ Agar status Accepted ya Completed hai, toh worker ka naam save karo
    if (status === "Accepted" || status === "Completed") {
      updateData.acceptedBy = workerName;
    } else if (status === "Pending") {
      updateData.acceptedBy = null; // Pending hone par naam hata do
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