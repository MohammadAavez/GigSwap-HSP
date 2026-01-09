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
          const { username, email, message, address, time, date, _id, status, acceptedBy } = cur;

          // 🟢 Logic: Kya is service ko kisi aur ne accept kar liya hai?
          const isTakenByOthers = (status === "Accepted" || status === "Completed") && acceptedBy !== user.username;
          // 🟢 Logic: Kya ye service maine (current worker) accept ki hai?
          const isTakenByMe = (status === "Accepted" || status === "Completed") && acceptedBy === user.username;

          return (
            <div key={_id} className="contact-card" style={{ opacity: isTakenByOthers ? 0.7 : 1 }}>
              <p><strong>Customer:</strong> {username}</p>
              <p><strong>Service:</strong> {message}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {time}</p>
              
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-badge ${status || "Pending"}`}>
                  {status || "Pending"} 
                  {isTakenByOthers && ` (Taken by ${acceptedBy})`}
                </span>
              </p>

              <div className="status-buttons">
                {isTakenByOthers ? (
                  // 🔴 Agar kisi aur ne le liya hai toh kuch nahi dikhega ya message dikhega
                  <p style={{ color: "red", fontWeight: "bold" }}>Not Available</p>
                ) : (
                  // 🔵 Agar Available hai ya Maine hi accept kiya hai, toh buttons dikhao
                  <>
                    <button 
                      className="btn accept" 
                      onClick={() => handleStatus(_id, "Accepted")}
                      disabled={status === "Accepted"} // Agar pehle se accepted hai toh button disable
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