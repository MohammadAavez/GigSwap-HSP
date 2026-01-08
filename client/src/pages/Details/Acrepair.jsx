import React from "react";
import "./Details.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Acrepair = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="service-detail">
      <div className="sd-header">
        <img
          className="sd-avatar-circle"
          src="./images/ac-logo.jpeg"
          alt="Service"
        />
        <div className="sd-header-info">
          <h1 className="sd-title">Ac-Repair Services</h1>
          <p className="sd-address">nanded</p>
          <p className="sd-time">Available: 9:00 AM - 7:00 PM</p>
        </div>
        
        {/* ✅ Logic: URL mein ?service=Ac-Repair add kiya gaya hai */}
        {isLoggedIn ? (
          <NavLink to="/contact?service=Ac-Repair">
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
        <p>
          <a href="/images/worker-id.pdf" download="worker-id.pdf">
            <button id="dbtn">id</button>
          </a>
          <h3>Worker Detail:-</h3>
          <p>
            <strong>Name</strong> - Alex Smith
          </p>
          <p>
            <strong>Experience</strong> - 8+ years
          </p>
          <p>
            <strong>Specialties</strong> - "AC installation, maintenance,
            refrigerant leak repair, duct cleaning"
          </p>
        </p>
        <br />
        <p>
          <h3>Service Details:-</h3>
          <i>
            We provide comprehensive AC repair services, including installation
            of new units, diagnosing and fixing cooling issues, refrigerant
            refills, ductwork cleaning, and regular maintenance to keep your air
            conditioning system running efficiently and reliably. Our team
            ensures quick and professional service to keep you cool and
            comfortable.
          </i>
        </p>

        <div className="gallery">
          <h2>Gallery</h2>
          <div className="gall-images">
            <img src="./images/gallery/ac1.jpeg" alt="" />
            <img src="./images/gallery/ac2.jpeg" alt="" />
            <img src="./images/gallery/ac3.jpeg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Acrepair;