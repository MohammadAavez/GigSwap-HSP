// Footer.jsx
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-section">
          <h3>GigSwap</h3>
          <p>Connecting you with trusted home service experts — from plumbing and cleaning to electrical work and gardening. We ensure quality, reliability, and peace of mind with every job.</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><FaPhoneAlt className="footer-icon" /> +91 0000000000</p>
          <p><FaEnvelope className="footer-icon" /> support@GigSwap.com</p>
          <p><FaMapMarkerAlt className="footer-icon" /> Nanded, MH India</p>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 GigSwap. All rights reserved.</p>
      </div>
    </footer>
  );
};
