import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Styles/Worker.css";

export const WorkerContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  // ✅ GET worker contacts
  const getContactsData = async () => {
    try {
      const response = await fetch(
        "https://gig-swap-hsp-server.vercel.app/api/worker/contacts",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      console.log("worker contact data:", data);

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

  return (
    <section className="worker-contacts-section">
      <h1>Booked Services</h1>

      <div className="container worker-contacts">
        {contactData.map((curContactData) => {
          const {
            username,
            email,
            message,
            address,
            time,
            date,
            _id,
          } = curContactData;

          return (
            <div key={_id} className="contact-card">
              <p><strong>Name:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Message:</strong> {message}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
              <p><strong>Address:</strong> {address}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
