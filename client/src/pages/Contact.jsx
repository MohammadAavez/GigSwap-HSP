import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Hook import kiya
import "./Styles/Contact.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
  address: "",
  date: "",
  time: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const { user } = useAuth();
  const location = useLocation(); // Location initialize kiya

  // --- NEW LOGIC: URL se service read karne ke liye ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceFromURL = params.get("service");
    if (serviceFromURL) {
      setContact((prev) => ({ ...prev, message: serviceFromURL }));
    }
  }, [location]);

  useEffect(() => {
    if (userData && user) {
      setContact((prev) => ({
        ...prev,
        username: user.username,
        email: user.email,
        message: contact.message || prev.message, // URL wali value preserve rakhega
      }));
      setUserData(false);
    }
  }, [userData, user, contact.message]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation is not supported by your browser");
    }
    setLoadingLocation(true);
    const options = { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setContact((prev) => ({ ...prev, address: mapLink }));
        toast.success("Exact Location Captured! 📍");
        setLoadingLocation(false);
      },
      (error) => {
        setLoadingLocation(false);
        toast.error("Error: " + error.message);
      },
      options
    );
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.address) return toast.warn("Please capture your location first!");
    try {
      const response = await fetch("http://localhost:8000/api/form/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        setContact({ ...defaultContactFormData, username: user.username, email: user.email });
        toast.success("Service Booked Successfully. A confirmation email has been sent.");
      } else {
        toast.error("Failed to book service.");
      }
    } catch (error) {
      toast.error("Network error.");
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Book Your Service</h1>
      </div>
      <div className="container grid grid-two-cols">
        <div className="contact-img"><img src="/images/support.png" alt="support" /></div>
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" value={contact.username} readOnly />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={contact.email} readOnly />
            </div>
            <div>
              <label htmlFor="message">Services</label>
              <select 
                name="message" 
                value={contact.message} 
                onChange={handleInput} 
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", marginTop: "5px", border: "1px solid #ccc", backgroundColor: "#fff" }}
              >
                <option value="">Select Service</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Ac-Repair">Ac-Repair</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Pest Control">Pest Control</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Service Location</label>
              <div style={{ marginTop: "10px" }}>
                {!contact.address ? (
                  <button type="button" onClick={getLocation} style={{ background: "#9f6fffff", color: "#fff", border: "none", padding: "12px", borderRadius: "5px", width: "100%", fontWeight: "bold" }}>
                    {loadingLocation ? "Detecting Location..." : "📍 Click to Get Current Location"}
                  </button>
                ) : (
                  <div style={{ padding: "12px", border: "2px solid #28a745", borderRadius: "5px", textAlign: "center", backgroundColor: "#f8fff9" }}>
                    <a href={contact.address} target="_blank" rel="noreferrer" style={{ color: "#28a745", fontWeight: "bold", textDecoration: "none" }}>✅ Location Captured (View Map)</a>
                    <p onClick={() => setContact({...contact, address: ""})} style={{ color: "#dc3545", fontSize: "12px", cursor: "pointer", marginTop: "8px", textDecoration: "underline" }}>Try again</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input type="date" name="date" value={contact.date} onChange={handleInput} min={new Date().toISOString().split("T")[0]} required />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input type="time" name="time" value={contact.time} onChange={handleInput} required />
            </div>
            <button type="submit" className="btn-submit" style={{ marginTop: "20px", width: "100%", padding: "12px", fontWeight: "bold" }}>Book Now</button>
          </form>
        </section>
      </div>
    </section>
  );
};