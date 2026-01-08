const Contact = require("../models/contact-model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const contactForm = async (req, res) => {
  try {
    const { username, email, message, address, date, time } = req.body;

    // Save the booking details to the database (address mein link hi save hogi)
    await Contact.create(req.body);

    // Prepare the email content with a clickable link/button
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject: "Service Booking Confirmation - GigSwap",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #4CAF50; text-align: center;">Hello ${username},</h2>
          <p>Thank you for booking a service with <strong>GigSwap</strong>. Your request has been received!</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 5px solid #4CAF50;">
            <p style="margin: 5px 0;"><strong>🛠 Service:</strong> ${message}</p>
            <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${new Date(date).toDateString()}</p>
            <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${time}</p>
          </div>

          <p style="margin-top: 20px;"><strong>📍 Service Location:</strong></p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${address}" target="_blank" style="background-color: #1a73e8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              View Location on Google Maps 📍
            </a>
          </div>

          <p style="font-size: 12px; color: #666;">Raw Link: <a href="${address}">${address}</a></p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p>If you have any questions, please reply to this email.</p>
          <p>Best regards,<br><strong>GigSwap Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "message send successfully" });
  } catch (error) {
    console.error("Error during form submission or email sending:", error);
    return res.status(500).json({ message: "message not delivered" });
  }
};

module.exports = contactForm;