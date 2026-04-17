import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Zap } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Solar Panels"
     
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
      </div>

      {/* Floating Gold Light */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-[#D4AF37]/25 rounded-full blur-2xl animate-float" />

      {/* Content Area */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-left">

          {/* Subtitle */}
  

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white">
            Power Your World with{" "}
            <span className="text-[#D4AF37]">
              Premium Solar Energy
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-up max-w-xl">
            Experience high-end solar engineering designed for maximum durability,
            peak performance, and long-lasting energy independence.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">

            <Button
              size="lg"
              onClick={() => scrollToSection("calculator")}
              className="bg-[#D4AF37] hover:bg-[#b8952f] text-black font-semibold shadow-xl group"
            >
              Calculate Savings
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("about")}
              className="border-2 border-[#F7E99E] text-[#F7E99E] hover:bg-[#F7E99E]/10"
            >
              <Sun className="mr-2 h-5 w-5" />
              Learn More
            </Button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 animate-fade-in-up text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">500+</div>
              <div className="text-sm text-gray-300">Premium Installations</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">98%</div>
              <div className="text-sm text-gray-300">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">25+</div>
              <div className="text-sm text-gray-300">Years Expertise</div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Sun */}
      <div className="absolute bottom-10 right-10 animate-float opacity-20">
        <Sun className="h-32 w-32 text-[#D4AF37]" />
      </div>

    </section>
  );
};

export default Hero;
