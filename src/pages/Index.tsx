import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import SolarCalculator from "@/components/SolarCalculator";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <Hero />
      {/* <About />
      <Services />
      <SolarCalculator />
      <Portfolio />
      <Contact />
      <Footer /> */}
    </div>
  );
};

export default Index;
