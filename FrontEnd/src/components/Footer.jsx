import React from "react";

const Footer = () => {
  return (
    <>
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
                      <a href="#">
                        <img src="images/map-icon.png" alt="Map" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/email-icon.png" alt="Email" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/contact-icon.png" alt="Contact" />
                      </a>
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
                  <a href="#">Subscribe</a>
                </button>
              </div>

              <div className="col-sm-12 col-lg-4">
                <div className="social_icon">
                  <ul>
                    <li>
                      <a href="#">
                        <img src="images/fb-icon.png" alt="Facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/twitter-icon.png" alt="Twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="images/instagram-icon.png"
                          alt="Instagram"
                        />
                      </a>
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
    </>
  );
};

export default Footer;
