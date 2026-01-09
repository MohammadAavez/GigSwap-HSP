import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Styles/Worker.css";
import { toast } from "react-toastify";

export const WorkerContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, user } = useAuth();

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

  const handleStatus = async (id, status) => {
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
            workerName: user.username 
          }),
        });

        if (response.ok) {
          toast.success(`Status updated to ${status}`);
          getContactsData(); 
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
          // 🟢 Added 'phone' and 'address' in destructuring
          const { username, message, time, date, _id, status, acceptedBy, phone, address } = cur;

          const isLockedByOthers = acceptedBy && acceptedBy !== user.username;

          return (
            <div key={_id} className="contact-card" style={{ opacity: isLockedByOthers ? 0.6 : 1 }}>
              <div className="card-header">
                <h3>Customer: {username}</h3>
                <span className={`status-badge ${status || "Pending"}`}>
                  {status || "Pending"} 
                  {isLockedByOthers && ` (Taken by ${acceptedBy})`}
                </span>
              </div>

              <div className="card-body">
                <p><strong>Service:</strong> {message}</p>
                <p><strong>Date:</strong> {new Date(date).toLocaleDateString()} | <strong>Time:</strong> {time}</p>
                
                {/* 📍 Location/Address Section */}
                <p className="address-info">
                  <strong>📍 Address:</strong> {address || "Not Provided"}
                </p>

                {/* 📞 Phone Number Section */}
                <p className="phone-info">
                  <strong>📞 Phone:</strong> {phone || "Not Provided"}
                </p>
              </div>

              <div className="status-buttons">
                {isLockedByOthers ? (
                  <p className="occupied-msg">Occupied by another worker</p>
                ) : (
                  <>
                    <button 
                      className="btn accept" 
                      onClick={() => handleStatus(_id, "Accepted")}
                      disabled={status === "Accepted"}
                    >
                      {status === "Accepted" ? "Accepted" : "Accept"}
                    </button>

                    <button 
                      className="btn pending" 
                      onClick={() => handleStatus(_id, "Pending")}
                      disabled={status === "Pending" || !status}
                    >
                      Pending
                    </button>

                    <button 
                      className="btn completed" 
                      onClick={() => handleStatus(_id, "Completed")}
                      disabled={status === "Completed"}
                    >
                      Completed
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};