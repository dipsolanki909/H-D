// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      {/* About section start */}
      <div className="about_section layout_padding">
        <Header/>
        <div className="container">
          <h1 className="about_text">About Us</h1>
          <p className="lorem_text">
            It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters,
          </p>
          <div className="about_bt">
            <Link to="/about" className="about_bt">
                Read More
                </Link>
          </div>
        </div>
        <Footer/>
      </div>
      {/* About section end */}
    </>
  );
};

export default About;
