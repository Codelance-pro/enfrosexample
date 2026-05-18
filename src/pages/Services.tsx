import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Sun, Zap, Building2, Battery, ArrowRight, CheckCircle2, ShieldCheck, Lightbulb } from "lucide-react";
import solar1 from "@/assets/Utility-Scale Solar Power Plants.jpg";
import solar3 from "@/assets/Warehouse & Industrial Rooftop Solar.jpg";
import solar2 from "@/assets/Agriculture & Farming Solar Solutions.jpg";
import homepage1 from "@/assets/homepage1.jpg";

// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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

const Services = () => {
  const heroAnim = useScrollAnimation();
  const servicesAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const servicesList = [
    {
      id: 1,
      title: "Utility Scale EPC",
      description: "Complete turnkey solar EPC solutions for large-scale solar power projects, covering design, engineering, procurement, construction, installation, testing, and commissioning with high-quality standards and timely project execution.",
      icon: Sun,
      image: solar1,
      features: ["Turnkey Solutions", "High-Quality Standards", "Timely Execution", "Complete Commissioning"],
      color: "from-amber-500 to-yellow-600"
    },
    {
      id: 2,
      title: "Utility Scale BOS, I & C",
      description: "Comprehensive Balance of System (BOS) and Installation & Commissioning services for utility-scale solar plants, ensuring efficient system integration, reliable performance, safety compliance, and optimized energy generation.",
      icon: ShieldCheck,
      image: solar2,
      features: ["Efficient System Integration", "Reliable Performance", "Safety Compliance", "Optimized Generation"],
      color: "from-yellow-500 to-amber-500"
    },
    {
      id: 3,
      title: "MW Scale C&I Solar",
      description: "End-to-end rooftop and ground-mounted solar solutions for commercial and industrial sectors, helping businesses reduce energy costs, improve sustainability, and achieve long-term operational efficiency through reliable solar power systems.",
      icon: Building2,
      image: solar3,
      features: ["Rooftop & Ground-Mounted", "Energy Cost Reduction", "Sustainability Focus", "Long-Term Efficiency"],
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 min-h-screen">
      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-slide-down { animation: slideInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        
        .hero-banner { position: relative; overflow: hidden; }
        .hero-bg { 
          position: absolute; inset: 0; 
          background-image: url('${homepage1}'); 
          background-size: cover; 
          background-position: center; 
          z-index: 0; 
        }
        .hero-overlay { 
          position: absolute; inset: 0; z-index: 1; 
          background: linear-gradient(to right, rgba(255,251,235,0.95) 0%, rgba(255,251,235,0.85) 40%, rgba(255,251,235,0.4) 100%); 
        }
      `}</style>

      {/* Hero Banner Section */}
      <div className="hero-banner min-h-[40vh] md:min-h-[50vh] flex items-center pt-20">
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div ref={heroAnim.ref} className="max-w-2xl">
            <div className={`flex items-center space-x-2 text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 ${heroAnim.isVisible ? 'animate-slide-down' : 'opacity-0'}`}>
              <Lightbulb className="w-5 h-5" />
              <span>What We Do</span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight ${heroAnim.isVisible ? 'animate-slide-down stagger-1' : 'opacity-0'}`}>
              Our <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className={`text-gray-700 text-lg md:text-xl leading-relaxed font-medium ${heroAnim.isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
              End-to-end solar power solutions designed for maximum efficiency, sustainability, and long-term value. We handle everything from large-scale EPC to commercial rooftop installations.
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 flex items-center gap-2 text-xs md:text-sm bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-yellow-100">
          <Link to="/" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Home</Link>
          <span className="text-amber-500 font-bold">»</span>
          <span className="text-gray-900 font-bold">Services</span>
        </nav>
      </div>

      {/* Services Section */}
      <section ref={servicesAnim.ref} className="py-20 md:py-32 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid gap-16 lg:gap-24">
            {servicesList.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={service.id} 
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center ${servicesAnim.isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 blur-lg"></div>
                    <div className="relative h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                      
                      {/* Floating Icon Badge */}
                      <div className={`absolute bottom-6 ${isEven ? 'left-6' : 'right-6'} w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-xl transform group-hover:-translate-y-2 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-yellow-100/80 backdrop-blur-sm border border-yellow-200 px-4 py-1.5 rounded-full text-yellow-800 font-bold text-sm tracking-wide shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                      <span>Service 0{index + 1}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                      {service.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                      {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start space-x-3 bg-white/60 p-3 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300">
                          <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 font-semibold text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Link to="/contact">
                        <Button className="bg-gray-900 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-full px-8 py-6 font-bold tracking-wide shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 group">
                          Enquire Now
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaAnim.ref} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className={`max-w-3xl mx-auto ${ctaAnim.isVisible ? 'animate-pop-in' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-md leading-tight">
              Ready to Start Your Solar Journey?
            </h2>
            <p className="text-white/90 text-xl mb-10 font-medium">
              Contact us today for a consultation and let us power your future with clean, reliable, and cost-effective solar energy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-50 px-10 py-6 text-lg font-bold shadow-2xl hover:scale-105 transition-all duration-300 rounded-full">
                  Get a Free Quote
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 hover:text-white px-10 py-6 text-lg font-bold shadow-2xl hover:scale-105 transition-all duration-300 rounded-full bg-transparent">
                  View Our Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
