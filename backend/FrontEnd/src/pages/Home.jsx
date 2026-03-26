import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
        


{/* Top header section start */}
      <div className="top_header_section">
        <div className="container">
          <div className="top_section">
            <div className="row">
              <div className="col-sm-6">
                <div className="call_taital">
                  <ul>
                    <li>
                      <Link to="#">
                        <img src="images/call-icon.png" alt="Call" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">+91 9904357160</Link>
                    </li>
                    <li className="mail">
                      <Link to="#">
                        <img src="images/mail-icon.png" alt="Mail" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">harshpatel99043@gmail.com</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="top_taital">
                  long established fact that a reader will be
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top header section end */}

      {/* Header section start */}
      <div className="header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <div className="logo">
                <Link to="/">
                  <img src="images/nw_logo.png" alt="Logo" />
                </Link>
              </div>
            </div>

            <div className="col-sm-5">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <div className="navbar-nav">
                    <ul>
                      <li>
                        <Link className="nav-item nav-link" to="/">
                          Home
                        </Link>
                      </li>
                      <li>|</li>
                      <li>
                        <Link className="nav-item nav-link" to="/about">
                          About
                        </Link>
                      </li>
                      <li>|</li>
                      <li>
                        <Link className="nav-item nav-link" to="/cameras">
                          Cameras
                        </Link>
                      </li>
                      <li>|</li>
                      <li>
                        <Link className="nav-item nav-link" to="/contact">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="search_main">
                <div className="left_main">
                  <form className="form-inline my-2 my-lg-0">
                    <button type="submit" className="submit_bt">
                      <Link to="#">
                        Search
                        <span className="doctor">
                          <img
                            src="images/search-icon.png"
                            alt="Search"
                          />
                        </span>
                      </Link>
                    </button>
                  </form>
                </div>

                <div className="right_main">
                  <div className="login_text">
                    <Link to="#">
                      Login
                      <span className="user_icon">
                        <img src="images/user-icon.png" alt="User" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Header section end */}
{/* Banner section start */}
<div className="banner_section">
  <div className="container-fluid">
    <section className="slide-wrapper">
      <div className="container-fluid">
        <div
          id="myCarousel"
          className="carousel slide"
          data-ride="carousel"
        >
          {/* Indicators */}
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
          </ol>

          {/* Wrapper for slides */}
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-7">
                  <div className="images_1">
                    <img src="images/banner-bg.png" alt="Banner background" />
                  </div>
                  <div className="banner_main">
                    <div className="banner_left">
                      <div className="red_bt">
                        <Link href="#">Read More</Link>
                      </div>
                    </div>
                    <div className="banner_right">
                      <h1 className="usiing_text">Using Cool camera</h1>
                      <p className="point_text">
                        point of using Lorem Ipsum is that it has a more-or-less
                        distribution of letters,
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="images_2">
                    <img src="images/img-1.png" alt="Camera" />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-7">
                  <div className="images_1">
                    <img src="images/banner-bg.png" alt="Banner background" />
                  </div>
                  <div className="banner_main">
                    <div className="banner_left">
                      <div className="red_bt">
                        <Link href="#">Read More</Link>
                      </div>
                    </div>
                    <div className="banner_right">
                      <h1 className="usiing_text">Using Cool camera</h1>
                      <p className="point_text">
                        point of using Lorem Ipsum is that it has a more-or-less
                        distribution of letters,
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="images_2">
                    <img src="images/img-1.png" alt="Camera" />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-7">
                  <div className="images_1">
                    <img src="images/banner-bg.png" alt="Banner background" />
                  </div>
                  <div className="banner_main">
                    <div className="banner_left">
                      <div className="red_bt">
                        <Link href="#">Read More</Link>
                      </div>
                    </div>
                    <div className="banner_right">
                      <h1 className="usiing_text">Using Cool camera</h1>
                      <p className="point_text">
                        point of using Lorem Ipsum is that it has a more-or-less
                        distribution of letters,
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="images_2">
                    <img src="images/img-1.png" alt="Camera" />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-7">
                  <div className="images_1">
                    <img src="images/banner-bg.png" alt="Banner background" />
                  </div>
                  <div className="banner_main">
                    <div className="banner_left">
                      <div className="red_bt">
                        <Link href="#">Read More</Link>
                      </div>
                    </div>
                    <div className="banner_right">
                      <h1 className="usiing_text">Using Cool camera</h1>
                      <p className="point_text">
                        point of using Lorem Ipsum is that it has a more-or-less
                        distribution of letters,
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="images_2">
                    <img src="images/img-1.png" alt="Camera" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* carousel-inner end */}
        </div>
      </div>
    </section>
  </div>
</div>
{/* Banner section end */}
{/* About section start */}
<div className="about_section layout_padding">
  <div className="container">
    <h1 className="about_text">About Us</h1>
    <p className="lorem_text">
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout. The point of using
      Lorem Ipsum is that it has a more-or-less normal distribution of letters,
    </p>
    <div className="about_bt">
      <Link href="#">Read More</Link>
    </div>
  </div>
</div>
{/* About section end */}
{/* Our cameras section start */}
<div className="cameras_section layout_padding">
  <div className="container">
    <h1 className="Cameras_text">Our Cameras</h1>

    <div className="cameras_section_2">
      <div
        id="main_slider"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="row">
              <div className="col-md-6">
                <div className="images_3">
                  <img src="images/img-2.png" alt="Camera 1" />
                </div>
                <div className="taital_main">
                  <h2 className="best_text">Best Camera</h2>
                  <h2 className="dolar_text">
                    $<span style={{ color: "#874ce0" }}>400</span>
                  </h2>
                </div>
                <p className="lorem_ipsum_text">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>
                <div className="bt_text">
                  <Link href="#">Read More</Link>
                </div>
              </div>

              <div className="col-md-6">
                <p className="ipsum_text">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>
                <div className="images_3">
                  <img src="images/img-3.png" alt="Camera 2" />
                </div>
                <div className="taital_main">
                  <h2 className="camera_text">Best Camera</h2>
                  <h2 className="dolar_text_2">
                    $<span style={{ color: "#874ce0" }}>400</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="row">
              <div className="col-md-6">
                <div className="images_3">
                  <img src="images/img-2.png" alt="Camera 1" />
                </div>
                <div className="taital_main">
                  <h2 className="best_text">Best Camera</h2>
                  <h2 className="dolar_text">
                    $<span style={{ color: "#874ce0" }}>400</span>
                  </h2>
                </div>
                <p className="lorem_ipsum_text">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>
                <div className="bt_text">
                  <Link href="#">Read More</Link>
                </div>
              </div>

              <div className="col-md-6">
                <p className="ipsum_text">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>
                <div className="images_3">
                  <img src="images/img-3.png" alt="Camera 2" />
                </div>
                <div className="taital_main">
                  <h2 className="camera_text">Best Camera</h2>
                  <h2 className="dolar_text_2">
                    $<span style={{ color: "#874ce0" }}>400</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <div className="row">
              <div className="col-md-6">
                <div className="images_3">
                  <img src="images/img-2.png" alt="Camera 1" />
                </div>
                <div className="taital_main">
                  <h2 className="best_text">Best Camera</h2>
                  <h2 className="dolar_text">
                    $<span style={{ color: "#874ce0" }}>400</span>
                  </h2>
                </div>
                <p className="lorem_ipsum_text">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>
                <div className="bt_text">
                  <Link href="#">Read More</Link>
                </div>
              </div>

              <div className="col-md-6">
                <p className="ipsum_text">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>
                <div className="images_3">
                  <img src="images/img-3.png" alt="Camera 2" />
                </div>
                <div className="taital_main">
                  <h2 className="camera_text">Best Camera</h2>
                  <h2 className="dolar_text_2">
                    $<span style={{ color: "#874ce0" }}>400</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel controls */}
        <Link
          className="carousel-control-prev"
          href="#main_slider"
          role="button"
          data-slide="prev"
        >
          <i className="fa fa-angle-left"></i>
        </Link>

        <Link
          className="carousel-control-next"
          href="#main_slider"
          role="button"
          data-slide="next"
        >
          <i className="fa fa-angle-right"></i>
        </Link>
      </div>
    </div>
  </div>
</div>
{/* Our cameras section end */}
{/* Contact section start */}
<div className="contact_section layout_padding">
  <div className="container">
    <h1 className="get_text">Get In Touch</h1>

    <div className="mail_section">
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="input_text"
            placeholder="Name"
            name="name"
          />
          <input
            type="text"
            className="input_text"
            placeholder="Phone Number"
            name="phone"
          />
        </div>

        <div className="col-md-6">
          <input
            type="email"
            className="input_text"
            placeholder="Email"
            name="email"
          />
          <select className="input_text">
            <option value="">Type Of Camera</option>
            <option value="hd">H D Camera</option>
            <option value="video">Video Camera</option>
            <option value="image">Images</option>
          </select>
        </div>
      </div>

      <textarea
        name="comment"
        className="massage_box"
        placeholder="Your Words Message..."
      ></textarea>

      <div className="send_bt">
        <div className="send_text">
          <Link href="#">SEND</Link>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container-fluid padding_0">
  <div className="map_main">
    <div className="map-responsive">
      <iframe
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
        width="600"
        height="508"
        style={{ border: 0, width: "100%" }}
        allowFullScreen
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  </div>
</div>
{/* Contact section end */}
{/* Footer section start */}
      <div className="footer_section">
        <div className="container">
          <div className="footer_logo">
            <img src="images/footer-logo.png" alt="Footer Logo" />
          </div>

          <p className="long_text">
            It is a long established fact that a reader will be It is a long
            established fact that a reader will be
          </p>

          <div className="footer_section_2">
            <div className="row">
              <div className="col-sm-12 col-lg-4">
                <div className="icon_main">
                  <ul>
                    <li>
                      <Link href="#">
                        <img src="images/map-icon.png" alt="Map" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <img src="images/email-icon.png" alt="Email" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <img src="images/contact-icon.png" alt="Contact" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-lg-4">
                <h1 className="news_text">Newsletter</h1>
                <input
                  type="email"
                  className="email_bt"
                  placeholder="Enter your email"
                  name="email"
                />
                <button type="button" className="subscribe_bt">
                  <Link href="#">Subscribe</Link>
                </button>
              </div>

              <div className="col-sm-12 col-lg-4">
                <div className="social_icon">
                  <ul>
                    <li>
                      <Link href="#">
                        <img src="images/fb-icon.png" alt="Facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <img src="images/twitter-icon.png" alt="Twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <img
                          src="images/instagram-icon.png"
                          alt="Instagram"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Footer section end */}

      {/* Copyright section start */}
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            Copyright 2023 All Right Reserved By.{" "}
            <a
              href="https://html.design"
              target="_blank"
              rel="noreferrer"
            >
              Free html Templates
            </a>{" "}
            Distributed by:{" "}
            <a
              href="https://themewagon.com"
              target="_blank"
              rel="noreferrer"
            >
              ThemeWagon
            </a>
          </p>
        </div>
      </div>
      {/* Copyright section end */}


    </div>
  );
};

export default Home;
