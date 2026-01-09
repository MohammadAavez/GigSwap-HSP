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
          const { username, email, message, address, time, date, _id } = curContactData;
          return (
            <div key={index} className="contact-card" style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
              <p><strong>Name:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Service:</strong> {message}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {time}</p>
              
              {/* 📍 Dynamic Clickable Link */}
              <p>
                <strong>Address:</strong>{" "}
                <a href={address} target="_blank" rel="noreferrer" style={{ color: "#007bff", fontWeight: "bold", textDecoration: "underline" }}>
                  View Customer Location 📍
                </a>
              </p>

              {/* <button className="btn" onClick={() => deleteContactById(_id)} style={{ backgroundColor: "#ff4d4d", marginTop: "10px" }}>
                Delete Booking
              </button> */}
            </div>
          );
        })}
      </div>
    </section>
  );
};