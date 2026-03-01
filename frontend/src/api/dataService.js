// Simple localStorage-backed data service for templates and pricing
const STORAGE_KEY = 'video_studio_data_v2';

const DEFAULTS = {
  templates: [
    { id: 't-1', name: 'Cinematic Intro', category: 'YouTube', duration: '12s', type: 'premium', featured: true, image: '/assets/templates/thumb-1.svg', description: 'Epic cinematic opener with title animations' },
    { id: 't-2', name: 'Fast Social Reel', category: 'Instagram Reels', duration: '15s', type: 'free', image: '/assets/templates/thumb-2.svg', description: 'Vertical fast-cuts optimized for engagement' },
    { id: 't-3', name: 'Wedding Slideshow', category: 'Wedding', duration: '60s', type: 'premium', image: '/assets/templates/thumb-3.svg', description: 'Elegant slideshow with soft fades and overlays' },
    { id: 't-4', name: 'Product Promo', category: 'Business Promo', duration: '30s', type: 'premium', featured: true, image: '/assets/templates/thumb-4.svg', description: 'Sleek product showcase with CTA and specs' },
    { id: 't-5', name: 'Travel Vlog Opener', category: 'YouTube', duration: '12s', type: 'free', featured: true, image: '/assets/templates/thumb-5.svg', description: 'Bold travel titles and energetic cuts' },
    { id: 't-6', name: 'Recipe Quick Reel', category: 'Instagram Reels', duration: '20s', type: 'free', image: '/assets/templates/thumb-6.svg', description: 'Step-by-step cooking reel with timers' },

    { id: 't-7', name: 'Fitness Highlight', category: 'YouTube', duration: '18s', type: 'free', image: '/assets/templates/thumb-1.svg', description: 'Dynamic cuts, energetic lower-thirds' },
    { id: 't-8', name: 'Corporate Slides', category: 'Business Promo', duration: '45s', type: 'premium', image: '/assets/templates/thumb-4.svg', description: 'Clean corporate presentation with charts' },
    { id: 't-9', name: 'Beauty Lookbook', category: 'YouTube', duration: '22s', type: 'premium', image: '/assets/templates/thumb-3.svg', description: 'Soft color grading and smooth transitions' },
    { id: 't-10', name: 'Birthday Montage', category: 'Birthday', duration: '25s', type: 'free', image: '/assets/templates/thumb-2.svg', description: 'Playful stickers and upbeat music' },
    { id: 't-11', name: 'Educational Intro', category: 'Education', duration: '14s', type: 'free', image: '/assets/templates/thumb-5.svg', description: 'Clean instructional opener with bullet animations' },
    { id: 't-12', name: 'Kids Party Recap', category: 'Birthday', duration: '35s', type: 'free', image: '/assets/templates/thumb-6.svg', description: 'Colorful recap with stickers and confetti' },

    { id: 't-13', name: 'Product Unboxing', category: 'Business Promo', duration: '28s', type: 'premium', image: '/assets/templates/thumb-4.svg', description: 'Closeups, callouts and pricing card' },
    { id: 't-14', name: 'Event Highlights', category: 'YouTube', duration: '40s', type: 'premium', image: '/assets/templates/thumb-1.svg', description: 'Stomp cuts with typographic overlays' },
    { id: 't-15', name: 'Testimonial Reel', category: 'Business Promo', duration: '30s', type: 'free', image: '/assets/templates/thumb-2.svg', description: 'Customer testimonials with captions' },
    { id: 't-16', name: 'Fashion Lookbook', category: 'YouTube', duration: '20s', type: 'premium', image: '/assets/templates/thumb-3.svg', description: 'Elegant transitions and split screens' },
    { id: 't-17', name: 'Quick Tips', category: 'Education', duration: '16s', type: 'free', image: '/assets/templates/thumb-5.svg', description: 'Short tip cards ideal for social sharing' },
    { id: 't-18', name: 'Dinner Promo', category: 'Business Promo', duration: '22s', type: 'free', image: '/assets/templates/thumb-6.svg', description: 'Food closeups and menu overlays' },

    { id: 't-19', name: 'Stunning Slideshow', category: 'Wedding', duration: '50s', type: 'premium', image: '/assets/templates/thumb-3.svg', description: 'Slow cinematic slides with music sync' },
    { id: 't-20', name: 'Influencer Reel', category: 'Instagram Reels', duration: '18s', type: 'free', image: '/assets/templates/thumb-2.svg', description: 'Trendy transitions and animated captions' },
    { id: 't-21', name: 'Promo Trailer', category: 'YouTube', duration: '35s', type: 'premium', image: '/assets/templates/thumb-1.svg', description: 'Trailer-style promo with dramatic cuts' },
    { id: 't-22', name: 'Course Intro', category: 'Education', duration: '30s', type: 'premium', image: '/assets/templates/thumb-5.svg', description: 'Intro sequence for online courses' },
    { id: 't-23', name: 'Announcement Post', category: 'Business Promo', duration: '12s', type: 'free', image: '/assets/templates/thumb-4.svg', description: 'Fast announcement with CTA button' },
    { id: 't-24', name: 'Holiday Greeting', category: 'Birthday', duration: '28s', type: 'free', image: '/assets/templates/thumb-6.svg', description: 'Festive greetings with animated snow/confetti' },
    { id: 't-25', name: 'New Cinematic Intro', category: 'YouTube', duration: '12s', type: 'premium', featured: true, image: '/assets/templates/thumb-1.svg', description: 'Epic cinematic opener with title animations' },
    { id: 't-26', name: 'New Fast Social Reel', category: 'Instagram Reels', duration: '15s', type: 'free', image: '/assets/templates/thumb-2.svg', description: 'Vertical fast-cuts optimized for engagement' },
    { id: 't-27', name: 'New Wedding Slideshow', category: 'Wedding', duration: '60s', type: 'premium', image: '/assets/templates/thumb-3.svg', description: 'Elegant slideshow with soft fades and overlays' },
    { id: 't-28', name: 'Another Cinematic Intro', category: 'YouTube', duration: '12s', type: 'premium', featured: true, image: '/assets/templates/thumb-1.svg', description: 'Epic cinematic opener with title animations' },
    { id: 't-29', name: 'Another Fast Social Reel', category: 'Instagram Reels', duration: '15s', type: 'free', image: '/assets/templates/thumb-2.svg', description: 'Vertical fast-cuts optimized for engagement' },
    { id: 't-30', name: 'Another Wedding Slideshow', category: 'Wedding', duration: '60s', type: 'premium', image: '/assets/templates/thumb-3.svg', description: 'Elegant slideshow with soft fades and overlays' },
    { id: 't-31', name: 'Extra Product Promo', category: 'Business Promo', duration: '30s', type: 'premium', featured: true, image: '/assets/templates/thumb-4.svg', description: 'Sleek product showcase with CTA and specs' },
    { id: 't-32', name: 'Extra Travel Vlog Opener', category: 'YouTube', duration: '12s', type: 'free', featured: true, image: '/assets/templates/thumb-5.svg', description: 'Bold travel titles and energetic cuts' },
    { id: 't-33', name: 'Extra Recipe Quick Reel', category: 'Instagram Reels', duration: '20s', type: 'free', image: '/assets/templates/thumb-6.svg', description: 'Step-by-step cooking reel with timers' },
  ],
  pricing: [
    { id: 'p-1', name: 'Free', price: 0, features: ['Up to 5 projects', '480p export'] },
    { id: 'p-2', name: 'Basic', price: 9.99, features: ['Up to 100 projects', '1080p export'] },
    { id: 'p-3', name: 'Pro', price: 19.99, features: ['Unlimited projects', '4K export'] },
  ],
};

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
      return JSON.parse(JSON.stringify(DEFAULTS));
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read data store', e);
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Templates API
export function getTemplates() {
  return readStore().templates || [];
}

export function addTemplate(template) {
  const store = readStore();
  const t = { ...template, id: template.id || `t-${Date.now()}` };
  store.templates = [t, ...(store.templates || [])];
  writeStore(store);
  return t;
}

export function updateTemplate(id, changes) {
  const store = readStore();
  store.templates = (store.templates || []).map(t => (t.id === id ? { ...t, ...changes } : t));
  writeStore(store);
}

export function deleteTemplate(id) {
  const store = readStore();
  store.templates = (store.templates || []).filter(t => t.id !== id);
  writeStore(store);
}

// Pricing API
export function getPricing() {
  return readStore().pricing || [];
}

export function addPricing(plan) {
  const store = readStore();
  const p = { ...plan, id: plan.id || `p-${Date.now()}` };
  store.pricing = [p, ...(store.pricing || [])];
  writeStore(store);
  return p;
}

export function updatePricing(id, changes) {
  const store = readStore();
  store.pricing = (store.pricing || []).map(p => (p.id === id ? { ...p, ...changes } : p));
  writeStore(store);
}

export function deletePricing(id) {
  const store = readStore();
  store.pricing = (store.pricing || []).filter(p => p.id !== id);
  writeStore(store);
}

export function resetDataToDefaults() {
  writeStore(DEFAULTS);
}
