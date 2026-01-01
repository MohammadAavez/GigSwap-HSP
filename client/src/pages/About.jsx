import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import "./Styles/About.css";

export const About = () => {
  return (
    <>
      <main>
        <section className="about-hero-section">
          <div className="about-container about-grid about-two-cols">
            <div className="about-hero-content">
              {/* <p>We care to cure your Health</p> */}
              
              <h1>Why Choose Us? </h1>
              <p>
<<<<<<< HEAD
                Expertise:- Our team consists of experienced IT professionals who
=======
                <div className="features" >Expertise:</div>Our team consists of experienced IT professionals who
>>>>>>> 75913bea62488062815fa5c727bde8148a3d0307
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                <div className="features" >Customization: </div>We understand that every business is unique.
                That's why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p>
            <div className="features" >CustomerApproach:</div>We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p>
                <div className="features" >Affrdability:</div>We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
                <div className="features" >Reliability: </div>Count on us to be there when you need us. We're
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
              <div className="about-btn-group">
                <NavLink to="/contact">
                  <button className="about-btn">Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                <button className="about-btn-secondary">Learn More</button>
                </NavLink>
              </div>
              
            </div>
          
          </div>
        </section>
      </main>

      <Analytics />
    </>
  );
};
