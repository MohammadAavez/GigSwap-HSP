import React from "react";
import "./Details.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const PestControl = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="service-detail">
      <div className="sd-header">
        <img
          className="sd-avatar-circle"
          src="./images/pest-logo.jpg"
          alt="Service"
        />
        <div className="sd-header-info">
          <h1 className="sd-title">Pest-Control Services</h1>
          <p className="sd-address">nanded</p>
          <p className="sd-time">Available: 9:00 AM - 7:00 PM</p>
        </div>
        
        {/* ✅ URL Parameter: ?service=Pest Control */}
        {isLoggedIn ? (
          <NavLink to="/contact?service=Pest Control">
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
            <strong>Name</strong> - Amit Sharma
          </p>
          <p>
            <strong>Experience</strong> - 9+ years
          </p>
          <p>
            <strong>Specialties</strong> - "Termite control, rodent removal,
            cockroach treatment, mosquito and bed bug extermination"
          </p>
        </div>

        <br />

        <div>
          <h3>Service Details:-</h3>
          <i>
            We provide professional pest control services for residential,
            commercial, and industrial properties. Our team is trained in safe
            and effective methods to eliminate termites, rodents, cockroaches,
            bed bugs, mosquitoes, and other pests. We use eco-friendly and
            government-approved chemicals to ensure the safety of your family,
            pets, and the environment. Our goal is to deliver long-lasting
            results with minimal disruption.
          </i>
        </div>

        <div className="gallery">
          <h2>Gallery</h2>
          <div className="gall-images">
            <img src="./images/gallery/pest1.jpeg" alt="" />
            <img src="./images/gallery/pest2.jpeg" alt="" />
            <img src="./images/gallery/pest3.jpeg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PestControl;