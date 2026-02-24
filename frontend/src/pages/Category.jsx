import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlay, FiDownload, FiSearch, FiChevronDown, FiArrowDown, FiZap, FiLayers, FiCpu } from 'react-icons/fi';
import { FaYoutube, FaInstagram, FaHeart, FaBirthdayCake, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
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

const videos = [
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.48.28 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.48.32 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.48.34 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.48.39 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.48.42 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.48.44 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.49.14 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.49.26 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.49.30 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.49.42 PM.mp4',
  '/images/vidioes/WhatsApp Video 2026-02-20 at 12.49.56 PM.mp4',
];

// Featured Templates Data
const TEMPLATES_DATA = {
  youtube: [
    {
      id: 'yt-1',
      name: 'Modern Intro Pack',
      duration: '10s',
      type: 'free',
      video: videos[0],
      description: 'Clean and modern intro template'
    },
    {
      id: 'yt-2',
      name: 'Gaming Intro',
      duration: '15s',
      type: 'free',
      video: videos[1],
      description: 'Perfect for gaming content creators'
    },
    {
      id: 'yt-3',
      name: 'Professional Intro',
      duration: '12s',
      type: 'premium',
      video: videos[2],
      description: 'Premium professional template'
    },
    {
      id: 'yt-4',
      name: 'Vlog Intro',
      duration: '8s',
      type: 'free',
      video: videos[3],
      description: 'Quick vlog intro template'
    },
    {
      id: 'yt-5',
      name: 'Cinematic Intro',
      duration: '20s',
      type: 'premium',
      video: videos[4],
      description: 'Cinematic style intro'
    },
    {
      id: 'yt-6',
      name: 'Energetic Opener',
      duration: '15s',
      type: 'premium',
      video: videos[5],
      description: 'High energy video opener'
    }
  ],
  instagram: [
    {
      id: 'ig-1',
      name: 'Trendy Reel',
      duration: '15s',
      type: 'free',
      video: videos[6],
      description: 'Trendy social media reel'
    },
    {
      id: 'ig-2',
      name: 'Fashion Reel',
      duration: '10s',
      type: 'free',
      video: videos[7],
      description: 'Fashion focused template'
    },
    {
      id: 'ig-3',
      name: 'Beauty Tutorial',
      duration: '30s',
      type: 'premium',
      video: videos[8],
      description: 'Beauty content template'
    },
    {_id: 'ig-4',
      name: 'Fitness Reel',
      duration: '15s',
      type: 'free',
      video: videos[9],
      description: 'Fitness workout template'
    },
    {
      id: 'ig-5',
      name: 'Food Video',
      duration: '20s',
      type: 'premium',
      video: videos[10],
      description: 'Food content template'
    },
    {
      id: 'ig-6',
      name: 'Travel Reel',
      duration: '15s',
      type: 'free',
      video: videos[0],
      description: 'Travel vlogging template'
    }
  ],
  wedding: [
    {
      id: 'wed-1',
      name: 'Classic Love Story',
      duration: '60s',
      type: 'premium',
      video: videos[1],
      description: 'Romantic wedding slideshow'
    },
    {
      id: 'wed-2',
      name: 'Ceremony Highlight',
      duration: '45s',
      type: 'free',
      video: videos[2],
      description: 'Ceremony moments highlight'
    },
    {
      id: 'wed-3',
      name: 'Reception Reel',
      duration: '90s',
      type: 'premium',
      video: videos[3],
      description: 'Reception party video'
    },
    {
      id: 'wed-4',
      name: 'Photo Montage',
      duration: '120s',
      type: 'premium',
      video: videos[4],
      description: 'Complete wedding montage'
    },
    {
      id: 'wed-5',
      name: 'Guest Messages',
      duration: '60s',
      type: 'free',
      video: videos[5],
      description: 'Guest greeting compilation'
    },
    {
      id: 'wed-6',
      name: 'Romantic Cinematic',
      duration: '150s',
      type: 'premium',
      video: videos[6],
      description: 'Cinematic wedding video'
    }
  ],
  birthday: [
    {
      id: 'bday-1',
      name: 'Fun Birthday Intro',
      duration: '20s',
      type: 'free',
      video: videos[7],
      description: 'Fun and colorful intro'
    },
    {
      id: 'bday-2',
      name: 'Birthday Countdown',
      duration: '30s',
      type: 'free',
      video: videos[8],
      description: 'Countdown to party'
    },
    {
      id: 'bday-3',
      name: 'Kids Party Video',
      duration: '45s',
      type: 'premium',
      video: videos[9],
      description: 'Kids birthday party template'
    },
    {
      id: 'bday-4',
      name: 'Milestone Birthday',
      duration: '60s',
      type: 'premium',
      video: videos[10],
      description: 'Milestone celebration video'
    },
    {
      id: 'bday-5',
      name: 'Photo Slideshow',
      duration: '90s',
      type: 'free',
      video: videos[0],
      description: 'Birthday photo montage'
    },
    {
      id: 'bday-6',
      name: 'Birthday Surprise',
      duration: '45s',
      type: 'premium',
      video: videos[1],
      description: 'Surprise birthday video'
    }
  ],
  business: [
    {
      id: 'bus-1',
      name: 'Corporate Intro',
      duration: '15s',
      type: 'premium',
      video: videos[2],
      description: 'Professional corporate video'
    },
    {
      id: 'bus-2',
      name: 'Product Demo',
      duration: '30s',
      type: 'free',
      video: videos[3],
      description: 'Product showcase template'
    },
    {
      id: 'bus-3',
      name: 'Service Promo',
      duration: '45s',
      type: 'premium',
      video: videos[4],
      description: 'Service promotional video'
    },
    {
      id: 'bus-4',
      name: 'Company Culture',
      duration: '60s',
      type: 'premium',
      video: videos[5],
      description: 'Company culture video'
    },
    {
      id: 'bus-5',
      name: 'Testimonial Video',
      duration: '20s',
      type: 'free',
      video: videos[6],
      description: 'Customer testimonial template'
    },
    {
      id: 'bus-6',
      name: 'Sales Pitch',
      duration: '45s',
      type: 'premium',
      video: videos[7],
      description: 'Professional sales pitch'
    }
  ],
  education: [
    {
      id: 'edu-1',
      name: 'Course Intro',
      duration: '20s',
      type: 'free',
      video: videos[8],
      description: 'Online course introduction'
    },
    {
      id: 'edu-2',
      name: 'Tutorial Outline',
      duration: '30s',
      type: 'free',
      video: videos[9],
      description: 'Tutorial step outline'
    },
    {
      id: 'edu-3',
      name: 'Lecture Intro',
      duration: '25s',
      type: 'premium',
      video: videos[10],
      description: 'Lecture introduction template'
    },
    {
      id: 'edu-4',
      name: 'Lesson Recap',
      duration: '40s',
      type: 'premium',
      video: videos[0],
      description: 'Lesson recap template'
    },
    {
      id: 'edu-5',
      name: 'Q&A Session',
      duration: '45s',
      type: 'free',
      video: videos[1],
      description: 'Q&A session template'
    },
    {
      id: 'edu-6',
      name: 'Certificate Award',
      duration: '30s',
      type: 'premium',
      video: videos[2],
      description: 'Certificate achievement video'
    }
  ]
};

const HERO_ICON_MAP = {
  youtube: <FaYoutube />,
  instagram: <FaInstagram />,
  wedding: <FaHeart />,
  birthday: <FaBirthdayCake />,
  business: <FaBriefcase />,
  education: <FaGraduationCap />,
};

export const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [activeTab, setActiveTab] = useState('all');

  // Get category data
  const category = CATEGORY_DATA[categoryName];
  const templates = useMemo(() => TEMPLATES_DATA[categoryName] || [], [categoryName]);

  const heroSubheading = {
    youtube: 'Create stunning intros, outros & vlogs in minutes.',
    instagram: 'Craft viral reels and social stories with ready-made visual styles.',
    wedding: 'Transform timeless moments into cinematic stories with elegant scenes.',
    birthday: 'Build joyful birthday edits with colorful transitions and upbeat vibes.',
    business: 'Launch premium promos, ads, and brand stories with polished motion design.',
    education: 'Deliver engaging lessons and tutorials with clean, professional templates.',
  };

  const styleFromTemplate = (template) => {
    const text = `${template.name} ${template.description}`.toLowerCase();
    if (text.includes('intro')) return 'intro';
    if (text.includes('outro')) return 'outro';
    if (text.includes('vlog') || text.includes('reel')) return 'social';
    if (text.includes('promo') || text.includes('sales')) return 'promo';
    if (text.includes('cinematic') || text.includes('professional')) return 'cinematic';
    return 'creative';
  };

  const templatesWithMeta = useMemo(
    () => templates.map((template, index) => ({
      ...template,
      id: template.id || template._id || `${categoryName}-${index}`,
      styleTag: styleFromTemplate(template),
      sortOrder: index,
    })),
    [templates, categoryName]
  );

  const tabs = useMemo(() => {
    const unique = [...new Set(templatesWithMeta.map((template) => template.styleTag))].slice(0, 4);
    return ['all', ...unique];
  }, [templatesWithMeta]);

  const filteredTemplates = useMemo(() => {
    const searched = templatesWithMeta.filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tabFiltered = activeTab === 'all'
      ? searched
      : searched.filter((template) => template.styleTag === activeTab);

    const typeFiltered = tabFiltered.filter((template) => {
      if (filterType === 'free') return template.type === 'free';
      if (filterType === 'premium') return template.type === 'premium';
      if (filterType === 'duration') {
        const seconds = parseInt(template.duration, 10);
        return seconds <= 20;
      }
      if (filterType === 'style') return template.styleTag === activeTab || activeTab === 'all';
      return true;
    });

    return [...typeFiltered].sort((a, b) => {
      if (sortBy === 'popular') {
        return (a.type === 'premium' ? -1 : 1) - (b.type === 'premium' ? -1 : 1);
      }
      if (sortBy === 'trending') {
        return a.name.length - b.name.length;
      }
      return b.sortOrder - a.sortOrder;
    });
  }, [templatesWithMeta, searchQuery, activeTab, filterType, sortBy]);

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

  const handleExploreTemplates = () => {
    const section = document.getElementById('templates-grid-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <div className="hero-overlay"></div>
        <div className="hero-particles" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>

        <div className="hero-content">
          <div className="hero-icon">{HERO_ICON_MAP[category.id] || category.icon}</div>
          <h1>{category.title}</h1>
          <p>{heroSubheading[categoryName] || category.description}</p>

          <div className="hero-cta-group">
            <button className="hero-btn hero-btn-primary" onClick={handleExploreTemplates}>
              Explore Templates
            </button>
            <button className="hero-btn hero-btn-secondary" onClick={() => navigate('/editor')}>
              Start Creating
            </button>
          </div>

          <button className="scroll-indicator" onClick={handleExploreTemplates} aria-label="Scroll to templates">
            <FiArrowDown />
          </button>
        </div>
      </section>

      <section className="category-filter-wrap">
        <div className="category-filter-bar">
          <div className="search-control">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-control">
            <FiChevronDown />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Filter: All</option>
              <option value="free">Filter: Free</option>
              <option value="premium">Filter: Premium</option>
              <option value="duration">Filter: Duration</option>
              <option value="style">Filter: Style</option>
            </select>
          </div>

          <div className="filter-control">
            <FiChevronDown />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Sort: Newest</option>
              <option value="popular">Sort: Popular</option>
              <option value="trending">Sort: Trending</option>
            </select>
          </div>
        </div>

        <div className="category-tabs" role="tablist" aria-label="Template style categories">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              className={`category-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Templates Grid */}
      <section className="templates-grid-section" id="templates-grid-section">
        <div className="templates-wrapper">
          <div className="results-info">
            <h2>Available Templates</h2>
            <p>{filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found</p>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="templates-grid">
              {filteredTemplates.map((template, index) => (
                <article key={template.id} className="template-card" style={{ '--card-index': index }}>
                  {/* Preview */}
                  <div className="template-preview">
                    <video src={template.video} className="preview-video" muted autoPlay loop />
                    {template.type === 'premium' && <span className="premium-tag">Premium</span>}
                    <div className="template-duration">{template.duration}</div>
                    <div className="template-hover-overlay">
                      <button className="btn-preview">
                        <FiPlay /> Preview
                      </button>
                      <button
                        className={template.type === 'free' ? 'btn-use' : 'btn-upgrade'}
                        onClick={() => handleUseTemplate(template)}
                      >
                        {template.type === 'free' ? <><FiDownload /> Use Template</> : <>🚀 Upgrade to Use</>}
                      </button>
                    </div>
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
                    <span className="template-style-pill">{template.styleTag}</span>
                  </div>
                </article>
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

      <section className="trust-section">
        <div className="trust-wrapper">
          <h2>Why Choose Our Templates?</h2>
          <p>Built for creators who need speed, quality, and cinematic polish in every export.</p>
          <div className="trust-grid">
            <article className="trust-card">
              <div className="trust-icon"><FiZap /></div>
              <h3>Fast Rendering</h3>
              <p>Optimized template structure helps you ship videos in minutes, not hours.</p>
            </article>
            <article className="trust-card">
              <div className="trust-icon"><FiLayers /></div>
              <h3>Professional Designs</h3>
              <p>Crafted with clean spacing, cinematic pacing, and high-end visual hierarchy.</p>
            </article>
            <article className="trust-card">
              <div className="trust-icon"><FiCpu /></div>
              <h3>AI Powered</h3>
              <p>Leverage smart automation for transitions, cuts, and style matching instantly.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};
