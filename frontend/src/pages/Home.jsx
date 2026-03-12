import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiZap, FiShare2, FiUsers, FiAward, FiArrowRight, FiCheck, FiFilm, FiMusic, FiEdit3, FiYoutube, FiGift, FiBriefcase, FiBookOpen, FiLayout, FiEdit, FiSend, FiSmile, FiDollarSign, FiLifeBuoy } from 'react-icons/fi';
import './Home.css';
import whyChooseUsImage from '../assets/guentherdillingen-photographer-3804979.jpg';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiEdit3 />,
      title: 'Intuitive Editor',
      description: 'Professional-grade editing tools with an interface so simple, anyone can use it.',
      color: '#667eea',
    },
    {
      icon: <FiZap />,
      title: 'Lightning Speed',
      description: 'AI-powered rendering exports your videos in seconds, not hours.',
      color: '#764ba2',
    },
    {
      icon: <FiMusic />,
      title: 'Rich Library',
      description: 'Thousands of free music tracks, sound effects, and stock footage.',
      color: '#f093fb',
    },
    {
      icon: <FiShare2 />,
      title: 'One-Click Share',
      description: 'Export directly to YouTube, Instagram, TikTok, and more.',
      color: '#4facfe',
    },
    {
      icon: <FiAward />,
      title: 'Studio Quality',
      description: 'Create broadcast-quality videos with 4K support and HDR.',
      color: '#fa709a',
    },
    {
      icon: <FiUsers />,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time project sharing.',
      color: '#30cfd0',
    },
  ];

  const categories = [
    {
      icon: <FiYoutube />,
      title: 'YouTube',
      description: 'Create viral video content optimized for YouTube',
      videos: '5K+ templates',
      color: '#ff0000',
    },
    {
      icon: <FiShare2 />,
      title: 'Social Media',
      description: 'Perfect sizes for Instagram, TikTok & Reels',
      videos: '8K+ templates',
      color: '#1da1f2',
    },
    {
      icon: <FiGift />,
      title: 'Events',
      description: 'Wedding, birthdays, anniversaries & celebrations',
      videos: '3K+ templates',
      color: '#ff7f50',
    },
    {
      icon: <FiBriefcase />,
      title: 'Business',
      description: 'Professional promos, ads & corporate videos',
      videos: '4K+ templates',
      color: '#333333',
    },
    {
      icon: <FiBookOpen />,
      title: 'Education',
      description: 'E-learning, tutorials & educational content',
      videos: '2K+ templates',
      color: '#2ed573',
    },
    {
      icon: <FiFilm />,
      title: 'Creative',
      description: 'Art films, music videos & experimental content',
      videos: '6K+ templates',
      color: '#ff4757',
    },
  ];

  const howItWorksSteps = [
    {
      icon: <FiLayout />,
      title: 'Choose a Template',
      description: 'Browse thousands of professionally designed templates or start from scratch.',
    },
    {
      icon: <FiEdit />,
      title: 'Customize & Edit',
      description: 'Add your content with drag-and-drop simplicity. No coding required.',
    },
    {
      icon: <FiSend />,
      title: 'Export & Share',
      description: 'Download or share directly to your favorite platforms instantly.',
    },
  ];

  const whyChooseUs = [
    {
      icon: <FiSmile />,
      title: 'Easy to Learn',
      description: 'No technical skills required. Start creating within minutes.',
    },
    {
      icon: <FiDollarSign />,
      title: 'Affordable',
      description: 'Premium features at a fraction of traditional software costs.',
    },
    {
      icon: <FiAward />,
      title: 'Professional Results',
      description: 'Advanced AI and algorithms ensure broadcast-quality output.',
    },
    {
      icon: <FiLifeBuoy />,
      title: '24/7 Support',
      description: 'Our dedicated team is always here to help you succeed.',
    },
  ];


  const stats = [
    { value: '1M+', label: 'Videos Created' },
    { value: '500K+', label: 'Active Users' },
    { value: '100+', label: 'Countries' },
    { value: '4.9/5', label: 'Rating' },
  ];

  const handleGetStarted = () => {
    navigate('/register');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">

        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Create <span className="gradient-text">Professional Videos</span> in Minutes
            </h1>
            <p className="hero-subtitle">
              Transform your creative ideas into stunning videos with our AI-powered editing platform.
              Used by creators, businesses, and agencies worldwide.
            </p>
            
            <div className="hero-cta">
              <button className="btn-primary-hero" onClick={handleGetStarted}>
                Start Creating Free <FiArrowRight />
              </button>
              <button className="btn-secondary-hero" onClick={() => scrollToSection('features')}>
                Explore Features
              </button>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="video-preview">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-main-video"
                src="/images/animasoin/WhatsApp%20Video%202026-02-18%20at%204.09.49%20PM.mp4"
              >
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Free Videos Section */}
      <section className="free-videos" id="free-videos">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Free Resources</span>
            <h2>Professional Videos at Zero Cost</h2>
            <p>Explore our collection of free stock videos, music, and effects</p>
          </div>

          <div className="free-videos-grid">
            <div className="video-card featured-video">
              <div className="video-thumbnail">
                <video autoPlay loop muted playsInline src="/images/vidioes/WhatsApp%20Video%202026-02-20%20at%2012.48.28%20PM.mp4"></video>
                <div className="play-icon"><FiPlay /></div>
                <div className="duration">0:15</div>
              </div>
              <div className="video-info">
                <h3>Free Stock Videos</h3>
                <p>Thousands of high-quality stock videos for any project</p>
                <div className="video-stats">
                  <span>4K+ Videos</span>
                  <span>Royalty Free</span>
                  <span>HD Quality</span>
                </div>
              </div>
            </div>

            <div className="video-card">
              <div className="video-thumbnail">
                <video autoPlay loop muted playsInline src="/images/vidioes/WhatsApp%20Video%202026-02-20%20at%2012.48.32%20PM.mp4"></video>
                <div className="play-icon"><FiPlay /></div>
              </div>
              <div className="video-info">
                <h3>Free Music Library</h3>
                <p>Royalty-free music tracks for your videos</p>
                <div className="video-stats">
                  <span>10K+ Tracks</span>
                  <span>All Genres</span>
                </div>
              </div>
            </div>

            <div className="video-card">
              <div className="video-thumbnail">
                <video autoPlay loop muted playsInline src="/images/vidioes/WhatsApp%20Video%202026-02-20%20at%2012.48.34%20PM.mp4"></video>
                <div className="play-icon"><FiPlay /></div>
              </div>
              <div className="video-info">
                <h3>Sound Effects</h3>
                <p>Extensive collection of professional sound effects</p>
                <div className="video-stats">
                  <span>5K+ Effects</span>
                  <span>Instant Download</span>
                </div>
              </div>
            </div>

            <div className="video-card">
              <div className="video-thumbnail">
                <video autoPlay loop muted playsInline src="/images/vidioes/WhatsApp%20Video%202026-02-20%20at%2012.48.39%20PM.mp4"></video>
                <div className="play-icon"><FiPlay /></div>
              </div>
              <div className="video-info">
                <h3>Templates</h3>
                <p>Ready-to-use video templates for quick creation</p>
                <div className="video-stats">
                  <span>8K+ Templates</span>
                  <span>Customizable</span>
                </div>
              </div>
            </div>

            <div className="video-card">
              <div className="video-thumbnail">
                <video autoPlay loop muted playsInline src="/images/vidioes/WhatsApp%20Video%202026-02-20%20at%2012.48.28%20PM.mp4"></video>
                <div className="play-icon"><FiPlay /></div>
              </div>
              <div className="video-info">
                <h3>Promo Templates</h3>
                <p>High-converting promo packs for product and brand videos</p>
                <div className="video-stats">
                  <span>2K+ Promos</span>
                  <span>Drag &amp; Drop</span>
                </div>
              </div>
            </div>

            <div className="video-card">
              <div className="video-thumbnail">
                <video autoPlay loop muted playsInline src="/images/vidioes/WhatsApp%20Video%202026-02-20%20at%2012.48.34%20PM.mp4"></video>
                <div className="play-icon"><FiPlay /></div>
              </div>
              <div className="video-info">
                <h3>Social Templates</h3>
                <p>Reels, shorts, and story templates ready for instant publishing</p>
                <div className="video-stats">
                  <span>3.5K+ Social</span>
                  <span>Mobile Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="free-videos-cta">
            <button className="btn-primary-hero" onClick={() => navigate('/templates')}>
              Browse Free Resources <FiArrowRight />
            </button>
            <p className="cta-subtitle">Start creating instantly with our free library</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Powerful Features</span>
            <h2>Everything You Need to Create Amazing Videos</h2>
            <p>Professional tools designed for creators of all skill levels</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ '--accent-color': feature.color }}>
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-accent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories" id="categories">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Content Categories</span>
            <h2>Create for Any Platform or Purpose</h2>
            <p>Choose from our extensive library of templates tailored to your needs</p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card" style={{'--category-color': category.color}}>
                <div className="category-icon-wrapper">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="category-meta">
                  <span>{category.videos}</span>
                  <FiArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2>Create Your First Video in 3 Steps</h2>
          </div>

          <div className="steps-grid">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-icon">{step.icon}</div>
                <div className="step-number">{`0${index + 1}`}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us" id="why">
        <div className="section-container">
          <div className="why-visual">
            <img src={whyChooseUsImage} alt="Professional videographer editing on a laptop" />
          </div>
          <div className="why-content">
            <div className="section-header">
              <span className="section-badge">Why Choose Us</span>
              <h2>The Smartest Choice for Video Creation</h2>
            </div>

            <div className="why-grid">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="why-card">
                  <div className="why-icon">{item.icon}</div>
                  <div className="why-card-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Trust */}
      <section className="testimonials">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Trusted by Creators</span>
            <h2>Hear from Our Community</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card featured">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "This platform is a game-changer! I went from spending 8 hours editing to just 20 minutes. The quality is incredible!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <strong>Arjun Patel</strong>
                  <small>YouTube Creator • 100K Subscribers</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "The customer support is exceptional. They helped me set up everything perfectly."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💼</div>
                <div className="author-info">
                  <strong>Priya Desai</strong>
                  <small>Event Videographer</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "Best investment for my business. My marketing videos look professional now!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💻</div>
                <div className="author-info">
                  <strong>Rohan Sharma</strong>
                  <small>Digital Marketer</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="pricing-preview" id="pricing">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Pricing</span>
            <h2>Plans for Everyone</h2>
            <p>Choose the perfect plan for your needs</p>
          </div>

          <div className="pricing-preview-grid">
            <div className="pricing-preview-card">
              <h3>Starter</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">0</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                <li><FiCheck /> Basic editing tools</li>
                <li><FiCheck /> 480p export</li>
                <li><FiCheck /> Limited templates</li>
                <li className="disabled"><FiCheck /> No watermark</li>
              </ul>
              <button className="btn-secondary" onClick={handleGetStarted}>Get Started</button>
            </div>

            <div className="pricing-preview-card featured-card">
              <div className="badge-popular">Most Popular</div>
              <h3>Pro</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">99</span>
                <span className="period">/video</span>
              </div>
              <ul className="features-list">
                <li><FiCheck /> All tools included</li>
                <li><FiCheck /> 1080p + 4K export</li>
                <li><FiCheck /> All templates</li>
                <li><FiCheck /> No watermark</li>
              </ul>
              <button className="btn-primary-hero" onClick={handleGetStarted}>Upgrade Now</button>
            </div>

            <div className="pricing-preview-card">
              <h3>Premium</h3>
              <div className="price">
                <span className="currency">₹</span>
                <span className="amount">199</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                <li><FiCheck /> Unlimited exports</li>
                <li><FiCheck /> Premium support</li>
                <li><FiCheck /> Custom branding</li>
                <li><FiCheck /> Advanced features</li>
              </ul>
              <button className="btn-secondary" onClick={handleGetStarted}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-background">
          <div className="gradient-blob cta-blob-1"></div>
          <div className="gradient-blob cta-blob-2"></div>
        </div>

        <div className="cta-content">
          <h2>Ready to Create Something Amazing?</h2>
          <p>Join thousands of creators making professional videos every day</p>
          <button className="btn-primary-hero large" onClick={handleGetStarted}>
            Start Free Today <FiArrowRight />
          </button>
          <p className="cta-note">No credit card required • Free forever plan available</p>
        </div>
      </section>
    </div>
  );
};
