import { useState, useEffect } from "react";
import "./Styles/Contact.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

// Added 'time' to the default form data
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

  const { user } = useAuth();

  // Use useEffect to prevent the state update loop
  useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
        address: "",
        date: "",
        time: "", // Initialize the new 'time' field
      });
      setUserData(false);
    }
  }, [userData, user]);

  // handleInput remains the same as it correctly handles all input fields
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // The fetch call now sends the new 'time' field along with other form data
      const response = await fetch("https://gig-swap-hsp-server.vercel.app/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success(
          "Service Booked Successfully. A confirmation email has been sent."
        );
      } else {
        toast.error("Failed to book service.");
      }
    } catch (error) {
      toast.error("Invalid Credentials or network error.");
      console.log("Error during form submission:", error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Book Your Service</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Services</label>
                <select
                  name="message"
                  id="select"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                >
                  <option>Select</option>
                  <option>Electrician</option>
                  <option>Plumbing</option>
                  <option> Ac-Repair </option>
                  <option> Cleaner </option>
                  <option> Carpenter </option>
                  <option> Pest Control </option>
                </select>
              </div>

              {/* Added the new time input field */}
              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  value={contact.date}
                  onChange={handleInput}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              {/* Added the new time input field */}
              <div>
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={contact.time}
                  onChange={handleInput}
                  required
                />
              </div>

              
              <div>
                <label htmlFor="address">Address (Nanded City Areas)</label>
                <select
                  name="address"
                  id="address"
                  value={contact.address}
                  onChange={handleInput}
                  required
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                >
                  <option value="">-- Choose Area --</option>
                  <option value="Vazirabad">Vazirabad</option>
                  <option value="Taroda Naka">Taroda Naka</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Bhagya Nagar">Bhagya Nagar</option>
                  <option value="Cidco">Cidco</option>
                  <option value="Hudco">Hudco</option>
                  <option value="Kautha">Kautha</option>
                  <option value="Peer Burhan Nagar">Peer Burhan Nagar</option>
                  <option value="Khadak Pura">Khadak Pura</option>
                  <option value="Barki Chowk">Barki Chowk</option>
                  <option value="VishnuPuri">VishnuPuri</option>
                  <option value="Shrinagar">Shrinagar</option>
                  <option value="Degloor Naka">Degloor Naka</option>
                  <option value="Shivaji Nagar">Shivaji Nagar</option>
                  <option value="Gokul Nagar">Gokul Nagar</option>
                  <option value="Kala Mandir">Kala Mandir</option>
                  <option value="Barkat Pura">Barkat Pura</option>
                  <option value="Waje Gaon">Waje Gaon</option>
                  <option value="Raj Corner">Raj Corner</option>

                  {/* Baaki sabhi areas yahan add karein */}
                </select>
              </div>

              <div></div>
              <div>
                <button type="submit">Book</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1978.5624118703483!2d77.3097348290443!3d19.153504666056282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d640295f68b3%3A0x52ce2e1cbead222f!2sVazirabad%2C%20Nanded%2C%20Nanded-Waghala%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1752240517734!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
