import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Rocket,
  HeartHandshake,
  Star,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  TrendingUp,
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  Target,
  Zap,
  Handshake,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const Careers = () => {
  // Animation Refs
  const heroAnim = useScrollAnimation();
  const cultureAnim = useScrollAnimation();
  const jobsAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  const jobs = [
    {
      title: "Civil Engineer",
      slug: "civil-engineer",
      location: "Pan India",
      type: "Full-Time",
      icon: <Building2 className="w-16 h-16 text-blue-500" />,
      desc: "Responsible for planning, designing, and commissioning solar EPC civil works."
    },
    {
      title: "Civil Site Supervisor",
      slug: "civil-site-supervisor",
      location: "Pan India",
      type: "Full-Time",
      icon: <HardHat className="w-16 h-16 text-orange-500" />,
      desc: "Manage site execution, vendor coordination, and installation quality."
    },
    {
      title: "Safety Supervisor",
      slug: "safety-supervisor",
      location: "",
      type: "Full-Time",
      icon: <ShieldCheck className="w-16 h-16 text-red-500" />,
      desc: "Enforce HSE policies, identify hazards, and ensure a zero-incident site."
    },
    {
      title: "Quality Engineer",
      slug: "quality-engineer",
      location: "Pan India",
      type: "Full-Time",
      icon: <ClipboardCheck className="w-16 h-16 text-green-500" />,
      desc: "Conduct QA/QC inspections and ensure compliance with IEC/IS standards."
    },
    {
      title: "Project Manager",
      slug: "project-manager",
      location: "Pan India",
      type: "Full-Time",
      icon: <Target className="w-16 h-16 text-purple-500" />,
      desc: "Responsible for planning, execution, and commissioning of solar EPC projects."
    },
    {
      title: "Electrical engineer",
      slug: "electrical-engineer",
      location: "Maharashtra",
      type: "Full-Time",
      icon: <Zap className="w-16 h-16 text-yellow-500" />,
      desc: "We are looking to onboard an experienced– Electrical engineer Solar Ground Mounted (Civil) to take end-to-end ownership of project execution. The ideal candidate should have strong contractor-side execution experience and exposure to EPC/client coordination."
    },
    {
      title: "Business Development Manager",
      slug: "business-development-manager",
      location: "",
      type: "Full-Time",
      icon: <Handshake className="w-16 h-16 text-cyan-500" />,
      desc: "We are looking to onboard an experienced Business Development Manager – Solar Ground Mounted (Civil) to take end-to-end ownership of project execution. "
    },
  ];

  const perks = [
    { icon: <Star className="h-6 w-6 text-yellow-600" />, text: "Work with Industry Experts" },
    { icon: <HeartHandshake className="h-6 w-6 text-yellow-600" />, text: "Employee Wellness Programs" },
    { icon: <Rocket className="h-6 w-6 text-yellow-600" />, text: "Fast Career Growth" },
    { icon: <Users className="h-6 w-6 text-yellow-600" />, text: "Collaborative Work Culture" },
  ];

  return (
    <div className=" bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 min-h-screen">
      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateIn {
          from { opacity: 0; transform: rotate(-180deg) scale(0); }
          to { opacity: 1; transform: rotate(0deg) scale(1); }
        }
        @keyframes blurIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          50% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          75% { transform: translateY(10px) rotate(-5deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-slide-down { animation: slideInDown 0.8s ease-out forwards; }
        .animate-rotate-in { animation: rotateIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-blur-in { animation: blurIn 1s ease-out forwards; }
        .animate-expand-width { animation: expandWidth 0.8s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-wave { animation: wave 3s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

          .hero-banner { position: relative; overflow: hidden; }
                .hero-bg { position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1600&h=700&fit=crop'); background-size: cover; background-position: center right; z-index: 0; }
                .hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to right, rgba(255,251,235,1) 0%, rgba(255,251,235,0.97) 30%, rgba(255,251,235,0.80) 55%, rgba(255,251,235,0.1) 100%); }
      `}</style>



      <div className="hero-banner" style={{ paddingTop: 80, display: 'flex', alignItems: 'center' }}>
        <div className="hero-bg" />
        <div className="hero-overlay" />

        {/* Content — left side, above overlays */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-28">
          <div className="anim-up max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-tight">
              Careers
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-0" style={{ textAlign: 'justify' }}>
              Careers at Enfros India Solutions Pvt. Ltd.<br></br>
              Renewable Energy & Solar EPC Job Opportunities in India
              Looking for solar jobs in India?

            </p>
          </div>
        </div>

        {/* Breadcrumb — bottom right, like the reference */}
        <nav
          className="absolute bottom-4 right-4 md:bottom-6 md:right-8 z-10 flex items-center gap-2 text-xs md:text-sm bg-white/80 backdrop-blur-sm px-3 py-2 md:px-5 md:py-2.5 rounded-lg shadow-sm"
        >
          <span className="text-gray-600 hover:text-amber-600 cursor-pointer transition-colors font-medium">Home</span>
          <span className="text-amber-500 font-bold text-base">»</span>
          <span className="text-gray-900 font-semibold">Careers</span>
        </nav>
      </div>

      {/* ================= HERO SECTION ================= */}
      {/* <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute top-10 left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-wave"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-wave" style={{ animationDelay: '1s' }}></div>

        <div ref={heroAnim.ref} className="container mx-auto px-4 relative z-10">
          <div className={`${heroAnim.isVisible ? 'animate-slide-down' : 'opacity-0'}`}>
            <h1 className="text-2xl text-black md:text-4xl font-bold mb-4 drop-shadow-lg">
              Join Our Solar Revolution
            </h1>
          </div>
          <div className={`${heroAnim.isVisible ? 'animate-blur-in' : 'opacity-0'} stagger-1`}>
            <p className="text-black  text-lg md:text-xl mb-8">
              Join Enfros India Solutions Pvt. Ltd., a leading Solar EPC and Renewable
              Energy company, and build your career in one of the fastest-growing industries
              in the world.
            </p>
          </div>

          <div className={`${heroAnim.isVisible ? 'animate-pop-in' : 'opacity-0'} stagger-2`}>
            <Button
              className="bg-white text-amber-600 font-semibold hover:bg-yellow-50 transition px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              Explore Openings
            </Button>
          </div>
        </div>
      </section> */}

      {/* ================= STATS SECTION ================= */}
      {/* <section className="py-16 -mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Team Members', value: '500+', icon: <Users className="w-6 h-6" /> },
              { label: 'Open Positions', value: '12', icon: <Briefcase className="w-6 h-6" /> },
              { label: 'Countries', value: '8', icon: <MapPin className="w-6 h-6" /> },
              { label: 'Growth Rate', value: '45%', icon: <TrendingUp className="w-6 h-6" /> }
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-2xl border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center ${heroAnim.isVisible ? `animate-rotate-in stagger-${index % 4 + 1}` : 'opacity-0'}`}
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 text-yellow-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= CULTURE SECTION ================= */}
      {/* <section ref={cultureAnim.ref} className="py-20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${cultureAnim.isVisible ? 'animate-slide-down' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Work <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Culture</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto mb-6 rounded-full"></div>
          </div>

          <div className={`${cultureAnim.isVisible ? 'animate-blur-in' : 'opacity-0'} stagger-1`}>
            <p className="text-gray-600 max-w-3xl text-lg mb-12 text-center mx-auto">
              At Enfros, our people are our strength. We foster innovation, encourage teamwork,
              and ensure every member grows with the company.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <div
                key={i}
                className={`group bg-white border-2 border-yellow-200 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${cultureAnim.isVisible ? `animate-pop-in stagger-${i % 4 + 1}` : 'opacity-0'}`}
              >
                <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {perk.icon}
                </div>
                <p className="text-gray-700 font-medium">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= JOB LISTINGS (New Design) ================= */}
      <section ref={jobsAnim.ref} className="py-12 md:py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">

          {/* Header Card "Join Our Team" */}
          <div className={`bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12 max-w-6xl mx-auto border border-gray-100 ${jobsAnim.isVisible ? 'animate-slide-down' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join Our Team</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Enfros India Solutions Pvt. Ltd., we're creating a workplace where passionate individuals can thrive while driving a greener future.
              If you're looking for a career that makes a real impact, you're in the right place. Come be a part of our journey toward sustainable energy solutions!
            </p>
          </div>

          {/* Job Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {jobs.map((job, i) => (
              <div
                key={i}
                className={`group bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 ${jobsAnim.isVisible ? `animate-pop-in stagger-${(i % 4) + 1}` : 'opacity-0'}`}
              >
                {/* Icon Area */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {job.icon}
                </div>

                {/* Job Title */}
                {/* Job Title */}
                <h3 className="text-xl font-bold text-amber-500 mb-2">
                  {job.title} – Solar Industry
                </h3>

                {/* Location/Type (kept from original content but styled minimally) */}
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
                  <span>{job.location}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{job.type}</span>
                </div>
                {/* <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {job.desc}
                </p> */}

                <div className="mt-auto pt-4">
                  <Link to={`/career/${job.slug}`}>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded shadow-md transition-all duration-300 uppercase text-sm tracking-wide"
                    >
                      Apply Now
                    </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      {/* <section ref={ctaAnim.ref} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-wave"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-wave" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className={`${ctaAnim.isVisible ? 'animate-slide-down' : 'opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-xl">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Can't Find Your Role?
            </h2>
          </div>

          <div className={`${ctaAnim.isVisible ? 'animate-blur-in' : 'opacity-0'} stagger-1`}>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Send us your resume. We'll reach out when a matching position opens.
            </p>
          </div>

          <div className={`${ctaAnim.isVisible ? 'animate-pop-in' : 'opacity-0'} stagger-2`}>
            <Button className="bg-white text-amber-600 hover:bg-yellow-50 px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
              <Mail className="mr-2 h-5 w-5" />
              Submit Resume
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Careers;
