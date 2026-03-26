import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
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
    </>
  );
};

export default Header;
