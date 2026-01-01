import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Login.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();
<<<<<<< HEAD
  const URL = "https://gig-swap-hsp-server.vercel.app/api/auth/login";
=======
  const URL = "https://gig-swap-hsp-backend.vercel.app/api/auth/login";
>>>>>>> 75913bea62488062815fa5c727bde8148a3d0307

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);

      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({ email: "", password: "" });
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container2 grid2 grid-two-cols2">
              {/* our main registration code  */}
              <div className="login-form">
                <h1 className="main-heading mb-3">Login</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
          <p className="register-link">
            Didn’t register yet?
            <Link to="/register" className="link">
              Register here
            </Link>
          </p>
        </main>
      </section>
    </>
  );
};
