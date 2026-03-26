import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlay, FiDownload } from 'react-icons/fi';
import './Category.css';

// Category Metadata
const CATEGORY_DATA = {
  youtube: {
    id: 'youtube',
    title: 'YouTube Video Templates',
    icon: '📺',
    description: 'Create stunning YouTube videos with our professional templates. Perfect for intros, outros, and vlogs.',
    color: 'gradient-red'
  },
  instagram: {
    id: 'instagram',
    title: 'Instagram Reels Templates',
    icon: '📱',
    description: 'Make viral Instagram Reels with trendy templates. Short, engaging, and optimized for mobile.',
    color: 'gradient-pink'
  },
  wedding: {
    id: 'wedding',
    title: 'Wedding Video Templates',
    icon: '💒',
    description: 'Celebrate love with beautiful wedding video templates. Perfect for ceremonies and receptions.',
    color: 'gradient-purple'
  },
  birthday: {
    id: 'birthday',
    title: 'Birthday Video Templates',
    icon: '🎂',
    description: 'Make birthdays special with fun and colorful video templates. Celebrate in style!',
    color: 'gradient-yellow'
  },
  business: {
    id: 'business',
    title: 'Business Promo Templates',
    icon: '💼',
    description: 'Promote your business professionally. Templates for ads, intros, and promotional videos.',
    color: 'gradient-blue'
  },
  education: {
    id: 'education',
    title: 'Education Video Templates',
    icon: '🎓',
    description: 'Create engaging educational content. Templates for tutorials, courses, and learning videos.',
    color: 'gradient-green'
  }
};

// Featured Templates Data
const TEMPLATES_DATA = {
  youtube: [
    {
      id: 'yt-1',
      name: 'Modern Intro Pack',
      duration: '10s',
      type: 'free',
      image: '🎬',
      description: 'Clean and modern intro template'
    },
    {
      id: 'yt-2',
      name: 'Gaming Intro',
      duration: '15s',
      type: 'free',
      image: '🎮',
      description: 'Perfect for gaming content creators'
    },
    {
      id: 'yt-3',
      name: 'Professional Intro',
      duration: '12s',
      type: 'premium',
      image: '🎯',
      description: 'Premium professional template'
    },
    {
      id: 'yt-4',
      name: 'Vlog Intro',
      duration: '8s',
      type: 'free',
      image: '📹',
      description: 'Quick vlog intro template'
    },
    {
      id: 'yt-5',
      name: 'Cinematic Intro',
      duration: '20s',
      type: 'premium',
      image: '🎞️',
      description: 'Cinematic style intro'
    },
    {
      id: 'yt-6',
      name: 'Energetic Opener',
      duration: '15s',
      type: 'premium',
      image: '⚡',
      description: 'High energy video opener'
    }
  ],
  instagram: [
    {
      id: 'ig-1',
      name: 'Trendy Reel',
      duration: '15s',
      type: 'free',
      image: '🎀',
      description: 'Trendy social media reel'
    },
    {
      id: 'ig-2',
      name: 'Fashion Reel',
      duration: '10s',
      type: 'free',
      image: '👗',
      description: 'Fashion focused template'
    },
    {
      id: 'ig-3',
      name: 'Beauty Tutorial',
      duration: '30s',
      type: 'premium',
      image: '💄',
      description: 'Beauty content template'
    },
    {
      id: 'ig-4',
      name: 'Fitness Reel',
      duration: '15s',
      type: 'free',
      image: '💪',
      description: 'Fitness workout template'
    },
    {
      id: 'ig-5',
      name: 'Food Video',
      duration: '20s',
      type: 'premium',
      image: '🍕',
      description: 'Food content template'
    },
    {
      id: 'ig-6',
      name: 'Travel Reel',
      duration: '15s',
      type: 'free',
      image: '✈️',
      description: 'Travel vlogging template'
    }
  ],
  wedding: [
    {
      id: 'wed-1',
      name: 'Classic Love Story',
      duration: '60s',
      type: 'premium',
      image: '💕',
      description: 'Romantic wedding slideshow'
    },
    {
      id: 'wed-2',
      name: 'Ceremony Highlight',
      duration: '45s',
      type: 'free',
      image: '💒',
      description: 'Ceremony moments highlight'
    },
    {
      id: 'wed-3',
      name: 'Reception Reel',
      duration: '90s',
      type: 'premium',
      image: '🎉',
      description: 'Reception party video'
    },
    {
      id: 'wed-4',
      name: 'Photo Montage',
      duration: '120s',
      type: 'premium',
      image: '📸',
      description: 'Complete wedding montage'
    },
    {
      id: 'wed-5',
      name: 'Guest Messages',
      duration: '60s',
      type: 'free',
      image: '💌',
      description: 'Guest greeting compilation'
    },
    {
      id: 'wed-6',
      name: 'Romantic Cinematic',
      duration: '150s',
      type: 'premium',
      image: '🎬',
      description: 'Cinematic wedding video'
    }
  ],
  birthday: [
    {
      id: 'bday-1',
      name: 'Fun Birthday Intro',
      duration: '20s',
      type: 'free',
      image: '🎉',
      description: 'Fun and colorful intro'
    },
    {
      id: 'bday-2',
      name: 'Birthday Countdown',
      duration: '30s',
      type: 'free',
      image: '⏳',
      description: 'Countdown to party'
    },
    {
      id: 'bday-3',
      name: 'Kids Party Video',
      duration: '45s',
      type: 'premium',
      image: '🎈',
      description: 'Kids birthday party template'
    },
    {
      id: 'bday-4',
      name: 'Milestone Birthday',
      duration: '60s',
      type: 'premium',
      image: '🌟',
      description: 'Milestone celebration video'
    },
    {
      id: 'bday-5',
      name: 'Photo Slideshow',
      duration: '90s',
      type: 'free',
      image: '📷',
      description: 'Birthday photo montage'
    },
    {
      id: 'bday-6',
      name: 'Birthday Surprise',
      duration: '45s',
      type: 'premium',
      image: '🎁',
      description: 'Surprise birthday video'
    }
  ],
  business: [
    {
      id: 'bus-1',
      name: 'Corporate Intro',
      duration: '15s',
      type: 'premium',
      image: '🏢',
      description: 'Professional corporate video'
    },
    {
      id: 'bus-2',
      name: 'Product Demo',
      duration: '30s',
      type: 'free',
      image: '📦',
      description: 'Product showcase template'
    },
    {
      id: 'bus-3',
      name: 'Service Promo',
      duration: '45s',
      type: 'premium',
      image: '🎯',
      description: 'Service promotional video'
    },
    {
      id: 'bus-4',
      name: 'Company Culture',
      duration: '60s',
      type: 'premium',
      image: '👥',
      description: 'Company culture video'
    },
    {
      id: 'bus-5',
      name: 'Testimonial Video',
      duration: '20s',
      type: 'free',
      image: '⭐',
      description: 'Customer testimonial template'
    },
    {
      id: 'bus-6',
      name: 'Sales Pitch',
      duration: '45s',
      type: 'premium',
      image: '💼',
      description: 'Professional sales pitch'
    }
  ],
  education: [
    {
      id: 'edu-1',
      name: 'Course Intro',
      duration: '20s',
      type: 'free',
      image: '🎓',
      description: 'Online course introduction'
    },
    {
      id: 'edu-2',
      name: 'Tutorial Outline',
      duration: '30s',
      type: 'free',
      image: '📺',
      description: 'Tutorial step outline'
    },
    {
      id: 'edu-3',
      name: 'Lecture Intro',
      duration: '25s',
      type: 'premium',
      image: '📚',
      description: 'Lecture introduction template'
    },
    {
      id: 'edu-4',
      name: 'Lesson Recap',
      duration: '40s',
      type: 'premium',
      image: '📝',
      description: 'Lesson recap template'
    },
    {
      id: 'edu-5',
      name: 'Q&A Session',
      duration: '45s',
      type: 'free',
      image: '❓',
      description: 'Q&A session template'
    },
    {
      id: 'edu-6',
      name: 'Certificate Award',
      duration: '30s',
      type: 'premium',
      image: '🏆',
      description: 'Certificate achievement video'
    }
  ]
};

export const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Get category data
  const category = CATEGORY_DATA[categoryName];
  const templates = TEMPLATES_DATA[categoryName] || [];

  // Handle invalid category
  if (!category) {
    return (
      <div className="category-error">
        <h1>Category Not Found</h1>
        <p>Sorry, this category doesn't exist.</p>
        <button className="btn-back" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  // Filter templates based on search
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUseTemplate = (template) => {
    if (template.type === 'premium') {
      navigate('/payment');
    } else {
      navigate('/editor', { state: { templateId: template.id, templateName: template.name } });
    }
  };

  return (
    <div className="category-page">
      {/* Hero Section */}
      <section className={`category-hero ${category.color}`}>
        <div className="hero-background">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
        </div>

        <div className="hero-content">
          <div className="hero-icon">{category.icon}</div>
          <h1>{category.title}</h1>
          <p>{category.description}</p>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="templates-grid-section">
        <div className="templates-wrapper">
          <div className="results-info">
            <h2>Available Templates</h2>
            <p>{filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found</p>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="templates-grid">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="template-card">
                  {/* Preview */}
                  <div className="template-preview">
                    <div className="preview-emoji">{template.image}</div>
                    <button className="preview-btn" title="Preview">
                      <FiPlay />
                    </button>
                    <div className="template-duration">{template.duration}</div>
                  </div>

                  {/* Info */}
                  <div className="template-info">
                    <div className="template-header">
                      <h3>{template.name}</h3>
                      <span className={`badge ${template.type}`}>
                        {template.type === 'free' ? '🎁 Free' : '⭐ Premium'}
                      </span>
                    </div>
                    <p className="template-desc">{template.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="template-actions">
                    <button className="btn-preview">
                      <FiPlay /> Preview
                    </button>
                    {template.type === 'free' ? (
                      <button
                        className="btn-use"
                        onClick={() => handleUseTemplate(template)}
                      >
                        <FiDownload /> Use Template
                      </button>
                    ) : (
                      <button
                        className="btn-upgrade"
                        onClick={() => handleUseTemplate(template)}
                      >
                        ⭐ Upgrade
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-templates">
              <p>No templates found</p>
              <button
                className="btn-reset"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
