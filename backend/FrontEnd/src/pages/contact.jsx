import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      {/* Contact section start */}
      <div className="contact_section layout_padding">
        <Header/>
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
                <select className="input_text" name="camera">
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

            {/* Anchor tag removed – Button used */}
            <div className="send_bt">
              <button type="button" className="send_text">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Contact section end */}

      {/* Map section */}
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
      <Footer/>
    </>
  );
};

export default Contact;
