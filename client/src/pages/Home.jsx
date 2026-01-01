import { Analytics } from "../components/Analytics";
import "./Styles/Home.css";
import { Testimonials } from "../components/Testimonials";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";


export const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              
              <p>A Home Service Provider</p>
              <h1>Welcome to GigSwap</h1>
              <p>
                Need reliable home services? Servax brings the best local
                professionals—cleaning, repairs, gardening, and more—right to
                your doorstep. Our carefully vetted providers ensure quality,
                convenience, and peace of mind every time.
              </p>

              <div className="btn-group">
                {isLoggedIn ? (
                  <NavLink to="/contact">
                    <button className="first-btn">book now</button>
                  </NavLink>
                ) : (
                  <NavLink to="/login">
                    <button className="first-btn">book now</button>
                  </NavLink>
                )}
                <NavLink to="/service">
                  <button className=" secondary-btn">services</button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      <Analytics />

      {/* 3rd section  */}
      <section className="section-hero2">
        <div className="container2 grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image2">
            <img
              src="/images/h2.jpg"
              alt="coding together"
              width="300"
              height="300"
            />
          </div>

          <div className="hero-content2">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how Thapa Technical can help your business thrive in
              the digital age.
            </p>
            <div className="btn-group">
              {isLoggedIn ? (
                <NavLink to="/contact">
                  <button className="first-btn">book now</button>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <button className="first-btn">book now</button>
                </NavLink>
              )}
              <NavLink to="/service">
                <button className=" secondary-btn">services</button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </>
  );
};
