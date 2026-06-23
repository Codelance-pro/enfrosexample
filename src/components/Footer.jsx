import { Button } from "@/components/ui/button";
import {
  Sun,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Clock,
  Send,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {

      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    { name: "Residential Solar", href: "#services" },
    { name: "Commercial Solar", href: "#services" },
    { name: "Solar Maintenance", href: "#services" },
    { name: "Battery Storage", href: "#services" },
    { name: "Energy Audit", href: "#services" }
  ];

  const resources = [
    { name: "Solar Calculator", href: "#calculator" },
    { name: "FAQs", href: "#faq" },
    { name: "Blog", href: "#blog" },
    { name: "Case Studies", href: "#cases" },
    { name: "Financing Options", href: "#financing" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/enfrosindia/", name: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/enfros_india/", name: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/enfros-india/", name: "LinkedIn" },
    { icon: Send, href: "https://t.me/EnfrosSolarHub", name: "Telegram" },
    { icon: MessageCircle, href: "https://whatsapp.com/channel/0029Vb6XfzZ42DcjxnN5tI0F", name: "WhatsApp" },
    { icon: Youtube, href: "https://www.youtube.com/@EnfrosIndia", name: "YouTube" }
  ];

  const certifications = [
    { name: "NABCEP Certified", icon: "🏆" },
    { name: "BBB Accredited", icon: "⭐" },
    { name: "EPA Partner", icon: "🌿" },
    { name: "ISO 9001", icon: "✓" }
  ];

  return (
    <footer className="bg-[#fef9cc] text-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-yellow-500/20 relative z-10">
        <div className="container mx-auto px-3 ">
          {/* Newsletter content commented out */}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className=" mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-3 rounded-2xl shadow-lg">
                <Sun className="h-8 w-8 text-blue-950" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-yellow-800">Enfros India Solution Pvt. Ltd. </h2>
                {/* <p className="text-sm text-yellow-800">Pvt. Ltd.</p> */}
              </div>
            </div>
            <p className="text-black mb-6 leading-relaxed">
              ENFROS is a renewable energy service provider specializing in solar power solutions. Our goal is to become the LEADING EPC SERVICE PROVIDER in the solar power plant industry.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <div className="bg-blue-900/50 p-2 rounded-lg group-hover:bg-yellow-500 transition-colors">
                  <Phone className="h-5 w-5 text-yellow-800 group-hover:text-blue-950" />
                </div>
                <div>
                  <p className="text-sm text-black">Call Us</p>
                  <p className="font-semibold text-yellow-800">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="bg-blue-900/50 p-2 rounded-lg group-hover:bg-yellow-500 transition-colors">
                  <Mail className="h-5 w-5 text-yellow-800 group-hover:text-blue-950" />
                </div>
                <div>
                  <p className="text-sm text-black">Email Us</p>
                  <p className="font-semibold text-yellow-800">sales@enfrosindia.com </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="bg-blue-900/50 p-2 rounded-lg group-hover:bg-yellow-500 transition-colors">
                  <MapPin className="h-5 w-5 text-yellow-800 group-hover:text-blue-950" />
                </div>
                <div>
                  <p className="text-sm text-black">Registered Office</p>
                  <p className="font-semibold text-yellow-800">No. 14, Bharath Complex,Near Ram Theater, Pudukkottai – 622003</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="bg-blue-900/50 p-2 rounded-lg group-hover:bg-yellow-500 transition-colors">
                  <Clock className="h-5 w-5 text-yellow-800 group-hover:text-blue-950" />
                </div>
                <div>
                  <p className="text-sm text-black">Business Hours</p>
                  <p className="font-semibold text-yellow-800">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative text-yellow-800">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-black hover:text-yellow-800 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-yellow-800" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative text-yellow-800">
              Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Utility Scale EPC", href: "#services" },
                { name: "Utility Scale BOS, I & C", href: "#services" },
                { name: "MW Scale C & I", href: "#services" }
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-black hover:text-yellow-800 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-yellow-800" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative text-yellow-800">
              Resources
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-black hover:text-yellow-800 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-yellow-800" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-b border-yellow-500/20 py-6  flex items-center justify-center ">

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Social Media */}
            <div className="flex items-center space-x-3">
              <span className="text-black mr-2">Follow Us:</span>
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className="bg-blue-900/50 p-3 rounded-xl hover:bg-yellow-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <SocialIcon className="h-5 w-5 text-yellow-800 group-hover:text-blue-950" />
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center  bg-black px-3 py-3 rounded-xl hover:bg-yellow-500 hover:scale-105 transition-all group"
                >
                  <span className="text-2xl">{cert.icon}</span>
                  <span className="font-semibold text-sm text-yellow-400 group-hover:text-blue-950">{cert.name}</span>
                </div>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-black text-sm">
                © {new Date().getFullYear()} ENFROS India Solutions Pvt. Ltd. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2">
                <a href="#privacy" className="text-black hover:text-yellow-800 text-sm transition-colors">
                  Privacy Policy
                </a>
                <span className="text-black">•</span>
                <a href="#terms" className="text-black hover:text-yellow-800 text-sm transition-colors">
                  Terms of Service
                </a>
                <span className="text-black">•</span>
                <a href="#cookies" className="text-black hover:text-yellow-800 text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        {/* <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          Social Media
          <div className="flex items-center space-x-3">
            <span className="text-black mr-2">Follow Us:</span>
            {socialLinks.map((social, index) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="bg-blue-900/50 p-3 rounded-xl hover:bg-yellow-500 hover:scale-110 transition-all duration-300 group"
                >
                  <SocialIcon className="h-5 w-5 text-yellow-800 group-hover:text-blue-950" />
                </a>
              );
            })}
          </div>

          Copyright
          <div className="text-center md:text-right">
            <p className="text-black text-sm">
              © {new Date().getFullYear()} ENFROS India Solutions Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2">
              <a href="#privacy" className="text-black hover:text-yellow-800 text-sm transition-colors">
                Privacy Policy
              </a>
              <span className="text-black">•</span>
              <a href="#terms" className="text-black hover:text-yellow-800 text-sm transition-colors">
                Terms of Service
              </a>
              <span className="text-black">•</span>
              <a href="#cookies" className="text-black hover:text-yellow-800 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div> */}
      </div>

      {/* Decorative Bottom Element */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500"></div>
    </footer>
  );
};

export default Footer;
