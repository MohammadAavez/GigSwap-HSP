import React from "react";
import "./Details.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Plumbing = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="service-detail">
      <div className="sd-header">
        <img
          className="sd-avatar-circle"
          src="./images/plumb-logo.jpg"
          alt="Service"
        />
        <div className="sd-header-info">
          <h1 className="sd-title">Plumbing Services</h1>
          <p className="sd-address">nanded</p>
          <p className="sd-time">Available: 9:00 AM - 7:00 PM</p>
        </div>
        
        {/* ✅ Plumbing Parameter linked */}
        {isLoggedIn ? (
          <NavLink to="/contact?service=Plumbing">
            <button className="sd-book-btn">Book Now</button>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button className="sd-book-btn">Book Now</button>
          </NavLink>
        )}
      </div>

      <section className="sd-description">
        <strong> About</strong>
        <p>
          <a href="/images/worker-id.pdf" download="worker-id.pdf">
            <button id="dbtn">id </button>
          </a>
          <h3>Worker Detail:-</h3>

          <p>
            <strong>Name</strong>- John Doe
          </p>
          <p>
            <strong>Experience</strong>- 10+ years
          </p>
          <p>
            {" "}
            <strong>Specialties</strong>- "Pipe installation, leak repair, drain
            cleaning"
          </p>
        </p>
        <br />
        <p>
          <h3>Service Details:-</h3>
          <i>
            {" "}
            We provide a wide range of plumbing services, including fixing leaky
            faucets, installing new pipes, clearing clogged drains, and
            repairing water heaters. Our team is dedicated to providing
            efficient and reliable solutions for all your plumbing needs.
          </i>
        </p>
        <div className="gallery">
          <h3>Gallery</h3>
          <div className="gall-images">
            <img src="./images/gallery/plum1.jpeg" alt="" />
            <img src="./images/gallery/plum2.jpeg" alt="" />
            <img src="./images/gallery/plum3.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plumbing;