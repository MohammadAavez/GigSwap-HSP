import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Styles/Admin.css";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch("https://gig-swap-hsp-backend.vercel.app/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`https://gig-swap-hsp-backend.vercel.app/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getContactsData();
        toast.success("Booking deleted successfully");
      } else {
        toast.error("Not Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <section className="admin-contacts-section">
      <h1 className="main-heading">Booked Services</h1>

      <div className="container admin-users">
        {contactData.map((curContactData, index) => {
          const { username, email, message, address, time, date, _id, status, acceptedBy } = curContactData;
          return (
            <div key={index} className="contact-card" style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
              <p><strong>Name:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Service:</strong> {message}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {time}</p>
              
              <p>
                <strong>Address:</strong>{" "}
                <a href={address} target="_blank" rel="noreferrer" style={{ color: "#007bff", fontWeight: "bold", textDecoration: "underline" }}>
                  View Customer Location 📍
                </a>
              </p>

              {/* 🟢 Status & Worker Info Section */}
              <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
                <p>
                  <strong>Current Status:</strong>{" "}
                  <span style={{ 
                    color: status === "Accepted" ? "green" : status === "Completed" ? "blue" : "orange",
                    fontWeight: "bold"
                  }}>
                    {status || "Pending"}
                  </span>
                </p>

                {/* ✅ Accepted aur Completed dono par worker ka naam dikhega */}
                {(status === "Accepted" || status === "Completed") && acceptedBy && (
                  <p style={{ margin: "5px 0 0 0", color: "#555", fontSize: "0.9rem" }}>
                    {status === "Accepted" ? "✅ Assigned to: " : "🏆 Completed by: "} 
                    <strong>{acceptedBy}</strong>
                  </p>
                )}
              </div>

              <button className="btn" onClick={() => deleteContactById(_id)} style={{ backgroundColor: "#ff4d4d", marginTop: "15px", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
                Delete Booking
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};