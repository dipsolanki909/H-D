import React, { useEffect } from 'react';
import { FiAward, FiUsers, FiZap, FiTarget, FiHeart, FiGlobe, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import './About.css';

export function About() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.timeline-card[data-animate]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: <FiUsers />, count: '500K+', label: 'Active Users' },
    { icon: <FiZap />, count: '10M+', label: 'Videos Created' },
    { icon: <FiGlobe />, count: '150+', label: 'Countries' },
    { icon: <FiAward />, count: '4.9★', label: 'User Rating' },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Create stunning videos in minutes, not hours. Our AI-powered tools work at the speed of creativity.',
    },
    {
      icon: '🎨',
      title: 'Professional Templates',
      description: 'Choose from thousands of professionally designed templates for every occasion and style.',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Editing',
      description: 'Automatic scene detection, smart transitions, and intelligent color grading at your fingertips.',
    },
    {
      icon: '📱',
      title: 'Multi-Platform Export',
      description: 'Export in any format and quality. Perfect for YouTube, TikTok, Instagram, and more.',
    },
    {
      icon: '🎬',
      title: 'Professional Effects',
      description: 'Access Hollywood-grade effects, filters, and color grading tools used by professionals.',
    },
    {
      icon: '☁️',
      title: 'Cloud Storage',
      description: 'Secure cloud backup of all your projects. Access them anywhere, anytime, on any device.',
    },
  ];

  const team = [
    {
      name: 'Dipak',
      role: 'Video Editor',
      emoji: '🎬',
      bio: 'Creative video editor with expertise in cinematic editing',
      image: '/images/DH/dipak.jpg',
    },
    {
      name: 'Harsh',
      role: 'Motion Graphics Designer',
      emoji: '✨',
      bio: 'Specializes in stunning motion graphics and animations',
      image: '/images/DH/Harsh2.jpg',
    },
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-content">
          <h1>About D &amp; H Creatives</h1>
          <p>
            Empowering creators worldwide to tell their stories through stunning videos. 
            Professional-grade tools made accessible for everyone.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.count}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              We believe video is the future of communication. Our mission is to democratize professional video editing 
              by putting powerful creative tools in the hands of everyone—from small content creators to established brands.
            </p>
            <p>
              Whether you're a YouTuber, TikToker, business owner, or filmmaker, VideoEdit Pro gives you the creative 
              freedom and professional capabilities to bring your vision to life.
            </p>
            <div className="mission-highlights">
              <div className="highlight">
                <FiTarget className="highlight-icon" />
                <span>Mission-Driven</span>
              </div>
              <div className="highlight">
                <FiHeart className="highlight-icon" />
                <span>Community-Focused</span>
              </div>
              <div className="highlight">
                <FiAward className="highlight-icon" />
                <span>Quality-First</span>
              </div>
            </div>
          </div>
          <div className="mission-visual">
            <div className="visual-element">
              <span>🎥</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <p className="section-subtitle">Industry-leading features designed for creators</p>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p className="section-subtitle">Talented individuals passionate about video creation</p>
        <div className="team-grid">
          {team.map((member, idx) => (
            <article key={idx} className="team-card">
              <div className="team-avatar-wrap">
                <img src={member.image} alt={member.name} className="team-avatar-image" loading="lazy" />
                <span className="team-avatar-emoji" aria-hidden="true">{member.emoji}</span>
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
              <div className="team-socials" aria-label={`${member.name} social links`}>
                <a href="https://www.instagram.com/d_and_h_creatives?igsh=MXMwZDE2NmRsbmQ3cA==" target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}><FiLinkedin /></a>
                <a href="https://x.com/dhcreatives101?s=11" target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`}><FiTwitter /></a>
                <a href="https://youtube.com/@dhcreatives?si=i2lvia1b8K0CE4N4" target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`}><FiGithub /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="value-item">
            <h3>🚀 Innovation</h3>
            <p>Constantly pushing boundaries with cutting-edge AI and video technology</p>
          </div>
          <div className="value-item">
            <h3>👥 Community</h3>
            <p>Building a vibrant community of creators supporting each other</p>
          </div>
          <div className="value-item">
            <h3>🎯 Accessibility</h3>
            <p>Making professional tools affordable and easy to use for everyone</p>
          </div>
          <div className="value-item">
            <h3>💎 Quality</h3>
            <p>Never compromising on output quality and user experience</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Create Something Amazing?</h2>
        <p>Join millions of creators worldwide on their video journey</p>
        <button className="cta-button">Start Creating Now</button>
      </section>
    </main>
  );
}
