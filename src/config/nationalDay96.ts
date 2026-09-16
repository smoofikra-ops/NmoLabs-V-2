/**
 * Saudi National Day 96 (اليوم الوطني السعودي 96) — Seasonal Experience Configuration
 * Campaign Slogan: "عزّنا بطبعنا" (Official GEA Identity reference: https://www.gea.gov.sa/nd/)
 *
 * This centralized configuration controls:
 * - Campaign activation (easily toggleable or reversible)
 * - Official brand & identity color tokens
 * - Semantic seasonal messaging (Arabic and English)
 * - Visual motif parameters
 */

export const NATIONAL_DAY_96_CONFIG = {
  // Master toggle: Set to false after campaign to revert to standard theme instantly
  isActive: true,

  edition: 96,
  
  // Official Campaign Slogan — EXACT wording: "عزّنا بطبعنا"
  sloganAr: 'عزّنا بطبعنا',
  sloganEn: 'Our Pride is in Our Nature',
  
  campaignTitleAr: 'اليوم الوطني السعودي 96',
  campaignTitleEn: 'Saudi National Day 96',

  partnershipAr: 'NmoLabs × اليوم الوطني السعودي 96',
  partnershipEn: 'NmoLabs × Saudi National Day 96',

  // Official Identity Supporting Values (قيم الهوية الوطنية الرسمية)
  valuesAr: [
    'عزّنا برؤيتنا',
    'عزّنا بأصالتنا',
    'عزّنا بهمّتنا',
    'عزّنا بجودنا',
    'عزّنا بكرمنا',
    'عزّنا بشجاعتنا',
  ],

  valuesEn: [
    'Pride in Our Vision',
    'Pride in Our Heritage',
    'Pride in Our Resolve',
    'Pride in Our Generosity',
    'Pride in Our Hospitality',
    'Pride in Our Courage',
  ],

  // Official National Day 96 Palette Tokens (Extracted from official GEA visual guidelines)
  colors: {
    // Primary Official Saudi Forest / Royal Green
    saudiGreen: '#0B5738',
    saudiGreenDark: '#073B25',
    
    // Vibrant Tech Emerald / Growth Green
    emeraldGrowth: '#008444',
    emeraldBright: '#10B981',
    emeraldMint: '#34D399',
    
    // Heritage Warm Desert Sand / Sadu Gold
    saduGold: '#C5A059',
    saduGoldLight: '#E8C872',
    saduGoldDeep: '#9E7D3B',

    // Supporting Neutral Tones
    sandPearlLight: '#FBF9F5',
    sandSurface: '#F4EFE6',

    // Dark Mode Atmospheric Charcoal Greens
    darkSurfaceDeep: '#061710',
    darkSurfaceMid: '#0B241A',
    darkSurfaceGlow: 'rgba(0, 132, 68, 0.15)',

    // Gradient Sets
    gradientEmeraldAura: 'linear-gradient(135deg, rgba(11, 87, 56, 0.18) 0%, rgba(0, 132, 68, 0.12) 50%, rgba(197, 160, 89, 0.12) 100%)',
    gradientGoldAccent: 'linear-gradient(135deg, #C5A059 0%, #E8C872 50%, #9E7D3B 100%)',
    gradientDarkEmerald: 'linear-gradient(180deg, #061710 0%, #0B241A 100%)',
  },

  // Narrative Storytelling Milestones mapped to scroll
  storytellingStages: [
    {
      id: 'hero',
      titleAr: 'عزّنا بطبعنا • انطلاقة المجد',
      titleEn: 'Atmospheric Inception • Pride in Our Nature',
      theme: 'heritage-open',
    },
    {
      id: 'systems',
      titleAr: 'أنظمة ذكية بهوية وطنية راسخة',
      titleEn: 'Enterprise Systems • Built with Pride',
      theme: 'tech-emerald',
    },
    {
      id: 'ecommerce',
      titleAr: 'تجارة رقمية تزدهر بنمو طموح',
      titleEn: 'Commerce Scaling • Flourishing Growth',
      theme: 'growth-commerce',
    },
    {
      id: 'websites',
      titleAr: 'منصات رقمية تعكس عمق هويتنا',
      titleEn: 'Digital Platforms • Cultural Depth',
      theme: 'digital-depth',
    },
    {
      id: 'performance',
      titleAr: 'تسارع بيانات وأداء بلا حدود',
      titleEn: 'Data Acceleration • Continuous Rise',
      theme: 'data-speed',
    },
    {
      id: 'social',
      titleAr: 'حضور إبداعي يلامس الوجدان',
      titleEn: 'Social Vitality • Creative Resonance',
      theme: 'social-vitality',
    },
    {
      id: 'journey',
      titleAr: 'مسار موحد نحو أهداف طموحة',
      titleEn: 'End-to-End Journey • United Path',
      theme: 'journey-path',
    },
    {
      id: 'vision',
      titleAr: 'NmoLabs × اليوم الوطني 96 • شريكك للنمو المستدام',
      titleEn: 'NmoLabs × National Day 96 • Your Growth Partner',
      theme: 'culmination',
    },
  ],
} as const;

export type NationalDayConfig = typeof NATIONAL_DAY_96_CONFIG;
