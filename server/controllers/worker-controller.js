const Contact = require("../models/contact-model");

// *-----------------------
//   getAllContacts Logic
// *-----------------------

const getAllContacts = async (req, res, next) => {   // 🔴 next ADD kiya
  try {
    const contacts = await Contact.find();
    console.log(contacts);

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        message: "No Contacts Found",
      });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    next(error);   // 🔴 ab ye sahi kaam karega
  }
};

module.exports = { getAllContacts };
