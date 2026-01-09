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

      <div className="container admin-contacts-grid">
        {contactData.map((curContactData, index) => {
          const { username, email, message, address, time, date, _id, status, acceptedBy } = curContactData;
          return (
            <div key={index} className="contact-card-responsive">
              <p><strong>Name:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Service:</strong> {message}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {time}</p>
              
              <p>
                <strong>Address:</strong>{" "}
                <a href={address} target="_blank" rel="noreferrer" className="location-link">
                  View Customer Location.
                </a>
              </p>

              <div className="status-box">
                <p>
                  <strong>Current Status:</strong>{" "}
                  <span className={`status-text ${status}`}>
                    {status || "Pending"}
                  </span>
                </p>

                {(status === "Accepted" || status === "Completed") && acceptedBy && (
                  <p className="worker-info">
                    {status === "Accepted" ? " Accepted by: " : " Completed by: "} 
                    <strong>{acceptedBy}</strong>
                  </p>
                )}
              </div>

              {/* <button className="btn-delete" onClick={() => deleteContactById(_id)}>
                Delete Booking
              </button> */}
            </div>
          );
        })}
      </div>
    </section>
  );
};