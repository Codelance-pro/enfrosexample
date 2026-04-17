import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Zap, Phone, Mail, MapPin, Award, Shield, Clock, ChevronLeft, ChevronRight, TrendingUp, Leaf, DollarSign, CheckCircle2, Star, Calculator, Battery, Home as HomeIcon, Users, Globe, Lightbulb, HeartHandshake, Headset, Truck, Layers, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-solar.jpg";
import logoImage from "@/assets/logohome.png";
import solar_landing_match_logo from "@/assets/Imgae.png!sw800.png";
import solar1 from "../assets/Utility-Scale Solar Power Plants.jpg"
import solar2 from "../assets/Agriculture & Farming Solar Solutions.jpg"
import solar3 from "../assets/Warehouse & Industrial Rooftop Solar.jpg"
import solar4 from "../assets/Villas & Residential Solar Systems.jpg"
import solar5 from "../assets/Manufacturing Unit Solar Installations.jpg"
import solar6 from "../assets/solar6.jpg"
import solar7 from "../assets/Landscape & Open-Area Solar Projects.jpg";
// import solar8 from "@/assets/solar8.JPG";
// import solar9 from "@/assets/solar9.JPG";
import solar10 from "../assets/solar10.jpg";
import homepage from "../assets/homepage.jpeg";
import homepage1 from "../assets/homepage1.jpg";
import homepage2 from "../assets/homepage2.jpg";
// import clientsGrid from "@/assets/clients-grid.png";
import client1 from "../assets/client1.jpeg";
import client2 from "../assets/client2.jpeg";
import client3 from "../assets/client3.jpeg";
import client4 from "../assets/client4.jpeg";
import client5 from "../assets/client5.jpeg";
import client6 from "../assets/client6.jpeg";
import client7 from "../assets/client7.jpeg";
import client8 from "../assets/client8.jpeg";
import client9 from "../assets/client9.jpg";
import client10 from "../assets/client10.jpeg";
import client11 from "../assets/client11.jpeg";
import client12 from "../assets/client12.jpeg";
import client13 from "../assets/client13.jpeg";
import client14 from "../assets/client14.jpeg";
import client15 from "../assets/client15.jpeg";
import client16 from "../assets/client16.png";




const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Solar Calculator States
  const [location, setLocation] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [consumerType, setConsumerType] = useState("residential");
  const [roofArea, setRoofArea] = useState("");
  const [results, setResults] = useState(null);

  const bannerSlides = [
    {
      title: "25% Off Solar Installations",
      subtitle: "Limited Time Offer - Ends Dec 31st",
      icon: Zap,
      gradient: "from-yellow-500 via-yellow-400 to-amber-400"
    },
    {
      title: "Free Energy Audit Worth $500",
      subtitle: "Get Your Custom Solar Assessment Today",
      icon: Sun,
      gradient: "from-amber-500 via-yellow-400 to-yellow-300"
    },
    {
      title: "0% Financing Available",
      subtitle: "Make Solar Affordable with Flexible Payment Plans",
      icon: Award,
      gradient: "from-yellow-600 via-amber-500 to-yellow-400"
    }
  ];

  const services = [
    {
      name: "Utility-Scale Solar Power Plants",
      icon: "⚡",
      image: solar1,
      link: "#services",
      desc: "Turnkey solar energy system provider",
      color: "from-yellow-500 to-amber-600"
    },
    {
      name: "Agriculture & Farming Solar Solutions",
      icon: "🔧",
      image: solar2,
      link: "#services",
      desc: "Solar project contracting",
      color: "from-amber-500 to-yellow-600"
    },
    {
      name: "Warehouse & Industrial Rooftop Solar",
      icon: "🏢",
      image: solar3,
      link: "#services",
      desc: "Rooftop solar Turnkey service provider",
      color: "from-yellow-400 to-amber-500"
    },
    {
      name: "Villas & Residential Solar Systems",
      icon: "🏢",
      link: "#services",
      image: solar7,
      desc: "Rooftop solar Turnkey service provider",
      color: "from-yellow-400 to-amber-500"
    },
    {
      name: "Manufacturing Unit Solar Installations",
      icon: "🏢",
      image: solar4,
      link: "#services",
      desc: "Rooftop solar Turnkey service provider",
      color: "from-yellow-400 to-amber-500"
    },
    {
      name: "Landscape & Open-Area Solar Projects",
      icon: "🏢",
      image: solar5,
      link: "#services",
      desc: "Rooftop solar Turnkey service provider",
      color: "from-yellow-400 to-amber-500"
    }
  ];

  const highlights = [
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      desc: "16+ Years of Industry Experience | 1.6+ GW Project Portfolio",
      colorClass: "from-yellow-500 to-yellow-600",
      bgClass: "bg-black/40"
    },
    {
      icon: Users,
      title: "Skilled Team",
      desc: "Strong Engineering & Project Teams",
      colorClass: "from-amber-500 to-amber-600",
      bgClass: "bg-black/40"
    },
    {
      icon: Globe,
      title: "Strong Network",
      desc: "Scalable Execution Capability | Trusted by Leading Energy Brands",
      colorClass: "from-yellow-600 to-amber-600",
      bgClass: "bg-black/40"
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      desc: "Proven On-Time Delivery Record",
      colorClass: "from-yellow-500 to-amber-500",
      bgClass: "bg-black/40"
    }
  ];

  const benefits = [
    { icon: DollarSign, text: "Save up to 70% on energy bills" },
    { icon: TrendingUp, text: "Increase property value by 4%" },
    { icon: Leaf, text: "Reduce carbon footprint by 80%" },
    { icon: Shield, text: "Protected from rising energy costs" }
  ];

  const contacts = [
    { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567" },
    { icon: Mail, title: "Email Us", info: "info@solarpower.com" },
    { icon: MapPin, title: "Visit Us", info: "123 Solar St, Green City" }
  ];

  const quoteFeatures = [
    "Free on-site energy assessment",
    "Custom system design",
    "Transparent pricing",
    "Flexible financing options"
  ];

  useEffect(() => {
    // Force preloading of the heavy hero image
    const img = new Image();
    img.src = homepage1;

    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => observer.observe(card));

    // Observe workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach(step => observer.observe(step));

    // Observe about section image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) observer.observe(aboutImage);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [bannerSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);

  // Solar Calculator Function
  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill);
    const area = parseFloat(roofArea);

    if (isNaN(bill) || isNaN(area)) return;

    // Calculation based on Indian solar standards
    const systemSize = Math.min((bill * 12) / 1200, area / 100); // kW
    const monthlyGeneration = systemSize * 120; // Units per month
    const monthlySavings = monthlyGeneration * 7; // ₹7 per unit average
    const annualSavings = monthlySavings * 12;
    const systemCost = systemSize * 50000; // ₹50,000 per kW
    const paybackPeriod = systemCost / annualSavings;
    const co2Reduction = systemSize * 1.2;
    const subsidy = Math.min(systemSize * 18000, 78000); // Govt subsidy

    setResults({
      systemSize: Math.round(systemSize * 10) / 10,
      monthlyGeneration: Math.round(monthlyGeneration),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      systemCost: Math.round(systemCost),
      netCost: Math.round(systemCost - subsidy),
      subsidy: Math.round(subsidy),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10,
      lifetimeSavings: Math.round(annualSavings * 25)
    });
  };

  const SlideIcon = bannerSlides[currentSlide].icon;

  const workflowSteps = [
    { number: "1", icon: "🤝", title: "Quality Practices", position: "top" },
    { number: "2", icon: "⚙️", title: "Integrity", position: "bottom" },
    { number: "3", icon: "🧑‍💼", title: "Excellence Through Innovation", position: "top" },
    { number: "4", icon: "💡", title: "Professionalism", position: "bottom" },
    { number: "5", icon: "🎧", title: "Lifelong Relationship", position: "top" },
    { number: "6", icon: "💰", title: "Customer Services", position: "bottom" },
    { number: "7", icon: "🔗", title: "Prompt Delivery", position: "top" },
    { number: "8", icon: "🧩", title: "Exhaustive Wide Variety", position: "bottom" }
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.3); }
          50% { box-shadow: 0 0 40px rgba(234, 179, 8, 0.6); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes rotate-360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-rotate { animation: rotate-360 20s linear infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        
        /* Scroll Animation Classes */
        .service-card,
        .workflow-step,
        .about-image {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .service-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .workflow-step.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .about-image.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }

        .workflow-step:nth-child(1) { transition-delay: 0.1s; }
        .workflow-step:nth-child(2) { transition-delay: 0.2s; }
        .workflow-step:nth-child(3) { transition-delay: 0.3s; }
        .workflow-step:nth-child(4) { transition-delay: 0.4s; }
        .workflow-step:nth-child(5) { transition-delay: 0.5s; }
        .workflow-step:nth-child(6) { transition-delay: 0.6s; }
        .workflow-step:nth-child(7) { transition-delay: 0.7s; }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
        }
        
        .parallax {
          transform: translateY(${scrollY * 0.5}px);
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
        {/* <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-amber-300/30 to-yellow-500/20"></div>
          
          
          <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, rgba(253, 224, 71, 0.2) 0%, transparent 50%)`
          }}></div>
        </div> */}

        <div className="absolute inset-0 z-0 bg-amber-100">
          <img
            src={homepage1}
            alt="Solar background"
            className={`w-full h-full object-cover transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pt-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              {/* Left Content */}
              <div className={`space-y-8 ${isVisible ? 'opacity-100' : 'opacity-0'} mb-20`}>
                {/* Subtitle */}
                {/* <div className="inline-flex items-center space-x-2 bg-yellow-100 border-2 border-yellow-400 px-4 py-2 rounded-full shadow-md animate-slide-in-left">
                  <Zap className="h-5 w-5 text-yellow-600 animate-pulse" />
                  <span className="text-yellow-800 font-semibold tracking-wide text-sm">
                    #1 Clean Energy Provider in Your Area
                  </span>
                </div> */}

                {/* <img src={logoImage} alt="Solar background" className="w-80 h-40 mt-10" /> */}

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white animate-slide-in-left delay-100">
                  Powering the Future with Reliable{" "}
                  <span className="bg-yellow-400 bg-clip-text text-transparent">
                    Solar & Renewable Energy Solutions
                  </span>
                </h1>

                {/* Main Heading */}
                {/* <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white animate-slide-in-left delay-100">
                  Power Your Future with{" "}
                  <span className="bg-yellow-400 bg-clip-text text-transparent">
                    Solar Energy
                  </span>
                </h1> */}

                {/* Description */}
                {/* <p className="text-lg md:text-xl text-black leading-relaxed animate-slide-in-left delay-200">
                  Transform your home or business with cutting-edge solar technology. Save money, reduce your carbon footprint, and invest in a sustainable future.
                </p> */}

                {/* Benefits List */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {benefits.map((benefit, index) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 text-white/90 animate-bounce-in hover-lift`}
                        style={{ animationDelay: `${0.3 + index * 0.1}s`, opacity: 0 }}
                      >
                        <div className="p-2 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-lg shadow-sm">
                          <BenefitIcon className="h-5 w-5 text-yellow-700" />
                        </div>
                        <span className="text-sm font-medium">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div> */}

                {/* CTA Buttons */}
                {/* <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up delay-500">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 shimmer-effect"></span>
                    <span className="relative">Calculate Your Savings</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Phone className="mr-2 h-5 w-5 animate-pulse" />
                    Book Free Consultation
                  </Button>
                </div> */}
              </div>

              {/* Right Content - Floating Sun Icon */}
              <div className="hidden lg:flex justify-end items-center">
                <div className="relative animate-float">
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
                  <Sun className="h-64 w-64 text-yellow-500 animate-rotate opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sun className="h-48 w-48 text-yellow-600 drop-shadow-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Banner Slider */}
      {/* <section className="py-8 overflow-hidden bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className={`bg-gradient-to-r ${bannerSlides[currentSlide].gradient} transition-all duration-1000`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="p-3 hover:bg-white/30 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <div className="flex-1 text-center text-white py-2">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
                  <div className="bg-white/30 backdrop-blur-sm p-3 rounded-2xl shadow-lg animate-bounce-in">
                    <SlideIcon className="h-10 w-10" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-1 animate-slide-in-right">
                      {bannerSlides[currentSlide].title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/95 animate-slide-in-right delay-100">
                      {bannerSlides[currentSlide].subtitle}
                    </p>
                  </div>
                  <Button className="bg-white text-yellow-700 hover:bg-yellow-50 font-semibold mt-4 sm:mt-0 shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                    Claim Offer
                  </Button>
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="p-3 hover:bg-white/30 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>

            Slide Indicators
            <div className="flex justify-center space-x-2 mt-6">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-10 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Combined About & Why Choose Us Section */}
      <section className="py-20 md:py-32  bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12ms-center justify-center">
            <div className="max-w-[1800px] mx-auto md:mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between lg:justify-between">
            {/* Left Column: Image/Graphic - Fixed to left edge */}
            <div className="hidden lg:block w-[400px] xl:w-[500px] 2xl:w-[550px] flex-shrink-0 relative about-image animate-fade-in-up">
              <img
                src={solar_landing_match_logo}
                alt="Enfros Solar Ecosystem"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              />
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-yellow-50 to-amber-100 rounded-full blur-3xl -z-10 opacity-60"></div>
            </div>

            {/* Right Column: Content - Centered */}
            <div className="flex justify-center lg:justify-start lg:pl-12 xl:pl-16 2xl:pl-20">
              <div className="max-w-2xl px-4 sm:px-6 lg:px-8 space-y-5 animate-slide-in-right">


                {/* Mobile Image */}
                <div className="lg:hidden mb-8">
                  <img
                    src={solar_landing_match_logo}
                    alt="Enfros Solar Ecosystem"
                    className="w-full max-w-md mx-auto h-auto object-contain drop-shadow-lg"
                  />
                </div>

                {/* About Header */}
                <div>
                  <div className="flex items-center space-x-2 text-yellow-600 font-bold uppercase tracking-widest text-sm mb-2">
                    <Leaf className="w-4 h-4" />
                    <span>About Our Company</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-none tracking-tight mb-4 uppercase">
                    ENFROS INDIA SOLUTION <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">PRIVATE LIMITED</span>
                  </h2>
                </div>

                {/* Description */}
                <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-3 font-medium">
                  <p>
                    ENFROS is a renewable energy service provider specializing in solar power solutions. With over 15  years of combined
                    With experience in solar and renewable energy, our directors lead the way.
                  </p>
                  <p>
                    We have successfully completed construction projects totaling over   2000   MW,   including   Installation   & Commissioning (I&C) and Balance of System (BOS). Our goal is to become the LEADING EPC SERVICE PROVIDER in the solar power plant industry.
                  </p>
                </div>

                {/* Why Choose Us */}
                <div className="pt-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sans">Why Choose Us?</h3>
                  <ul className="space-y-2">
                    {[
                      "Over 16+ years of experience in the renewable sector",
                      "Successfully executed large-scale projects (2000+ MW)",
                      "Strong expertise in project management & engineering",
                      "Trusted by leading suppliers and vendors",
                      "ISO-Certified Company"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center border border-yellow-300">
                            <CheckCircle2 className="w-3 h-3 text-yellow-700" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <span className="text-base font-semibold text-gray-800">{item}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative Bottom Graphic */}
                <div className="absolute bottom-0 right-0 hidden lg:block opacity-20 pointer-events-none">
                  {/* Reuse an icon or simple graphic to mimic the reference's turbines if possible, or just a nice flare */}
                  <Sun className="w-64 h-64 text-yellow-400 -mb-20 -mr-20 animate-spin-slow" style={{ animationDuration: '60s' }} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section >

      {/* What We Can Do Section */ }
      < section className = "py-20 md:py-32 bg-white relative overflow-hidden text-center lg:text-left" >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-12 uppercase tracking-tight">
              What We Can Do?
            </h2>
            <p className="mb-12 text-gray-700 text-base md:text-lg leading-relaxed space-y-3 font-medium">
              With over 16 years of expertise, Enfros India is a trusted name in EPC and C&I solar services. We leverage advanced solar technologies to provide sustainable and affordable power solutions, ensuring continuous customer value through superior service and rapid response.
            </p>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  image: solar1,
                  title: "Utility-Scale Solar Power Plants",
                  description: "Designing and executing large-scale solar power plants for high efficiency and long-term energy generation.",
                  icon: Sun
                },
                {
                  image: solar2,
                  title: "Agriculture & Farming Solar Solutions",
                  description: "Providing solar solutions for irrigation, pumps, and farm operations to reduce energy costs and improve productivity.",
                  icon: Zap
                },
                {
                  image: solar3,
                  title: "Warehouse & Industrial Rooftop Solar",
                  description: "Installing rooftop solar systems for warehouses and industries to optimize power usage and operational savings.",
                  icon: Battery
                },
                {
                  image: solar4,
                  title: "Villas & Residential Solar Systems",
                  description: "Delivering reliable and eco-friendly solar power solutions for homes and residential communities.",
                  icon: Lightbulb
                },
                {
                  image: solar5,
                  title: "Manufacturing Unit Solar Installations",
                  description: "Implementing customized solar installations for manufacturing units to ensure uninterrupted and cost-effective energy.",
                  icon: Leaf
                },
                {
                  image: solar7,
                  title: "Landscape & Open-Area Solar Projects",
                  description: "Developing solar projects in open lands and large landscapes to maximize clean energy generation.",
                  icon: ShieldCheck
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="service-card group bg-gray-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 opacity-0"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    {/* Green Icon Badge */}
                    <div className="absolute -top-8 left-6 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="pt-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-md leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >





  {/* How Do We Work Section */ }
  < section className = "py-24 md:py-36 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 relative overflow-hidden" >
        <div className="container mx-auto sm:px-6 lg:px-12">
          <div className="max-w-[1600px] mb-20 mx-auto">
            {/* Header */}
            <div className="text-center mb-40 mx-auto">
              {/* <div className="flex items-center justify-center space-x-2 text-yellow-600 font-semibold uppercase tracking-widest text-sm mb-4">
                <Leaf className="w-5 h-5" />
                <span>Proposal And Contracting</span>
              </div> */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
                How Do We Work?
              </h2>
            </div>

            {/* Workflow Timeline */}
            <div className="workflow-container relative max-w-6xl mx-auto">
              {/* Desktop Timeline - Horizontal Yellow Line */}
              <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2"
                style={{ left: '120px', right: '120px', height: '8px' }}>
                <div className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full shadow-md"></div>
              </div>

              {/* Start and Finish Badges Container */}
              <div className="hidden lg:flex items-center justify-between relative">
                {/* Start Badge */}
                <div className="z-20">
                  <div className="w-40 h-40 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl hover:scale-105 transition-transform duration-300">
                    <p className="text-center">Understanding Your Needs</p>
                  </div>
                </div>

                {/* Workflow Steps Grid */}
                <div className="absolute left-0 right-0 flex justify-between items-center px-36">
                  {workflowSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`workflow-step flex flex-col items-center ${step.position === 'bottom' ? 'flex-col-reverse' : ''
                        }`}
                      style={{ width: '130px' }}
                    >
                      {/* Vertical Connector Line */}
                      <div className={`w-1.5 bg-gradient-to-b from-yellow-400 to-amber-500 ${step.position === 'bottom' ? 'h-10 mb-10' : 'h-10 mt-10'
                        } rounded-full`}></div>

                      {/* Gap spacer to prevent touching */}
                      <div className={step.position === 'bottom' ? 'h-4' : 'h-4'}></div>

                      {/* Number Badge on Line */}
                      <div className={`${step.position === 'bottom' ? 'mb-1' : 'mb-5'
                        }`}>
                        <div className="w-12 h-12 mt-10 mb-5 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white hover:scale-110 transition-transform duration-300">
                          {step.number}
                        </div>
                      </div>

                      {/* Icon Circle */}
                      <div className="mb-4 mt-5">
                        <div className="w-24 h-24 bg-white border-4 border-yellow-500 rounded-full flex items-center justify-center text-4xl shadow-xl hover:scale-110 hover:border-amber-600 transition-all duration-300">
                          {step.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-gray-900 leading-tight px-2">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Finish Badge */}
                <div className="z-20">
                  <div className="w-40 h-40 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl hover:scale-105 transition-transform duration-300">
                    <p className="text-center">Successful Execution</p>
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet View */}
              <div className="lg:hidden grid grid-cols-2 md:grid-cols-4 gap-8">
                {workflowSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                        {step.number}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="w-20 h-20 bg-white border-4 border-yellow-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                        {step.icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xs font-bold text-gray-900 leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Solar Panel Image */}
              <div className="hidden xl:block absolute -right-32 top-1/2 transform -translate-y-1/2 w-80 h-80 opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Wind Turbine */}
                  <rect x="95" y="80" width="10" height="100" fill="#f59e0b" opacity="0.3" />

                  {/* Solar Panel */}
                  <g transform="translate(130, 120)">
                    <rect x="0" y="0" width="60" height="40" fill="#eab308" opacity="0.4" rx="2" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="#d97706" strokeWidth="1" opacity="0.3" />
                    <line x1="40" y1="0" x2="40" y2="40" stroke="#d97706" strokeWidth="1" opacity="0.3" />
                    <line x1="0" y1="13" x2="60" y2="13" stroke="#d97706" strokeWidth="1" opacity="0.3" />
                    <line x1="0" y1="27" x2="60" y2="27" stroke="#d97706" strokeWidth="1" opacity="0.3" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .workflow-step {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .workflow-step:nth-child(1) { animation-delay: 0.1s; }
        .workflow-step:nth-child(2) { animation-delay: 0.2s; }
        .workflow-step:nth-child(3) { animation-delay: 0.3s; }
        .workflow-step:nth-child(4) { animation-delay: 0.4s; }
        .workflow-step:nth-child(5) { animation-delay: 0.5s; }
        .workflow-step:nth-child(6) { animation-delay: 0.6s; }
        .workflow-step:nth-child(7) { animation-delay: 0.7s; }
      `}</style>
      </section >

  {/* Trusted Clients Section */ }
  < section className = "py-24 md:py-36 bg-white relative overflow-hidden border-t border-gray-100" >
    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Leading Clients</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto rounded-full mb-10"></div>
          <p className="text-gray-600 font-medium text-lg md:text-xl max-w-3xl mx-auto">
            Our clients, like our people, are our most treasured assets. We nurture every client relationship with commitment, passion, and integrity,
            which is the reason why most of our clients have been with us throughout our journey.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center justify-items-center">
          {[
            { name: "Reliance", logo: client7 },
            { name: "Adani", logo: client6 },
            { name: "NTPC", logo: client5 },
            { name: "BHEL", logo: client2 },
            { name: "L&T", logo: client4 },
            { name: "ABB", logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/ABB_logo.svg" },
            { name: "Waaree", logo: client14 },
            { name: "Tata Power", logo: client13 },
            { name: "Sterling & Wilson", logo: client10 },
            { name: "Welspun", logo: client1 },
            { name: "GMR", logo: client3 },
            { name: "Cleantech Solar", logo: client8 },
            { name: "Hild Energy", logo: client9 },
            { name: "Svaryu Energy", logo: client12 },
            { name: "Mahindra Susten", logo: client15 },
            { name: "Refex", logo: client11 },
            { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg" },
            { name: "Amaraja", logo: client16 }
          ].map((client, index) => (
            <div
              key={index}
              className="group relative w-full h-48 md:h-36 shadow-lg flex items-center justify-center  bg-white rounded-2xl border border-gray-100 "
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="w-64 max-h-24 object-contain  group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const span = document.createElement('span');
                  span.className = 'text-gray-400 font-bold text-center text-lg';
                  span.innerText = client.name;
                  e.target.parentNode.appendChild(span);
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center space-x-4 bg-yellow-50 px-10 py-5 rounded-full border border-yellow-100 shadow-sm">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-800 font-bold text-xl italic uppercase tracking-wider">Empowering Industry Leaders with Sustainable Excellence</span>
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      </div>
    </div>
      </section >

    </>
  );
};

export default Home;  