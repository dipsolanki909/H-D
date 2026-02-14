import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from 'react-icons/fi';
import './Contact.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      details: 'support@videoeditpro.com',
      description: 'We reply within 24 hours',
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      details: '+1 (800) 123-4567',
      description: 'Monday to Friday, 9am-6pm EST',
    },
    {
      icon: <FiMapPin />,
      title: 'Office',
      details: 'San Francisco, USA',
      description: 'Global team across 5 continents',
    },
  ];

  const faqs = [
    {
      question: 'How do I export my video?',
      answer: 'Click the Export button in the editor and choose your desired format, resolution, and quality settings.',
    },
    {
      question: 'Can I collaborate with others?',
      answer: 'Yes! With our Pro plan, you can invite team members and collaborate on projects in real-time.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and store all data on secure cloud servers.',
    },
    {
      question: 'What video formats are supported?',
      answer: 'We support MP4, WebM, MOV, AVI, MKV, and many more. Export in any format you need.',
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>
            Have questions? We'd love to hear from you. 
            Reach out to our friendly support team anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="info-cards">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="info-card">
              <div className="info-icon">{info.icon}</div>
              <h3>{info.title}</h3>
              <p className="info-details">{info.details}</p>
              <p className="info-description">{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your question or feedback..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                <FiSend /> Send Message
              </button>

              {submitted && (
                <div className="success-message">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Quick Support */}
          <div className="quick-support">
            <h2>Quick Support</h2>
            <p>Can't find what you're looking for? Check our FAQ below or visit our help center.</p>
            
            <div className="support-links">
              <a href="#help" className="support-link">
                <FiMessageSquare /> Visit Help Center
              </a>
              <a href="#docs" className="support-link">
                📚 Read Documentation
              </a>
              <a href="#community" className="support-link">
                👥 Join Community
              </a>
            </div>

            <div className="response-time">
              <h3>📞 Response Times</h3>
              <p><strong>Email:</strong> 24 hours</p>
              <p><strong>Chat:</strong> 2-5 minutes</p>
              <p><strong>Phone:</strong> 5-10 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <p className="section-subtitle">Find answers to common questions</p>
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Section */}
      <section className="social-section">
        <h2>Follow Us</h2>
        <p>Stay updated with the latest features and tips</p>
        <div className="social-links">
          <a href="#twitter" className="social-link">
            𝕏 Twitter
          </a>
          <a href="#facebook" className="social-link">
            f Facebook
          </a>
          <a href="#instagram" className="social-link">
            📷 Instagram
          </a>
          <a href="#youtube" className="social-link">
            ▶️ YouTube
          </a>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="closing-cta">
        <h2>Have a Special Request?</h2>
        <p>For enterprise or bulk inquiries, please email us directly or schedule a call with our sales team.</p>
        <button className="cta-button">Schedule a Call</button>
      </section>
    </div>
  );
}
