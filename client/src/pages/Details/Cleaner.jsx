import React from "react";
import "./Details.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Cleaner = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="service-detail">
      <div className="sd-header">
        <img
          className="sd-avatar-circle"
          src="./images/clean-logo.jpg"
          alt="Service"
        />
        <div className="sd-header-info">
          <h1 className="sd-title">Cleaning Services</h1>
          <p className="sd-address">nanded</p>
          <p className="sd-time">Available: 9:00 AM - 7:00 PM</p>
        </div>
        
        {/* ✅ URL Parameter updated to Cleaner */}
        {isLoggedIn ? (
          <NavLink to="/contact?service=Cleaner">
            <button className="sd-book-btn">Book Now</button>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button className="sd-book-btn">Book Now</button>
          </NavLink>
        )}
      </div>

      <section className="sd-description">
        <strong>About</strong>

        <a href="/images/worker-id.pdf" download="worker-id.pdf">
          <button id="dbtn">id</button>
        </a>

        <div>
          <h3>Worker Detail:-</h3>
          <p>
            <strong>Name</strong> - David Williams
          </p>
          <p>
            <strong>Experience</strong> - 6+ years
          </p>
          <p>
            <strong>Specialties</strong> - "Residential deep cleaning, carpet
            shampooing, window cleaning, kitchen & bathroom sanitization"
          </p>
        </div>

        <br />

        <div>
          <h3>Service Details:-</h3>
          <i>
            We provide professional cleaning services to keep your home and
            workspace spotless. Our trained team ensures every corner is
            thoroughly cleaned using eco-friendly products.
          </i>

          <h5>Pricing (Based on Area Size)</h5>
          <ul>
            <li> Up to 500 sq.ft. - ₹800</li>
            <li> 501-1000 sq.ft. - ₹1,500</li>
            <li> 1001-1500 sq.ft. - ₹2,200</li>
            <li> Over 1500 sq.ft. - ₹2,200 + ₹1.5 per extra sq.ft.</li>
          </ul>

          <i>
            Prices include labor, cleaning supplies, and travel costs. Custom
            packages available for regular maintenance.
          </i>
        </div>

        <div className="gallery">
          <h2>Gallery</h2>
          <div className="gall-images">
            <img src="./images/gallery/c1.jpeg" alt="" />
            <img src="./images/gallery/c2.jpeg" alt="" />
            <img src="./images/gallery/c3.jpeg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cleaner;