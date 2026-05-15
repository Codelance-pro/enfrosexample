import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Target,
  Award,
  Shield,
  Heart,
  Star,
  Briefcase,
  Globe,
  Lightbulb,
  TrendingUp,
  MapPin,
  CheckCircle,
  ChevronRight,
  Zap,
  Leaf,
  Settings,
  BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Intersection Observer Hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
};

const About: React.FC = () => {
  const aboutAnim = useScrollAnimation();
  const whyAnim = useScrollAnimation();
  const visionAnim = useScrollAnimation();
  const valuesAnim = useScrollAnimation();
  const journeyAnim = useScrollAnimation();
  const teamAnim = useScrollAnimation();
  const clientsAnim = useScrollAnimation();

  const teamMembers = [
    { id: 1, name: "KARTHICK RAMAIAH", role: "Managing Director", description: "Expertly leading Enfros with proven project expertise", imageUrl: "" },
    { id: 2, name: "IGNASI", role: "Director - Operation", description: "AI & Machine Learning expert", imageUrl: "" },
    { id: 3, name: "JEGANIDHI KRISHNAN", role: "Director - Technical", description: "Operations management specialist", imageUrl: "" },
    { id: 4, name: "S.SHANTHI", role: "Director - Commercial", description: "Product development leader", imageUrl: "" },
  ];

  const coreValues = [
    { id: 1, title: "Safety", icon: <Shield className="w-10 h-10" />, description: "We believe that the success of any renewable energy project begins with a safe working environment. We adhere to strict safety standards to protect our employees, clients, and communities." },
    { id: 2, title: "Quality", icon: <Award className="w-10 h-10" />, description: "We are committed to providing top-tier renewable energy solutions by adhering to the highest industry standards. Quality assurance is embedded in every phase of our projects." },
    { id: 3, title: "Collaboration", icon: <Users className="w-10 h-10" />, description: "We believe that the best results come from working together—with our clients, employees, industry partners, and communities through open communication and teamwork." },
    { id: 4, title: "Sustainability", icon: <Leaf className="w-10 h-10" />, description: "We are dedicated to creating energy solutions that preserve the environment for future generations, focusing on reducing carbon emissions and promoting renewable energy adoption." },
    { id: 5, title: "Innovation", icon: <Lightbulb className="w-10 h-10" />, description: "We stay ahead by embracing innovation. From adopting the latest renewable technologies to streamlining project delivery, we provide cutting-edge solutions that shape the future." },
    { id: 6, title: "Efficiency", icon: <Zap className="w-10 h-10" />, description: "Our processes are designed to deliver projects on time, within budget, and with maximum operational performance, ensuring sustainable growth for our clients and partners." },
  ];

  const clients = [
    "Adani Green", "Tata Power", "Greenko", "ReNew Power", "Azure Power", "Hero Future", "Torrent Power", "Sembcorp", "ACME Solar", "Vikram Solar", "Waaree", "Sterling & Wilson"
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap');

        * { font-family: 'Open Sans', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Raleway', sans-serif; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .anim-up { animation: fadeInUp 0.7s ease-out forwards; }
        .anim-left { animation: fadeInLeft 0.7s ease-out forwards; }
        .anim-right { animation: fadeInRight 0.7s ease-out forwards; }

        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.3s; }
        .d4 { animation-delay: 0.4s; }
        .d5 { animation-delay: 0.5s; }
        .d6 { animation-delay: 0.6s; }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

          .hero-banner {
          position: relative;
          overflow: hidden;
          background: #f0fdf4;
        }
        .hero-banner .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1600&h=700&fit=crop');
          background-size: cover;
          background-position: center right;
          z-index: 0;
        }
        .hero-banner .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(240, 253, 244, 1) 0%,
            rgba(240, 253, 244, 0.97) 30%,
            rgba(240, 253, 244, 0.80) 50%,
            rgba(240, 253, 244, 0.2) 70%,
            rgba(240, 253, 244, 0) 100%
          );
          z-index: 1;
        }

        .section-label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d97706;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .section-label::before {
          content: '◈';
          font-size: 1rem;
        }

        .value-card {
          border: 1px solid #fde68a;
          border-top: 3px solid #d97706;
          transition: all 0.3s ease;
        }
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(217, 119, 6, 0.15);
          border-color: #d97706;
        }

        .team-card {
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .team-card:hover { transform: translateY(-6px); }
        .team-card:hover .team-img { transform: scale(1.06); }
        .team-img { transition: transform 0.5s ease; }

        .why-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #fef3c7;
        }
        .why-item:last-child { border-bottom: none; }

        .image-mosaic {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 10px;
        }
        @media (max-width: 640px) {
          .image-mosaic {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          .image-mosaic .img-tall {
            grid-row: auto;
          }
        }
        .image-mosaic .img-tall {
          grid-row: 1 / 3;
        }

        // .journey-banner {
        //   background: linear-gradient(135deg, #1c1917 0%, #44260a 100%);
        //   position: relative;
        //   overflow: hidden;
        // }
        .journey-banner::after {
          content: '';
          position: absolute;
          right: -60px;
          top: -60px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217,119,6,0.2) 0%, transparent 70%);
        }
      `}</style>

      {/* ─── Hero Banner ─── */}
      <div className="hero-banner pt-20" style={{ minHeight: 'auto', display: 'flex', alignItems: 'center' }}>
        <div className="hero-bg" />
        <div className="hero-overlay" />

        {/* Content — left side, above overlays */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-28">
          <div className="anim-up max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-tight">
              About Us
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-0" style={{ textAlign: 'justify' }}>
              Committed to sustainable power, ENFROS excels in solar EPC solutions with over 16 years of combined experience and 2000+ MW of successfully completed projects. Our integrated approach includes setup, execution, and Operation and Maintenance for longer savings of our partners.
            </p>
          </div>
        </div>

        {/* Breadcrumb — bottom right, like the reference */}
        <nav
          className="absolute bottom-4 right-4 md:bottom-6 md:right-8 z-10 flex items-center gap-2 text-xs md:text-sm bg-white/80 backdrop-blur-sm px-3 py-2 md:px-5 md:py-2.5 rounded-lg shadow-sm"
        >
          <span className="text-gray-600 hover:text-amber-600 cursor-pointer transition-colors font-medium">Home</span>
          <span className="text-amber-500 font-bold text-base">»</span>
          <span className="text-gray-900 font-semibold">About</span>
        </nav>
      </div>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={aboutAnim.ref}
            className={`grid lg:grid-cols-2 gap-10 md:gap-20 items-center ${aboutAnim.isVisible ? '' : 'opacity-0'}`}
          >
            {/* Left: image */}


            <div className={`rounded-2xl overflow-hidden shadow-xl ${aboutAnim.isVisible ? 'anim-up' : 'opacity-0'} order-2 lg:order-1`}>
              <img src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&h=600&fit=crop" alt="Solar farm" className="w-full h-48 md:h-auto object-cover" />
            </div>

            {/* Right: content */}
            <div className={`${aboutAnim.isVisible ? 'anim-up d2' : 'opacity-0'} order-1 lg:order-2`}>
              <div className="section-label">About Us</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 ">
                Empowering the Future with <span className="text-amber-600">Solar Energy Solutions.</span>
              </h2>
              <p className="text-black leading-7 md:leading-8 text-base md:text-lg mb-5" style={{ textAlign: 'justify' }}>
                ENFROS is a renewable energy service provider specializing in solar power solutions. With over 16  years of combined experience in solar and renewable energy, our directors lead the way. We  have successfully completed construction projects totaling   over   2000   MW,   including   Installation
                & Commissioning (I&C) and Balance of System (BOS).
                Our goal is to become the LEADING EPC SERVICE PROVIDER in the solar
                power plant industry.
              </p>
              {/* <p className="text-gray-600 leading-relaxed mb-8">
                Our goal is to become the <strong className="text-amber-700">LEADING EPC SERVICE PROVIDER</strong> in the solar power plant industry, delivering high-quality and innovative renewable energy solutions to our clients.
              </p> */}
              {/* <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '16+', label: 'Years Experience' },
                  { value: '2000+', label: 'MW Completed' },
                  { value: 'EPC', label: 'Turnkey Solutions' },
                  { value: 'India', label: 'Headquarters' }
                ].map((stat, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <div className="text-2xl font-bold text-amber-700 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div> */}
              {/* <div className="flex items-center mt-6 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>Headquartered in Tamil Nadu, India</span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={whyAnim.ref}
            className={`grid lg:grid-cols-2 gap-12 md:gap-16 items-center ${whyAnim.isVisible ? '' : 'opacity-0'}`}
          >
            {/* Left: content */}
            <div className={whyAnim.isVisible ? 'anim-up' : 'opacity-0'}>
              <div className="section-label">#1 Solar Energy Solution</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Why Choose <span className="text-amber-600">ENFROS?</span>
              </h2>
              {/* <div className="space-y-1">
                {[
                  { icon: <TrendingUp className="w-5 h-5 text-amber-600" />, text: "Proven track record in large-scale solar projects" },
                  { icon: <Users className="w-5 h-5 text-amber-600" />, text: "Skilled technical and project management team" },
                  { icon: <Globe className="w-5 h-5 text-amber-600" />, text: "Strong vendor and partner network across India" },
                  { icon: <Star className="w-5 h-5 text-amber-600" />, text: "Focus on timely delivery and customer satisfaction" },
                  { icon: <Shield className="w-5 h-5 text-amber-600" />, text: "16+ years of combined renewable energy expertise" },
                  { icon: <Award className="w-5 h-5 text-amber-600" />, text: "ISO-certified practices and government-approved contractor" },
                ].map((item, i) => (
                  <div key={i} className="why-item">
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div> */}
              <p className="text-black leading-8 text-lg mb-8" style={{ textAlign: 'justify' }}>
                With over 16 years of experience, Enfros is a leading EPC and C&I solar services provider. We leverage solar energy to offer consumers reliable and affordable power, delivering high-quality and innovative renewable  energy  solutions.  Our  commitment  is  to  ensure continuous customer value through outstanding service and rapid response times.
              </p>
            </div>

            {/* Right: image */}
            <div className={`image-mosaic ${whyAnim.isVisible ? 'anim-up d2' : 'opacity-0'}`}>
              <div className="img-tall rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=700&fit=crop" alt="Solar panels" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=280&fit=crop" alt="Office" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=280&fit=crop" alt="Energy" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={visionAnim.ref} className={`grid md:grid-cols-2 gap-8 md:gap-10 ${visionAnim.isVisible ? '' : 'opacity-0'}`}>
            {/* Vision */}
            <div className={`border border-amber-200 rounded-2xl p-10 ${visionAnim.isVisible ? 'anim-up' : 'opacity-0'}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                For over 16 years, we have had one goal in mind: customer service. Our vision is not just to complete projects but also to  build  relationships  with  our  customers  and  clients through  commitment,  reliability,  and  excellence  in  every facet of the company

              </p>
            </div>

            {/* Mission */}
            <div className={`border border-amber-200 rounded-2xl p-10 ${visionAnim.isVisible ? 'anim-up d2' : 'opacity-0'}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <div className="space-y-3 text-gray-600">
                {[
                  "Leverage solar energy to provide consumers with reliable and affordable power.",
                  "Deliver high-quality and innovative renewable energy solutions.",
                  "Ensure continuous customer value through outstanding service and rapid response times.",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold mt-0.5">◈</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <section className="py-12 md:py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={valuesAnim.ref} className={valuesAnim.isVisible ? '' : 'opacity-0'}>
            <div className={`text-center mb-10 md:mb-14 ${valuesAnim.isVisible ? 'anim-up' : ''}`}>
              <div className="section-label justify-center">Our Principles</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Core Values</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((val, i) => (
                <div
                  key={val.id}
                  className={`value-card bg-white rounded-2xl p-8 ${valuesAnim.isVisible ? `anim-up d${i + 1}` : 'opacity-0'}`}
                >
                  <div className="text-amber-500 mb-5">{val.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
                  <button className="mt-5 text-amber-600 text-sm font-semibold hover:text-amber-800 transition-colors flex items-center gap-1">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 ">
        <div className="max-w-7xl mx-auto px-6 ">
          <div
            ref={journeyAnim.ref}
            className=" rounded-3xl p-8 md:p-16 inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 animate-pulse-gold"
          >
            <div className={`max-w-3xl z-10 ${journeyAnim.isVisible ? 'anim-up' : 'opacity-0'}`}>
              <div className="section-label" style={{ color: 'black' }}>Forward Together</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Our Journey Ahead</h2>
              <p className="text-white text-lg leading-relaxed mb-8">
                As the world embraces the transition to <strong className="text-white">clean energy</strong>, ENFROS is committed to being at the forefront—delivering <strong className="text-white">solar EPC projects that power economies, sustain the environment, and secure the future</strong>.
              </p>
              <p className="text-white leading-relaxed mb-10">
                <strong className="text-white">Partner with us</strong> on the journey towards a <strong className="text-white">cleaner, greener, and more sustainable future.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30">
                    Get Started
                  </button>
                </Link>
                {/* <button className=" bg-amber-500  text-black hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold transition-all duration-300">
                  Schedule Demo
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Meet Our Team ─── */}
      <section className="py-12 md:py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={teamAnim.ref} className={teamAnim.isVisible ? '' : 'opacity-0'}>
            <div className={`text-center mb-10 md:mb-14 ${teamAnim.isVisible ? 'anim-up' : ''}`}>
              <div className="section-label justify-center">Team of Innovators</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Expert Team Members</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, i) => (
                <div
                  key={member.id}
                  className={`team-card bg-white border border-amber-100 rounded-2xl shadow-md hover:shadow-xl ${teamAnim.isVisible ? `anim-up d${i + 1}` : 'opacity-0'}`}
                >
                  <div className="h-64 overflow-hidden rounded-t-2xl bg-amber-50">
                    <img src={member.imageUrl} alt={member.name} className="team-img w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-amber-600 font-semibold text-sm mt-1">{member.role}</p>
                    {/* <p className="text-gray-500 text-xs mt-2">{member.description}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trusted Clients (Marquee) ─── */}
      {/* <section className="py-16 bg-amber-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10" ref={clientsAnim.ref}>
          <div className={`text-center ${clientsAnim.isVisible ? 'anim-up' : 'opacity-0'}`}>
            <div className="section-label justify-center">See Who Relies on Us</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Leading Clients</h2>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="mx-6 px-8 py-4 bg-white border border-amber-200 rounded-xl shadow-sm text-gray-700 font-semibold text-sm whitespace-nowrap hover:border-amber-400 hover:text-amber-700 transition-colors duration-300"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Trusted Clients Section */}
      <section className="py-16 md:py-24 md:py-36 bg-white relative overflow-hidden border-t border-gray-100" ref={clientsAnim.ref}>
        <div className={`container mx-auto px-4 sm:px-6 lg:px-12 ${clientsAnim.isVisible ? '' : 'opacity-0'}`}>
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
                { name: "Mahindra Susten", logo: client11 },
                { name: "Refex", logo: client15 },
                { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg" },
                { name: "Amaraja", logo: client16 }
              ].map((client, index) => (
                <div
                  key={index}
                  className={`group relative w-full h-48 md:h-36 shadow-lg flex items-center justify-center bg-white rounded-2xl border border-gray-100 ${clientsAnim.isVisible ? 'anim-up' : ''}`}
                  style={{ animationDelay: `${(index % 4) * 0.1}s` }}
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-64 max-h-24 object-contain  group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const span = document.createElement('span');
                      span.className = 'text-gray-400 font-bold text-center text-lg';
                      span.innerText = client.name;
                      target.parentElement?.appendChild(span);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Quote */}
            {/* <div className="mt-24 text-center">
              <div className="inline-flex items-center space-x-4 bg-yellow-50 px-10 py-5 rounded-full border border-yellow-100 shadow-sm">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-gray-800 font-bold text-xl italic uppercase tracking-wider">Empowering Industry Leaders with Sustainable Excellence</span>
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
            </div> */}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;