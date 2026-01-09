import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Styles/Worker.css";
import { toast } from "react-toastify";

export const WorkerContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, user } = useAuth(); // 'user' se worker ka naam milega

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
      console.log("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  // 🟢 Naya Status Handler with Popups & DB Update
  const handleStatus = async (id, status) => {
    // 1. Confirmation Popup
    const isConfirmed = window.confirm(`Kya aap is booking ko "${status}" mark karna chahte hain?`);
    
    if (isConfirmed) {
      try {
        const response = await fetch(`https://gig-swap-hsp-backend.vercel.app/api/worker/update-status/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify({ 
            status: status, 
            workerName: user.username // Auth se worker ka naam bhej rahe hain
          }),
        });

        if (response.ok) {
          toast.success(`Status updated to ${status}`);
          getContactsData(); // List refresh karne ke liye
        } else {
          toast.error("Status update fail ho gaya");
        }
      } catch (error) {
        console.log("Error updating status:", error);
        toast.error("Server error!");
      }
    }
  };

  return (
    <section className="worker-contacts-section">
      <h1>Booked Services</h1>

      <div className="container worker-contacts">
        {contactData.map((cur) => {
          const { username, email, message, address, time, date, _id, status } = cur;

          return (
            <div key={_id} className="contact-card">
              <p><strong>Customer:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Service:</strong> {message}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {time}</p>
              
              <p>
                <strong>Address:</strong>{" "}
                <a href={address} target="_blank" rel="noreferrer" className="map-link">
                  View on Map 📍
                </a>
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-badge ${status || "Pending"}`}>
                  {status || "Pending"}
                </span>
              </p>

              <div className="status-buttons">
                <button className="btn accept" onClick={() => handleStatus(_id, "Accepted")}>
                  Accept
                </button>
                <button className="btn pending" onClick={() => handleStatus(_id, "Pending")}>
                  Pending
                </button>
                <button className="btn completed" onClick={() => handleStatus(_id, "Completed")}>
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