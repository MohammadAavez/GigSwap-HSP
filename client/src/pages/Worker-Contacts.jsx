import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Styles/Worker.css";

export const WorkerContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(
        "https://gig-swap-hsp-backend.vercel.app/api/worker/contacts",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  // 🔹 status change handler (frontend only)
  const handleStatus = (id, status) => {
    console.log("Booking ID:", id, "Status:", status);

    // frontend UI update
    setContactData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <section className="worker-contacts-section">
      <h1>Booked Services</h1>

      <div className="container worker-contacts">
        {contactData.map((cur) => {
          const {
            username,
            email,
            message,
            address,
            time,
            date,
            _id,
            status,
          } = cur;

          return (
            <div key={_id} className="contact-card">
              <p><strong>Name:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Service:</strong> {message}</p>
              
              {/* 📅 Date format fixed (Admin jaisa) */}
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              
              <p><strong>Time:</strong> {time}</p>
              
              <p>
                <strong>Address:</strong>{" "}
                <a 
                  href={address} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: "#007bff", fontWeight: "bold", textDecoration: "underline" }}
                >
                  View on Map 📍
                </a>
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${status || "pending"}`}>
                  {status || "Pending"}
                </span>
              </p>

              {/* 🔘 Buttons */}
              <div className="status-buttons">
                <button
                  className="btn accept"
                  onClick={() => handleStatus(_id, "Accepted")}
                >
                  Accept
                </button>

                <button
                  className="btn pending"
                  onClick={() => handleStatus(_id, "Pending")}
                >
                  Pending
                </button>

                <button
                  className="btn completed"
                  onClick={() => handleStatus(_id, "Completed")}
                >
                  Completed
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};