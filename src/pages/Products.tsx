import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Package,
  Zap,
  Grid,
  Cable,
  Shield,
  Battery,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Award,
  ChevronRight,
  Sun,
  BatteryCharging,
  Wind,
  Thermometer,
  Droplets,
  Phone,
  Mail,
  MapPin,
  Plus,
  Check
} from 'lucide-react';

// Import Earthing Images
import convLightningArrester from '../assets/earthingImages/Conventional Lightning Arrester.jpg';
import eseLightningArrester from '../assets/earthingImages/ESE Lightning Arrester .jpg';
import copperBondedRod from '../assets/earthingImages/Copper Bonded Earthing Rod.jpg';
import copperStrip from '../assets/earthingImages/Copper Strip.jpg';
import earthingCompound from '../assets/earthingImages/EARTHING COMPOUND.png';
import earthingChamber from '../assets/earthingImages/Earthing Chamber (RCC & GI Cast Iron).jpg';
import giEarthingStrip from '../assets/earthingImages/Hot Dip GI Earthing Strip.jpg';
import cableTray from '../assets/earthingImages/Tray Type Cable Tray.png';
import chemicalRod from '../assets/earthingImages/61kJFyrV6dL._AC_UF894,1000_QL80_.jpg';
import maintenanceFreeRod from '../assets/earthingImages/Earthing rod copper bonded.jpg';
import pitCover from '../assets/earthingImages/Earthing Chamber (RCC & Gi cast iron)(1).jpg';
import commercialKit from '../assets/earthingImages/ChatGPT Image Feb 5, 2026, 11_24_14 AM.png';
import lightningSystem from '../assets/earthingImages/ph19871.jpg.webp';

// Import Fencing Images
import barbedWire from '../assets/fencingImages/Barbed Wire - 1.jpg';
import concertinaCoil from '../assets/fencingImages/Concertina Coil - 1.jpg';
import giChainLink from '../assets/fencingImages/GI Chain Link Fence - 1.jpg';
import pvcChainLink from '../assets/fencingImages/PVC CHAIN LINK - 1.jpg';
import razorPanel from '../assets/fencingImages/Razor Panel - 1.jpg';
import tensionWire from '../assets/fencingImages/Tension Wires - 1.jpg';
import wireMesh from '../assets/fencingImages/Wire Mesh.jpg';
import fenceGuard from '../assets/fencingImages/5019340_PG1.jpg';

// Type definitions
interface ProductCategory {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: {
    key: string;
    value: string;
  }[];
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  isFeatured: boolean;
  tags: string[];
}

interface ProductService {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

// Intersection Observer Hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Earthing & Lighting protecting solution';
  const initialSearch = searchParams.get('product') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  // Update states when search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    const prod = searchParams.get('product');
    if (cat) setSelectedCategory(cat);
    if (prod) setSearchQuery(prod);
  }, [searchParams]);

  // Stats & Refs
  const headerAnim = useScrollAnimation();
  const searchAnim = useScrollAnimation();
  const categoriesAnim = useScrollAnimation();
  const productsAnim = useScrollAnimation();
  const featuredAnim = useScrollAnimation();
  const servicesAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  // Hero background images carousel
  const heroBgImages = [
    'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80'
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroBgImages.length);
    }, 3000); // changes every 3 seconds
    return () => clearInterval(timer);
  }, []);

  // Product categories
  const categories: ProductCategory[] = [
    {
      id: 1,
      name: 'Earthing & Lighting protecting solution',
      description: 'Grounding and safety equipment',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      count: 14
    },
    {
      id: 2,
      name: 'Fencing & boundary solution',
      description: 'Security and perimeter protection',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-slate-500 to-slate-700',
      count: 12
    },
    {
      id: 3,
      name: 'Cable management system',
      description: 'Organized cable routing',
      icon: <Cable className="w-8 h-8" />,
      color: 'from-blue-500 to-purple-500',
      count: 1
    },
    {
      id: 4,
      name: 'Street Lights & Lighting Solution',
      description: 'Efficient illumination',
      icon: <Sun className="w-8 h-8" />,
      color: 'from-orange-500 to-yellow-500',
      count: 0
    },
    {
      id: 5,
      name: 'Dwc Pipes & Its accessories',
      description: 'Drainage and cable protection',
      icon: <Grid className="w-8 h-8" />,
      color: 'from-gray-600 to-gray-700',
      count: 0
    },
    {
      id: 6,
      name: 'Precast Boundary Wall',
      description: 'Prefabricated boundary walls',
      icon: <Grid className="w-8 h-8" />,
      color: 'from-red-500 to-pink-500',
      count: 0
    },
    {
      id: 7,
      name: 'Fire safety System',
      description: 'Emergency fire prevention',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-500',
      count: 0
    },
  ];

  // Sample products data
  const products: Product[] = [
    {
      id: 1,
      name: 'Monocrystalline Solar Panel',
      category: 'Solar Panels',
      description: 'High-efficiency 450W monocrystalline solar panel with PERC technology for maximum energy output.',
      features: [
        '450W Output',
        'PERC Technology',
        '25-Year Warranty',
        'High Weather Resistance'
      ],
      specifications: [
        { key: 'Efficiency', value: '22.5%' },
        { key: 'Dimensions', value: '2000 x 1000 mm' },
        { key: 'Weight', value: '23 kg' },
        { key: 'Temperature Coefficient', value: '-0.35%/°C' }
      ],
      price: 299,
      discount: 15,
      rating: 4.8,
      reviews: 142,
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
      isFeatured: true,
      tags: ['Best Seller', 'High Efficiency', 'Premium']
    },
    {
      id: 2,
      name: 'String Inverter 5kW',
      category: 'Inverters',
      description: 'Advanced string inverter with smart monitoring and high conversion efficiency.',
      features: [
        '5kW Capacity',
        '98.5% Efficiency',
        'WiFi Monitoring',
        'MPPT Technology'
      ],
      specifications: [
        { key: 'Input Voltage', value: '150-800V DC' },
        { key: 'Output', value: '230V AC' },
        { key: 'Efficiency', value: '98.5%' },
        { key: 'Warranty', value: '10 Years' }
      ],
      price: 899,
      rating: 4.6,
      reviews: 89,
      imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
      isFeatured: true,
      tags: ['Smart', 'Efficient', 'Premium']
    },
    {
      id: 3,
      name: 'Aluminum Mounting System',
      category: 'Mounting Structures',
      description: 'Durable aluminum mounting structure for rooftop installations with anti-corrosion coating.',
      features: [
        'Aluminum Construction',
        'Corrosion Resistant',
        'Easy Installation',
        'Adjustable Angles'
      ],
      specifications: [
        { key: 'Material', value: 'Aluminum 6063' },
        { key: 'Load Capacity', value: '5400 Pa' },
        { key: 'Wind Resistance', value: '150 km/h' },
        { key: 'Warranty', value: '15 Years' }
      ],
      price: 199,
      discount: 10,
      rating: 4.7,
      reviews: 67,
      imageUrl: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=600&h=400&fit=crop',
      isFeatured: false,
      tags: ['Durable', 'Corrosion Proof', 'Easy Install']
    },
    {
      id: 4,
      name: 'Solar DC Cable',
      category: 'Cables & Accessories',
      description: 'UV-resistant solar DC cable with double insulation for maximum safety and durability.',
      features: [
        'UV Resistant',
        'Double Insulation',
        'Fire Retardant',
        'Copper Conductor'
      ],
      specifications: [
        { key: 'Size', value: '4mm²' },
        { key: 'Voltage', value: '1000V DC' },
        { key: 'Temperature Range', value: '-40°C to 90°C' },
        { key: 'Certification', value: 'TUV/UL' }
      ],
      price: 2.99,
      rating: 4.5,
      reviews: 45,
      imageUrl: 'https://images.unsplash.com/photo-1622495505533-1e6d05a8b448?w=600&h=400&fit=crop',
      isFeatured: false,
      tags: ['High Quality', 'Certified', 'Durable']
    },

    {
      id: 6,
      name: 'Solar Battery 5kWh',
      category: 'Other Components',
      description: 'Lithium-ion solar battery with smart BMS for energy storage solutions.',
      features: [
        '5kWh Capacity',
        'Lithium-ion',
        'Smart BMS',
        '10-Year Warranty'
      ],
      specifications: [
        { key: 'Capacity', value: '5 kWh' },
        { key: 'Chemistry', value: 'LiFePO4' },
        { key: 'Cycle Life', value: '6000 Cycles' },
        { key: 'Efficiency', value: '95%' }
      ],
      price: 1499,
      discount: 20,
      rating: 4.9,
      reviews: 156,
      imageUrl: 'https://images.unsplash.com/photo-1629654291660-3c98113a0438?w=600&h=400&fit=crop',
      isFeatured: true,
      tags: ['High Capacity', 'Long Life', 'Smart']
    },
    {
      id: 7,
      name: 'Polycrystalline Solar Panel',
      category: 'Solar Panels',
      description: 'Cost-effective 400W polycrystalline solar panel with excellent performance.',
      features: [
        '400W Output',
        'Cost Effective',
        '20-Year Warranty',
        'Reliable Performance'
      ],
      specifications: [
        { key: 'Efficiency', value: '18.5%' },
        { key: 'Dimensions', value: '1960 x 992 mm' },
        { key: 'Weight', value: '21.5 kg' },
        { key: 'Temperature Coefficient', value: '-0.40%/°C' }
      ],
      price: 229,
      rating: 4.3,
      reviews: 78,
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop',
      isFeatured: false,
      tags: ['Cost Effective', 'Reliable', 'Budget']
    },
    {
      id: 8,
      name: 'Hybrid Inverter 8kW',
      category: 'Inverters',
      description: 'Hybrid inverter with battery backup and grid connectivity options.',
      features: [
        '8kW Capacity',
        'Hybrid Operation',
        'Battery Backup',
        'Grid Interactive'
      ],
      specifications: [
        { key: 'Input Voltage', value: '120-450V DC' },
        { key: 'Output', value: '230V AC' },
        { key: 'Efficiency', value: '97.5%' },
        { key: 'Battery Voltage', value: '48V' }
      ],
      price: 1299,
      discount: 12,
      rating: 4.7,
      reviews: 94,
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
      isFeatured: true,
      tags: ['Hybrid', 'Grid-tie', 'Backup']
    },
    {
      id: 9,
      name: 'Conventional Lightning Arrester',
      category: 'Earthing & Lighting protecting solution',
      description: 'Conventional Lightning Arresters provide dependable protection against lightning strikes by directing electrical discharge safely to the grounding system.',
      features: [
        'Solar Plant Protection',
        'Industrial Buildings',
        'Communication Towers',
      ],
      specifications: [
        { key: 'Material', value: 'Electrolytic Copper' },
        { key: 'Height', value: '1.2 m' },
        { key: 'Effective Radius', value: '35 m' },
        { key: 'Standard', value: 'IEC 62305' }
      ],
      price: 45.00,
      rating: 4.5,
      reviews: 24,
      imageUrl: convLightningArrester,
      isFeatured: false,
      tags: ['Safety', 'Copper', 'Protection']
    },
    {
      id: 10,
      name: 'ESE Lightning Arrester',
      category: 'Earthing & Lighting protecting solution',
      description: 'ESE Lightning Arrester protects solar power plants from lightning strikes by capturing the lightning discharge and safely transferring the energy to the ground.',
      features: [
        'Solar Ground Mounted Power Plants',
        'Industrial Solar Installations',
        'Electrical Infrastructure Protection'
      ],
      specifications: [
        { key: 'Radius', value: 'Up to 100 m' },
        { key: 'Material', value: 'SS 316' },
        { key: 'Time Gain', value: '60 μs' },
        { key: 'Weight', value: '4.5 kg' }
      ],
      price: 285.00,
      rating: 4.9,
      reviews: 18,
      imageUrl: eseLightningArrester,
      isFeatured: true,
      tags: ['Advanced', 'Industrial', 'Reliable']
    },
    {
      id: 11,
      name: 'Copper Bonded Earthing Rod',
      category: 'Earthing & Lighting protecting solution',
      description: 'Copper Bonded Earthing Rods provide strong and reliable grounding for solar installations with excellent conductivity and corrosion resistance.',
      features: [
        'Solar Module Structure ',
        'Earthing, Inverter & Transformer Earthing',
        'Solar Plant Grounding Systems',
      ],
      specifications: [
        { key: 'Length', value: '3 m' },
        { key: 'Diameter', value: '17.2 mm' },
        { key: 'Coating', value: '250+ Microns' },
        { key: 'Life Span', value: '25+ Years' }
      ],
      price: 38.50,
      rating: 4.7,
      reviews: 56,
      imageUrl: copperBondedRod,
      isFeatured: false,
      tags: ['Durable', 'High Quality', 'Standard']
    },
    {
      id: 12,
      name: 'Pure Copper Strip',
      category: 'Earthing & Lighting protecting solution',
      description: 'Copper Strips provide high electrical conductivity and are widely used in solar grounding and lightning protection systems.',
      features: [
        'Inverter Earthing',
        'Lightning Protection Systems',
        'Industrial Electrical Installations',
      ],
      specifications: [
        { key: 'Width', value: '25 mm' },
        { key: 'Thickness', value: '3 mm' },
        { key: 'Material', value: 'High Grade Copper' },
        { key: 'Purity', value: '99.9%' }
      ],
      price: 12.50,
      rating: 4.6,
      reviews: 32,
      imageUrl: copperStrip,
      isFeatured: false,
      tags: ['Network', 'Copper', 'Flexible']
    },
    {
      id: 13,
      name: 'Advanced Earthing Compound',
      category: 'Earthing & Lighting protecting solution',
      description: 'Earthing Compound improves soil conductivity and reduces earth resistance for effective grounding performance.',
      features: [
        'Solar Plant Earthing Systems',
        'Power Plants & Substations',
        'Electrical Infrastructure Projects',
      ],
      specifications: [
        { key: 'Weight', value: '25 kg Bag' },
        { key: 'Resistivity', value: '< 0.12 Ω-m' },
        { key: 'Type', value: 'Bentonite Based' },
        { key: 'Shelf Life', value: '2 Years' }
      ],
      price: 15.99,
      rating: 4.8,
      reviews: 89,
      imageUrl: earthingCompound,
      isFeatured: false,
      tags: ['Maintenance Free', 'Soil Treatment', 'Essential']
    },
    {
      id: 14,
      name: 'RCC Earthing Chamber',
      category: 'Earthing & Lighting protecting solution',
      description: 'Earthing Chambers are designed to protect earthing electrodes and allow easy inspection and maintenance.',
      features: [
        'Solar Plant Earthing Points',
        'Electrical Infrastructure Projects',
        'Industrial Grounding Systems',
      ],
      specifications: [
        { key: 'Size', value: '300x300x300 mm' },
        { key: 'Material', value: 'RCC' },
        { key: 'Weight', value: '18 kg' },
        { key: 'Load Capacity', value: '5 Tons' }
      ],
      price: 22.00,
      rating: 4.4,
      reviews: 28,
      imageUrl: earthingChamber,
      isFeatured: false,
      tags: ['Inspection', 'Safety', 'Durable']
    },
    {
      id: 15,
      name: 'Hot Dip GI Earthing Strip',
      category: 'Earthing & Lighting protecting solution',
      description: 'Hot Dip Galvanized Earthing Strips are used for effective grounding connections in solar plants and ensure safe discharge of fault currents.',
      features: [
        'Solar Structure Earthing',
        'Electrical Panel Grounding',
        'Power Distribution Systems',
      ],
      specifications: [
        { key: 'Width', value: '50 mm' },
        { key: 'Thickness', value: '6 mm' },
        { key: 'Coating', value: 'Hot Dip Galvanized' },
        { key: 'Zinc Layer', value: '80-100 Microns' }
      ],
      price: 8.50,
      rating: 4.3,
      reviews: 41,
      imageUrl: giEarthingStrip,
      isFeatured: false,
      tags: ['GI', 'Budget', 'Protection']
    },
    {
      id: 16,
      name: 'Perforated Cable Tray',
      category: 'Earthing & Lighting protecting solution',
      description: 'High-quality perforated cable trays for organized and safe routing of solar and earthing cables.',
      features: [
        'High Load Capacity',
        'Excellent Ventilation',
        'Easy Fitting',
        'Corrosion Proof'
      ],
      specifications: [
        { key: 'Width', value: '150 mm' },
        { key: 'Material', value: 'Galvanized Steel' },
        { key: 'Length', value: '2.5 m' },
        { key: 'Side Height', value: '50 mm' }
      ],
      price: 29.00,
      rating: 4.5,
      reviews: 19,
      imageUrl: cableTray,
      isFeatured: false,
      tags: ['Routing', 'Organized', 'Cable Management']
    },
    {
      id: 17,
      name: 'Chemical Earthing Electrode',
      category: 'Earthing & Lighting protecting solution',
      description: 'Advanced chemical electrode with internal crystalline filling for ultra-low resistance earthing.',
      features: [
        'Pipe-in-Pipe Design',
        'Crystalline Filling',
        'Maintenance Free',
        'Long Life'
      ],
      specifications: [
        { key: 'Diameter', value: '80 mm' },
        { key: 'Length', value: '3 m' },
        { key: 'Material', value: 'GI with Copper coating' },
        { key: 'Life', value: '15-20 Years' }
      ],
      price: 110.00,
      rating: 4.7,
      reviews: 35,
      imageUrl: chemicalRod,
      isFeatured: true,
      tags: ['High Perf', 'Chemical', 'Premium']
    },
    {
      id: 18,
      name: 'Maintenance-Free Copper Rod',
      category: 'Earthing & Lighting protecting solution',
      description: 'Specialized copper rod designed for maintenance-free earthing in high resistivity soils.',
      features: [
        'Solid Core',
        'Excellent Surface Area',
        'Uniform Resistance',
        'Reliable'
      ],
      specifications: [
        { key: 'Material', value: 'Solid Copper Bonded' },
        { key: 'Length', value: '10 ft' },
        { key: 'Diameter', value: '16 mm' },
        { key: 'Standard', value: 'UL 467' }
      ],
      price: 52.00,
      rating: 4.6,
      reviews: 22,
      imageUrl: maintenanceFreeRod,
      isFeatured: false,
      tags: ['Maintenance Free', 'High Quality']
    },
    {
      id: 19,
      name: 'Industrial Pit Cover',
      category: 'Earthing & Lighting protecting solution',
      description: 'Cast iron pit covers for heavy industrial areas providing easy access to earthing nodes.',
      features: [
        'Cast Iron',
        'Anti-Skid Surface',
        'Heavy Duty',
        'Easy Removal'
      ],
      specifications: [
        { key: 'Material', value: 'Cast Iron / RCC' },
        { key: 'Diameter', value: '350 mm' },
        { key: 'Load Class', value: 'C250' },
        { key: 'Weight', value: '12 kg' }
      ],
      price: 18.00,
      rating: 4.2,
      reviews: 15,
      imageUrl: pitCover,
      isFeatured: false,
      tags: ['Industrial', 'Heavy Duty', 'Access']
    },
    {
      id: 20,
      name: 'Complete Earthing Kit',
      category: 'Earthing & Lighting protecting solution',
      description: 'All-in-one commercial earthing kit including electrode, compound, and chamber for quick installation.',
      features: [
        'Ready to Install',
        'Optimized Components',
        'Cost Saving',
        'Quality Tested'
      ],
      specifications: [
        { key: 'Electrode', value: '2 m Copper Bonded' },
        { key: 'Compound', value: '10 kg Bentonite' },
        { key: 'Chamber', value: 'Standard Size' },
        { key: 'Warranty', value: '5 Years' }
      ],
      price: 89.00,
      rating: 4.8,
      reviews: 64,
      imageUrl: commercialKit,
      isFeatured: true,
      tags: ['Kit', 'Commercial', 'Ready-to-use']
    },
    {
      id: 21,
      name: 'Integrated Lightning System',
      category: 'Earthing & Lighting protecting solution',
      description: 'Complete integrated lightning protection system for tall structures and high-value installations.',
      features: [
        'Total Protection',
        'ISO Certified',
        'Weather Proof',
        'Long Service Life'
      ],
      specifications: [
        { key: 'Type', value: 'Integrated' },
        { key: 'Protection Level', value: 'Level 1' },
        { key: 'Material', value: 'Composite' },
        { key: 'Warranty', value: '10 Years' }
      ],
      price: 450.00,
      rating: 4.9,
      reviews: 12,
      imageUrl: lightningSystem,
      isFeatured: false,
      tags: ['System', 'Comprehensive', 'Premium']
    },
    {
      id: 22,
      name: 'High-Tensile Barbed Wire',
      category: 'Fencing & boundary solution',
      description: 'Barbed Wire is a cost-effective security fencing material with sharp barbs spaced along the wire to prevent unauthorized entry. We supply high-quality barbed wire suitable for various perimeter protection applications.',
      features: [
        'Agricultural fencing',
        'Boundary security',
        'Solar plant fencing',
        'Industrial and restricted area protection'
      ],
      specifications: [
        { key: 'Material', value: 'Hot Dip GI' },
        { key: 'Wire Gauge', value: '12 / 14 SWG' },
        { key: 'Barb Spacing', value: '3-4 inches' },
        { key: 'Length/Roll', value: '200-400 m' }
      ],
      price: 35.00,
      rating: 4.5,
      reviews: 42,
      imageUrl: barbedWire,
      isFeatured: false,
      tags: ['Security', 'Galvanized', 'Heavy Duty']
    },
    {
      id: 23,
      name: 'Concertina Coil Fence',
      category: 'Fencing & boundary solution',
      description: 'Concertina Coil is a high-security fencing solution made with razor-sharp blades formed into coils, designed to act as a strong deterrent against intrusion. We supply concertina coils for high-security perimeter protection.',
      features: [
        ' Solar power plant security',
        'Industrial premises protection',
        'Airports and defense areas',
        'High-security installations'
      ],
      specifications: [
        { key: 'Diameter', value: '450 mm / 600 mm' },
        { key: 'Blade Type', value: 'BTO-22' },
        { key: 'Core Wire', value: '2.5 mm High Tensile' },
        { key: 'Stretch Length', value: '6-8 m' }
      ],
      price: 65.00,
      rating: 4.8,
      reviews: 28,
      imageUrl: concertinaCoil,
      isFeatured: true,
      tags: ['Anti-Climb', 'Extreme Security']
    },
    {
      id: 24,
      name: 'GI Chain Link Fence',
      category: 'Fencing & boundary solution',
      description: 'GI Chain Link Fence is a durable fencing solution made from galvanized steel wire, designed to provide strong and long-lasting perimeter protection. We supply high-quality chain link fencing suitable for various industrial and infrastructure applications.',
      features: [
        'Solar power plant perimeter fencing',
        'Industrial and factory boundaries',
        'Agricultural land protection',
        'Residential and commercial security fencing'
      ],
      specifications: [
        { key: 'Material', value: 'GI Wire' },
        { key: 'Mesh Size', value: '2x2 inch' },
        { key: 'Wire Gauge', value: '10 / 12 SWG' },
        { key: 'Height Range', value: '4-8 ft' }
      ],
      price: 120.00,
      rating: 4.6,
      reviews: 55,
      imageUrl: giChainLink,
      isFeatured: false,
      tags: ['Industrial', 'Versatile', 'Clear View']
    },
    {
      id: 25,
      name: 'PVC Coated Chain Link',
      category: 'Fencing & boundary solution',
      description: 'PVC Chain Link Fence consists of galvanized steel wire coated with protective PVC, offering enhanced resistance against rust, weather, and corrosion. We supply reliable fencing solutions suitable for outdoor installations.',
      features: [
        'Solar farm fencing',
        'Parks and garden fencing',
        'Sports grounds and playgrounds',
        'Residential and commercial boundaries'
      ],
      specifications: [
        { key: 'Coating', value: 'PVC over GI' },
        { key: 'Color', value: 'Green / Blue' },
        { key: 'Service Life', value: '15+ Years' },
        { key: 'Core Wire', value: '3.0 mm' }
      ],
      price: 145.00,
      rating: 4.7,
      reviews: 34,
      imageUrl: pvcChainLink,
      isFeatured: false,
      tags: ['Aesthetic', 'Corrosion Proof']
    },
    {
      id: 26,
      name: 'Professional Razor Panel',
      category: 'Fencing & boundary solution',
      description: 'Razor Panels are high-security fencing panels integrated with razor wire to provide enhanced perimeter protection. We supply durable razor panels suitable for sensitive and restricted areas.',
      features: [
        'Power plants and solar farms',
        'Industrial security fencing',
        ' Defense and restricted zones',
        ' High-security facilities'
      ],
      specifications: [
        { key: 'Panel Size', value: '2x2.5 m' },
        { key: 'Grip Type', value: 'Riveted' },
        { key: 'Wire Material', value: 'High Carbon Steel' },
        { key: 'Blade Size', value: '22 mm' }
      ],
      price: 95.00,
      rating: 4.9,
      reviews: 15,
      imageUrl: razorPanel,
      isFeatured: false,
      tags: ['Panel', 'Industrial Security']
    },
    {
      id: 27,
      name: 'High-Tension Core Wires',
      category: 'Fencing & boundary solution',
      description: 'Tension Wires are strong galvanized wires used to support and tighten chain link fencing systems, ensuring stability and proper alignment of the fence structure.',
      features: [
        'Chain link fence installation',
        'Solar plant fencing support',
        'Industrial boundary fencing',
        'Agricultural fencing systems'
      ],
      specifications: [
        { key: 'Material', value: 'High Carbon GI' },
        { key: 'Diameter', value: '4.0 mm' },
        { key: 'Tensile Strength', value: '1400 MPa' },
        { key: 'Coating Class', value: 'Class A' }
      ],
      price: 28.00,
      rating: 4.4,
      reviews: 19,
      imageUrl: tensionWire,
      isFeatured: false,
      tags: ['Support', 'Infrastructure']
    },
    {
      id: 28,
      name: 'Rigid Wire Mesh Fence',
      category: 'Fencing & boundary solution',
      description: 'Wire Mesh is a versatile fencing and screening material made from interwoven steel wires forming a strong grid structure. We supply quality wire mesh suitable for various industrial and construction applications.',
      features: [
        'Construction and infrastructure projects',
        'Industrial and warehouse security',
        'Agricultural enclosures',
        'Solar plant protection fencing'
      ],
      specifications: [
        { key: 'Aperture', value: '50x200 mm' },
        { key: 'Finish', value: 'Powder Coated' },
        { key: 'Wire Dia', value: '5.0 mm' },
        { key: 'Warranty', value: '10 Years' }
      ],
      price: 75.00,
      rating: 4.6,
      reviews: 21,
      imageUrl: wireMesh,
      isFeatured: false,
      tags: ['Rigid', 'Panel', 'Modern']
    },
    {
      id: 29,
      name: 'Solar Fence Energizer Guard',
      category: 'Fencing & boundary solution',
      description: 'Specialized protective housing for solar fence energizers, providing weather protection and security.',
      features: [
        'Weather Resistant',
        'Secure Locking',
        'Wall Mountable',
        'Ventilated Design'
      ],
      specifications: [
        { key: 'Material', value: 'ABS Polymer' },
        { key: 'Protection', value: 'IP65' },
        { key: 'Compatability', value: 'Universal' },
        { key: 'Size', value: 'Standard' }
      ],
      price: 155.00,
      rating: 4.9,
      reviews: 10,
      imageUrl: fenceGuard,
      isFeatured: true,
      tags: ['Electronic', 'Guardian', 'Premium']
    }
  ];

  // Services data
  const services: ProductService[] = [
    {
      id: 1,
      title: 'Technical Consultation',
      description: 'Expert guidance on solar system design and component selection.',
      icon: <Users className="w-10 h-10" />,
      features: ['Site Assessment', 'System Design', 'Component Selection', 'Feasibility Study']
    },
    {
      id: 2,
      title: 'Installation Services',
      description: 'Professional installation by certified technicians.',
      icon: <Package className="w-10 h-10" />,
      features: ['Rooftop Installation', 'Ground Mounting', 'Grid Connection', 'Commissioning']
    },
    {
      id: 3,
      title: 'Maintenance & Support',
      description: 'Regular maintenance and 24/7 technical support.',
      icon: <Shield className="w-10 h-10" />,
      features: ['Regular Maintenance', 'Troubleshooting', 'Performance Monitoring', 'Warranty Support']
    },
    {
      id: 4,
      title: 'Custom Solutions',
      description: 'Tailored solar solutions for unique requirements.',
      icon: <Award className="w-10 h-10" />,
      features: ['Custom Designs', 'Special Applications', 'Integration Solutions', 'Scale Planning']
    }
  ];

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(234, 179, 8, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
        }
        .animate-on-scroll { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Animated Background Elements */}
        <div className="fixed top-20 right-20 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="fixed bottom-20 left-20 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }}></div>
        <div className="fixed top-1/2 left-1/2 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

        {/* Header Hero Section */}
        <div className="relative -mt-2 mb-16 h-[400px] flex items-center justify-center overflow-hidden w-[100vw] ml-[calc(-50vw+50%)]">
          {/* Scrollable Background Image wrapper */}
          {heroBgImages.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                backgroundImage: `url("${img}")`,
                backgroundAttachment: 'fixed', // This makes the image scrollable/parallax
                filter: 'brightness(0.3)'
              }}
            />
          ))}
          
          <div className="relative z-10 text-center px-4" ref={headerAnim.ref}>
            <div className={`transition-all duration-1000 ${headerAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                {selectedCategory !== 'all' ? selectedCategory : 'Our Products'}
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-300">
                <span>Home</span>
                <ChevronRight className="w-4 h-4" />
                <span>Products</span>
                {selectedCategory !== 'all' && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-yellow-400">{selectedCategory}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        {/* <div
          ref={searchAnim.ref}
          className={`mb-12 ${searchAnim.isVisible ? 'animate-scale-in' : 'opacity-0'}`}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, categories, or specifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 shadow-sm"
              />
            </div>
            <button className="flex items-center justify-center px-6 py-3 bg-white border border-yellow-200 rounded-xl text-yellow-700 hover:bg-yellow-50 hover:shadow-lg transition-all duration-300 shadow-sm font-medium">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div> */}

        {/* Categories Section */}
        {/* <section ref={categoriesAnim.ref} className="mb-20">
          <div className={`flex items-center justify-between mb-8 ${categoriesAnim.isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Product Categories</h2>
              <p className="text-gray-600 mt-2">Browse our comprehensive range of solar products</p>
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === 'all'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'
                }`}
            >
              View All
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 hover:-translate-y-2 bg-white border-2 hover:shadow-xl ${categoriesAnim.isVisible ? `animate-scale-in stagger-${index % 4 + 1}` : 'opacity-0'
                  } ${selectedCategory === category.name
                    ? 'border-yellow-400 shadow-lg ring-2 ring-yellow-400/20'
                    : 'border-transparent shadow hover:border-yellow-200'
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-md`}>
                    {category.icon}
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${selectedCategory === category.name
                    ? 'bg-yellow-100 text-yellow-800 font-semibold'
                    : 'bg-gray-100 text-gray-600'
                    }`}>
                    {category.count} items
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center text-yellow-600 font-medium">
                  <span>View Products</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </button>
            ))}
          </div>
        </section> */}

        {/* Products Grid Section */}
        <section ref={productsAnim.ref} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} products found
              </p>
            </div>
            {/* <div className="flex items-center space-x-4">
              <span className="text-gray-700">Sort by:</span>
              <select className="bg-white border border-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500 shadow-sm">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div> */}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row ${productsAnim.isVisible ? `animate-scale-in stagger-${index % 4 + 1}` : 'opacity-0'}`}
                >
                  {/* Left Side: Product Image & Badges */}
                  <div className="md:w-[40%] lg:w-[35%] bg-gray-50/50 flex flex-col items-center justify-center p-8 relative border-b md:border-b-0 md:border-r border-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isFeatured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded shadow-sm z-10">
                        Featured
                      </div>
                    )}
                    {product.discount && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] uppercase font-bold px-3 py-1 rounded shadow-sm z-10">
                        -{product.discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Right Side: Product Details */}
                  <div className="md:w-[60%] lg:w-[65%] p-8 lg:p-10 flex flex-col">
                    {/* Header: Category & Rating */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-yellow-600">
                        {product.category}
                      </span>
                      {product.rating > 0 && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-gray-900 text-sm font-bold">{product.rating}</span>
                          <span className="text-gray-400 text-xs ml-1">({product.reviews})</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-8">
                      {product.description}
                    </p>

                    {/* Specifications Grid */}
                    {product.specifications && product.specifications.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {product.specifications.slice(0, 4).map((spec, idx) => (
                          <div key={idx} className="bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                            <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">{spec.key}</div>
                            <div className="text-gray-900 font-semibold text-sm">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 flex-grow">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="w-full sm:w-auto">
                         {/* Price placeholder if needed */}
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" />
                          Enquire Now
                        </button>
                        <button className="flex-1 sm:flex-none px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-xl hover:bg-yellow-400 transition-all duration-300 text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Products Section */}
        {/* <section ref={featuredAnim.ref} className="mb-20">
          <div className={`flex items-center mb-8 ${featuredAnim.isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">Our most popular and highly-rated products</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {products.filter(p => p.isFeatured).slice(0, 2).map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-300 group ${featuredAnim.isVisible ? `animate-scale-in stagger-${index + 1}` : 'opacity-0'
                  }`}
              >
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="lg:w-2/5 relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-transparent"></div>
                  </div>
                  <div className="lg:w-3/5 p-8 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-yellow-600 font-bold text-sm tracking-wider uppercase">{product.category}</span>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-900 ml-1 font-bold text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <div className="mb-6 space-y-3">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-yellow-600" />
                          </div>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {product.specifications.slice(0, 4).map((spec, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="text-xs text-gray-500">{spec.key}</div>
                          <div className="text-gray-900 font-semibold">{spec.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">${product.price}</div>
                        <div className="text-sm text-gray-500">Starting price</div>
                      </div>
                      <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Services Section */}
        <section ref={servicesAnim.ref} className="mb-20">
          <div className={`flex items-center mb-8 ${servicesAnim.isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
              <p className="text-gray-600 mt-2">Complete solar solutions from consultation to maintenance</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-300 group hover:-translate-y-2 ${servicesAnim.isVisible ? `animate-scale-in stagger-${index + 1}` : 'opacity-0'
                  }`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <div className="text-cyan-600">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-cyan-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaAnim.ref} className={` relative overflow-hidden rounded-3xl shadow-2xl ${ctaAnim.isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 animate-shimmer"></div>
          <div className="relative p-12 text-center text-white bg-amber-500  ">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-xl animate-pulse-ring">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Need Help Choosing the <span className="text-white/90 underline decoration-white/30 decoration-4">Right Products?</span>
            </h3>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
              Our solar experts are ready to help you select the perfect components for your project
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-amber-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                <Phone className="w-5 h-5 inline mr-3" />
                Call Now: +1 (555) 123-4567
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                <Mail className="w-5 h-5 inline mr-3" />
                Request Quote
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-white/20 pt-8">
              <div className="flex items-center justify-center text-white/90">
                <Clock className="w-5 h-5 mr-2" />
                24/7 Support Available
              </div>
              <div className="flex items-center justify-center text-white/90">
                <CheckCircle className="w-5 h-5 mr-2" />
                Free Technical Consultation
              </div>
              <div className="flex items-center justify-center text-white/90">
                <MapPin className="w-5 h-5 mr-2" />
                Worldwide Shipping
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;