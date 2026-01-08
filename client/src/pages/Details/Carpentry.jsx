import React from "react";
import "./Details.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Carpentry = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="service-detail">
      <div className="sd-header">
        <img
          className="sd-avatar-circle"
          src="./images/carpenter-logo.jpeg"
          alt="Service"
        />
        <div className="sd-header-info">
          <h1 className="sd-title">Carpenter Services</h1>
          <p className="sd-address">nanded</p>
          <p className="sd-time">Available: 9:00 AM - 7:00 PM</p>
        </div>
        
        {/* ✅ Updated Link with Service Parameter */}
        {isLoggedIn ? (
          <NavLink to="/contact?service=Carpenter">
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
            <strong>Name</strong> - Robert Harris
          </p>
          <p>
            <strong>Experience</strong> - 15+ years
          </p>
          <p>
            <strong>Specialties</strong> - "Custom furniture making, wooden
            flooring installation, door and window repair, cabinetry"
          </p>
        </div>

        <br />

        <div>
          <h3>Service Details:-</h3>
          <i>
            We provide professional carpentry services for homes and offices,
            specializing in designing and building custom furniture, installing
            and repairing wooden doors and windows, laying high-quality wooden
            flooring, and crafting elegant cabinetry. Whether you need
            restoration of old furniture or installation of modern wooden
            fittings, our skilled team ensures precision, durability, and a
            beautiful finish for every project.
          </i>
        </div>

        <div className="gallery">
          <h2>Gallery</h2>
          <div className="gall-images">
            <img src="./images/gallery/car1.jpeg" alt="" />
            <img src="./images/gallery/car2.jpeg" alt="" />
            <img src="./images/gallery/car3.jpeg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carpentry;