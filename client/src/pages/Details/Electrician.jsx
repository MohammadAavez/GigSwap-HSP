import React from "react";
import "./Details.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Electrician = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="service-detail">
      <div className="sd-header">
        <img
          className="sd-avatar-circle"
          src="./images/electrician-logo.jpg"
          alt="Service"
        />
        <div className="sd-header-info">
          <h1 className="sd-title">Eelectrician Services</h1>
          <p className="sd-address">nanded</p>
          <p className="sd-time">Available: 9:00 AM - 7:00 PM</p>
        </div>
        
        {/* URL mein ?service=Electrician add kiya hai */}
        {isLoggedIn ? (
          <NavLink to="/contact?service=Electrician">
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
          <p><strong>Name</strong> - David Brown</p>
          <p><strong>Experience</strong> - 10+ years</p>
          <p><strong>Specialties</strong> - "Wiring installation, electrical repairs, lighting setup, circuit breaker replacement"</p>
        </div>

        <br />

        <div>
          <h3>Service Details:-</h3>
          <i>
            We provide expert electrician services for residential and
            commercial properties. Our team specializes in safe and reliable
            wiring, installing lighting fixtures, repairing faulty circuits,
            upgrading electrical panels, and handling emergency electrical
            issues.
          </i>
        </div>

        <div className="gallery">
          <h2>Gallery</h2>
          <div className="gall-images">
            <img src="./images/gallery/e1.jpeg" alt="" />
            <img src="./images/gallery/e2.jpeg" alt="" />
            <img src="./images/gallery/e3.jpeg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Electrician;