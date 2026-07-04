export type Product = {
  id: number
  title: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  badge?: string
  description?: string
  features?: string[]
  specs?: Record<string, string>
}

/** A cart line-item: product data + quantity count */
export type CartItem = Product & { count: number }

/** Look up a product by its numeric ID */
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}


export const products: Product[] = [
  {
    id: 1,
    title: 'Titan Strike Gaming Mouse',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    category: 'Peripherals',
    rating: 4.8,
    reviews: 92,
    badge: 'Best value',
    description:
      'Engineered for precision and endurance, the Titan Strike delivers tournament-grade tracking with a 26K DPI optical sensor and ultra-lightweight honeycomb shell.',
    features: [
      '26,000 DPI optical sensor',
      'Honeycomb lightweight shell — 58g',
      'RGB underglow with 16.8M colors',
      'Onboard memory for 5 profiles',
      'Paracord-style flexible cable',
      '6 programmable buttons',
    ],
    specs: {
      Sensor: 'PixArt PMW3395',
      DPI: '100 – 26,000',
      'Polling Rate': '1000 Hz',
      Weight: '58 g',
      Buttons: '6 programmable',
      Cable: '1.8 m Paracord',
      Connectivity: 'Wired USB-A',
      Warranty: '2 Years',
    },
  },
  {
    id: 2,
    title: 'Glide Pro Gaming Mouse',
    price: 74,
    image:
      'https://i.pinimg.com/736x/dd/bc/8c/ddbc8c3e53b6f53e0dc3a7514ac0e97c.jpg',
    category: 'Gaming Mouse',
    rating: 4.6,
    reviews: 48,
    badge: 'Popular',
    description:
      'The Glide Pro combines wireless freedom with esports-grade accuracy. Featuring a symmetrical ambidextrous design and 70-hour battery life.',
    features: [
      '2.4 GHz wireless + Bluetooth',
      '70-hour battery life',
      'Ambidextrous ergonomic design',
      'PTFE glide feet',
      'DPI toggle button (400/800/1600/3200)',
      'USB-C fast charging',
    ],
    specs: {
      Sensor: 'PixArt PAW3370',
      DPI: '400 – 19,000',
      'Polling Rate': '1000 Hz',
      Weight: '63 g',
      Battery: '70 hours',
      Charging: 'USB-C',
      Connectivity: '2.4 GHz / Bluetooth 5.2',
      Warranty: '2 Years',
    },
  },
  {
    id: 3,
    title: 'Omega Core Headset',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    category: 'Audio',
    rating: 4.9,
    reviews: 120,
    badge: 'Top rated',
    description:
      'Immerse yourself in crystal-clear 7.1 surround sound. The Omega Core features custom 50 mm neodymium drivers and memory foam cushions for all-day comfort.',
    features: [
      '50 mm neodymium drivers',
      '7.1 virtual surround sound',
      'Detachable noise-cancelling mic',
      'Memory foam ear cushions',
      'Inline volume & mute controls',
      'Cross-platform compatibility',
    ],
    specs: {
      Drivers: '50 mm Neodymium',
      'Frequency Response': '20 Hz – 20 kHz',
      Impedance: '32 Ω',
      Microphone: 'Detachable boom, uni-directional',
      Weight: '298 g',
      Cable: '2 m braided',
      Connectivity: '3.5 mm / USB adapter',
      Warranty: '2 Years',
    },
  },
  {
    id: 4,
    title: 'Nova RGB Mechanical Keyboard',
    price: 149,
    image:
      'https://i.pinimg.com/1200x/ef/ba/92/efba9215034bc53676f201ffaf0c8da2.jpg',
    category: 'Keyboards',
    rating: 4.7,
    reviews: 64,
    badge: 'New',
    description:
      'Type with authority. The Nova RGB features hot-swappable switches, per-key RGB lighting, and a solid aluminum frame built for competitive gaming and productivity.',
    features: [
      'Hot-swappable mechanical switches',
      'Per-key RGB with 20 presets',
      'Aircraft-grade aluminum frame',
      'Doubleshot PBT keycaps',
      'N-key rollover & anti-ghosting',
      'Detachable USB-C cable',
    ],
    specs: {
      Layout: 'Full-size (104 keys)',
      Switches: 'Hot-swap (3/5-pin)',
      Keycaps: 'Doubleshot PBT',
      Backlight: 'Per-key RGB',
      'Anti-Ghosting': 'N-Key Rollover',
      Frame: 'Aluminum top plate',
      Cable: 'Detachable USB-C',
      Warranty: '2 Years',
    },
  },
  {
    id: 5,
    title: 'Apex 27" Gaming Monitor',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    category: 'Displays',
    rating: 4.8,
    reviews: 87,
    badge: 'Pro pick',
    description:
      'See every frame. The Apex 27" delivers buttery-smooth 165 Hz gameplay on a QHD IPS panel with 1 ms response time and HDR400 support.',
    features: [
      '27" QHD IPS (2560 × 1440)',
      '165 Hz refresh rate',
      '1 ms GtG response time',
      'HDR400 certified',
      'AMD FreeSync Premium',
      'Height-adjustable stand',
    ],
    specs: {
      'Panel Size': '27 inches',
      Resolution: '2560 × 1440 (QHD)',
      'Refresh Rate': '165 Hz',
      'Response Time': '1 ms (GtG)',
      'Panel Type': 'IPS',
      HDR: 'VESA DisplayHDR 400',
      Ports: '2× HDMI 2.1, 1× DP 1.4, 2× USB 3.0',
      Warranty: '3 Years',
    },
  },
  {
    id: 6,
    title: 'Pulse Wireless Controller',
    price: 69,
    image:
      'https://i.pinimg.com/1200x/58/19/6a/58196ada6af46aa66b72c14cb9458565.jpg',
    category: 'Controllers',
    rating: 4.5,
    reviews: 156,
    description:
      'Play your way with the Pulse Wireless. Hall-effect analog sticks eliminate drift, while dual-motor haptic feedback brings every game to life.',
    features: [
      'Hall-effect analog sticks',
      'Dual-motor haptic feedback',
      '40-hour rechargeable battery',
      'Bluetooth 5.2 + USB-C',
      'Mappable back paddles',
      'Works with PC, Switch & mobile',
    ],
    specs: {
      Connectivity: 'Bluetooth 5.2 / USB-C',
      Battery: '40 hours',
      Charging: 'USB-C',
      Vibration: 'Dual-motor haptics',
      Sticks: 'Hall-effect',
      Compatibility: 'PC, Nintendo Switch, Android, iOS',
      Weight: '230 g',
      Warranty: '1 Year',
    },
  },
  {
    id: 7,
    title: 'Stream Pro 4K Webcam',
    price: 119,
    image:
      'https://i.pinimg.com/736x/49/15/90/491590ebb1c146f0f7b28ad6c4d1ee53.jpg',
    category: 'Streaming',
    rating: 4.6,
    reviews: 41,
    badge: 'Streamer',
    description:
      'Broadcast in stunning 4K clarity. The Stream Pro features auto-focus, AI-powered low-light correction, and a built-in privacy shutter for worry-free streaming.',
    features: [
      '4K UHD @ 30 fps / 1080p @ 60 fps',
      'Autofocus with face tracking',
      'AI low-light correction',
      'Built-in stereo microphones',
      'Physical privacy shutter',
      'Universal monitor mount + tripod thread',
    ],
    specs: {
      Resolution: '4K UHD (3840 × 2160)',
      'Frame Rate': '30 fps (4K) / 60 fps (1080p)',
      'Field of View': '90°',
      Focus: 'Autofocus',
      Microphone: 'Dual stereo, omnidirectional',
      Mount: 'Clip + 1/4" tripod thread',
      Cable: '1.5 m USB-C',
      Warranty: '2 Years',
    },
  },
  {
    id: 8,
    title: 'Void XL Mouse Pad',
    price: 34,
    image:
      'https://i.pinimg.com/736x/39/e6/53/39e653702addb8f81dcd0ddea78a4f3f.jpg',
    category: 'Accessories',
    rating: 4.9,
    reviews: 203,
    badge: 'Best value',
    description:
      'Dominate your desk with the Void XL. This extended cloth pad offers micro-woven fabric for pinpoint tracking and a non-slip rubber base that stays locked in place.',
    features: [
      'Extended size (900 × 400 mm)',
      'Micro-woven cloth surface',
      'Non-slip natural rubber base',
      'Splash-resistant coating',
      'Stitched anti-fray edges',
      'Compatible with all sensor types',
    ],
    specs: {
      Dimensions: '900 × 400 × 4 mm',
      Surface: 'Micro-woven cloth',
      Base: 'Natural rubber, non-slip',
      Edges: 'Stitched anti-fray',
      Thickness: '4 mm',
      'Water Resistant': 'Splash-resistant nano coating',
      Color: 'Stealth Black',
      Warranty: '1 Year',
    },
  },
  {
    id: 9,
    title: 'Nexus Elite Gaming Chair',
    price: 349,
    image:
      'https://i.pinimg.com/736x/a1/ad/a2/a1ada249832ad718abb0934cf618620b.jpg',
    category: 'Furniture',
    rating: 4.7,
    reviews: 72,
    badge: 'Premium',
    description:
      'Game in luxury. The Nexus Elite features adaptive lumbar support, 4D armrests, and breathable mesh fabric engineered for marathon sessions.',
    features: [
      'Adaptive lumbar support system',
      '4D adjustable armrests',
      'Breathable mesh back',
      '165° recline with lock',
      'Class-4 gas lift (up to 150 kg)',
      'Premium 65 mm PU casters',
    ],
    specs: {
      'Max Load': '150 kg / 330 lbs',
      'Seat Height': '45 – 55 cm',
      Recline: '90° – 165°',
      Armrests: '4D adjustable',
      Base: 'Aluminum alloy, 5-star',
      Casters: '65 mm PU rollerblade-style',
      Upholstery: 'Breathable mesh + PU leather accents',
      Warranty: '5 Years',
    },
  },
]
