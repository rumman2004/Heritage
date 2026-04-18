/**
 * ─── Heritage Estate — Tea Catalogue ────────────────────────────────────────
 *
 * This is the single source of truth for all product data.
 * Both ProductReveal.jsx (Home) and Collection.jsx use this file.
 *
 * To add a product image, fill in the `image` field with your URL:
 *   image: 'https://your-cdn.com/images/black-tea.jpg'
 *   image: '/images/black-tea.jpg'          ← public folder
 *   image: 'https://res.cloudinary.com/...' ← Cloudinary
 *
 * `status` options:
 *   'available' — shows green pulse dot + "Enquire" button
 *   'soon'      — shows muted dot + "Notify Me" + reduced opacity
 */

export const teas = [
  {
    id:       'black',
    name:     'Black Tea',
    subName:  'Second Flush Assam',
    grade:    'TGFOP1',
    flush:    '2nd Flush',
    origin:   'Sivasagar, NE Assam',
    season:   'Summer · June',
    weight:   '100g · 250g · 500g',
    note:     'Bold · Malty · Amber',
    steep:    '95°C · 3–5 Min',
    desc:     'Full-bodied with a rich, brisk malt character. Produces a deep amber liquor that holds up beautifully to milk and honey. The definitive Assam breakfast cup.',
    tag:      'Signature',
    hue:      '#c8703a',
    glow:     'rgba(200,112,58,0.18)',
    icon:     '◈',
    status:   'available',

    // ↓ Add your image URL here
    image:    'https://res.cloudinary.com/dtbytfxzs/image/upload/v1776492446/Black_tea_dvqesn.png',
  },
  {
    id:       'green',
    name:     'Green Tea',
    subName:  'First Flush Spring',
    grade:    'FTGFOP',
    flush:    '1st Flush',
    origin:   'Sivasagar, NE Assam',
    season:   'Spring · April',
    weight:   '50g · 100g · 250g',
    note:     'Grassy · Vegetal · Bright',
    steep:    '75°C · 2–3 Min',
    desc:     'Lightly steamed to arrest oxidation at peak freshness. A vivid, green-gold cup with a clean grassy finish and a lingering natural sweetness.',
    tag:      'Limited',
    hue:      '#7a9e38',
    glow:     'rgba(122,158,56,0.18)',
    icon:     '◇',
    status:   'available',

    // ↓ Add your image URL here
    image:    'https://res.cloudinary.com/dtbytfxzs/image/upload/v1776492947/Green_tea_cxtqrb.png',
  },
  {
    id:       'orthodox',
    name:     'Orthodox Tea',
    subName:  'Whole Leaf Reserve',
    grade:    'TGFOP',
    flush:    '2nd Flush',
    origin:   'Sivasagar, NE Assam',
    season:   'Summer · May',
    weight:   '100g · 250g · 500g',
    note:     'Complex · Layered · Refined',
    steep:    '90°C · 4–5 Min',
    desc:     'Slow-rolled whole leaves preserve the full complexity of our terroir. Each cup unfolds in waves of malt, dried fruit, and distant floral notes.',
    tag:      'Everyday',
    hue:      '#c8a96e',
    glow:     'rgba(200,169,110,0.18)',
    icon:     '△',
    status:   'available',

    // ↓ Add your image URL here
    image:    'https://res.cloudinary.com/dtbytfxzs/image/upload/v1776493474/Orthodox_Tea_paa8zu.png',
  },
  {
    id:       'bamboo',
    name:     'Bamboo Tea',
    subName:  'Forest Aged',
    grade:    'Artisan',
    flush:    'Aged',
    origin:   'Sivasagar Foothills',
    season:   'Year Round',
    weight:   '80g · 200g',
    note:     'Earthy · Smoky · Woodland',
    steep:    '85°C · 5–7 Min',
    desc:     'Aged inside hollow bamboo shafts for 60 days, absorbing a subtle woody and smoky character unlike anything else in our catalogue. A truly singular experience.',
    tag:      'Artisan',
    hue:      '#5a8a5a',
    glow:     'rgba(90,138,90,0.18)',
    icon:     '○',
    status:   'soon',

    // ↓ Add your image URL here
    image:    'https://res.cloudinary.com/dtbytfxzs/image/upload/v1776493474/Bamboo_Tea_qy8ba1.png',
  },
  {
    id:       'dark',
    name:     'Dark Tea',
    subName:  'Post-Fermented',
    grade:    'Premium',
    flush:    'Fermented',
    origin:   'Sivasagar, NE Assam',
    season:   'Cellared · Perennial',
    weight:   '100g · 357g Cake',
    note:     'Deep · Earthy · Mineral',
    steep:    '98°C · 5–8 Min',
    desc:     'Microbially fermented over months in our climate-controlled cellars. Dense, complex, and profoundly smooth — a tea that improves and deepens with age.',
    tag:      'Rare',
    hue:      '#8a6a4a',
    glow:     'rgba(138,106,74,0.18)',
    icon:     '▽',
    status:   'soon',

    // ↓ Add your image URL here
    image:    'https://res.cloudinary.com/dtbytfxzs/image/upload/v1776493474/Dark_Tea_byypxz.png',
  },
  {
    id:       'herbal',
    name:     'Herbal Blend',
    subName:  'Valley Botanicals',
    grade:    'Wellness',
    flush:    'Caffeine Free',
    origin:   'Brahmaputra Valley',
    season:   'All Season',
    weight:   '50g · 100g',
    note:     'Floral · Soothing · Aromatic',
    steep:    '98°C · 7–10 Min',
    desc:     'A caffeine-free blend of estate chamomile, dried hibiscus, and wild lemongrass — grown in the same alluvial soils as our finest single-origin teas.',
    tag:      'Wellness',
    hue:      '#b87a9e',
    glow:     'rgba(184,122,158,0.18)',
    icon:     '✦',
    status:   'soon',

    // ↓ Add your image URL here
    image:    'https://res.cloudinary.com/dtbytfxzs/image/upload/v1776493474/Herbal_Blend_y2l8m7.png',
  },
];

/** Convenience filters */
export const availableTeas = teas.filter(t => t.status === 'available');
export const comingSoonTeas = teas.filter(t => t.status === 'soon');