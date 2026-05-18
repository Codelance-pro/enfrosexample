import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Building,
  Globe,
  MessageSquare,
  User,
  Loader2,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
  Youtube
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  location: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

// Custom Hook for Scroll Animations
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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    location: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Animation Refs
  const headerAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const formAnim = useScrollAnimation();
  const infoAnim = useScrollAnimation();
  const deptAnim = useScrollAnimation();
  const mapAnim = useScrollAnimation();
  const socialAnim = useScrollAnimation();
  const faqAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  // Office locations data
  const offices = [
    {
      id: 2,
      city: 'Pudukkottai',
      country: 'India',
      address: 'No. 14, Bharath Complex,Near Ram Theater, Pudukkottai – 622003',
      phone: '+91 98765 43210',
      email: 'info@enfrosindia.com',
      workingHours: 'Mon-Sat: 9AM-6PM GMT',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
  ];

  // Department contacts
  const departments = [
    {
      id: 1,
      name: 'Sales',
      email: 'sales@enfros.com',
      phone: '+1 (555) 123-4568',
      description: 'Get quotes and product information'
    },
    {
      id: 2,
      name: 'Support',
      email: 'support@enfros.com',
      phone: '+1 (555) 123-4569',
      description: 'Technical support and assistance'
    },
    {
      id: 3,
      name: 'Projects',
      email: 'projects@enfros.com',
      phone: '+1 (555) 123-4570',
      description: 'Project inquiries and management'
    },
    {
      id: 4,
      name: 'Careers',
      email: 'careers@enfros.com',
      phone: '+1 (555) 123-4571',
      description: 'Job opportunities and recruitment'
    }
  ];

  // Quick contact options
  const quickContacts = [
    {
      id: 1,
      title: 'General Inquiries',
      contact: 'sales@enfros.com',
      icon: <Mail className="w-6 h-6" />,
      responseTime: 'Within 24 hours'
    },
    {
      id: 2,
      title: 'Emergency Support',
      contact: '+91 9342794586',
      icon: <Phone className="w-6 h-6" />,
      responseTime: '24/7 available'
    },
    {
      id: 3,
      title: 'Technical Support',
      contact: 'info@enfrosindia.com',
      icon: <MessageSquare className="w-6 h-6" />,
      responseTime: 'Within 4 hours'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "06ecfe40-dcb0-4c29-af8f-8ed7f5f638a6", // Placeholder - replace with your real key
          subject: `Contact Form Submission: ${formData.subject}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          message: formData.message,
          to: "codelanceofficial@gmail.com"
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          location: ''
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Mail Error:", err);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes flipInX {
          from { opacity: 0; transform: perspective(400px) rotateX(90deg); }
          to { opacity: 1; transform: perspective(400px) rotateX(0deg); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes pulse-gold {
          0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(234, 179, 8, 0); }
          100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
        }
        .animate-slide-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-right { animation: slideInRight 0.8s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-flip-in { animation: flipInX 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-bounce-in { animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-pulse-gold { animation: pulse-gold 2s infinite; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div ref={headerAnim.ref} className={`text-center mb-16 ${headerAnim.isVisible ? 'animate-zoom-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full mb-6 shadow-xl animate-pulse-gold">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get In <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have questions about solar solutions? We're here to help you make the right energy choices.
          </p>
        </div>

        {/* Stats Banner */}
        {/* <div ref={statsAnim.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Support Available', value: '24/7' },
            { label: 'Avg. Response Time', value: '2h' },
            { label: 'Client Satisfaction', value: '98%' },
            { label: 'Countries Served', value: '50+' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl border border-yellow-200 text-center shadow-lg hover:shadow-xl transition-all duration-300 ${statsAnim.isVisible ? `animate-flip-in stagger-${index % 4 + 1}` : 'opacity-0'}`}
            >
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div> */}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 overflow-hidden">
          {/* Left Column: Contact Form */}
          <div ref={formAnim.ref} className={`${formAnim.isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl border border-yellow-200 p-6 md:p-8 shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                  <p className="text-gray-500">We'll get back to you within 24 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 animate-bounce-in">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for contacting us. Our team will get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-700 hover:bg-yellow-50 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'
                            } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300`}
                          placeholder="John Smith"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'
                            } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'
                            } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${errors.subject ? 'border-red-500' : 'border-gray-200'
                        } rounded-xl text-gray-900 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300`}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Sales Quote">Sales Quote</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Project Consultation">Project Consultation</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Careers">Careers</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'
                        } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 resize-none`}
                      placeholder="Tell us about your solar project or inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      * Required fields
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-200/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center ">
                          Send Message
                          <Send className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Information */}
          <div ref={infoAnim.ref} className={`space-y-8 ${infoAnim.isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
            {/* Quick Contact Options */}
            <div className="bg-white rounded-2xl border border-yellow-200 p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h2>
              <div className="space-y-4">
                {quickContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="group flex items-center p-4 bg-yellow-50 rounded-xl border border-yellow-100 hover:border-yellow-400 hover:bg-white transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-yellow-100">
                      <div className="text-yellow-600">{contact.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                        {contact.title}
                      </h3>
                      <div className="text-lg font-medium text-gray-800 mt-1">{contact.contact}</div>
                      <div className="text-sm text-gray-500 mt-1">{contact.responseTime}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 transform group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Global Offices */}
            <div className="bg-white rounded-2xl border border-yellow-200 p-6 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Global Offices</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {offices.map((office) => (
                  <div
                    key={office.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start mb-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm border border-gray-100">
                        <Building className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{office.city}</h3>
                        <div className="text-sm text-gray-500">{office.country}</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
                        <span className="truncate">{office.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-yellow-500" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-yellow-500" />
                        <span>{office.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                        <span>{office.workingHours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        <section ref={deptAnim.ref} className={`mb-20 ${deptAnim.isVisible ? 'animate-zoom-in' : 'opacity-0'}`}>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Department Contacts</h2>
              <p className="text-gray-600 mt-2">Get in touch with the right team for your needs</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div
                key={dept.id}
                className={`group bg-white p-6 rounded-2xl border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 stagger-${index % 4 + 1}`}
              >
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-100">
                  <MessageCircle className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {dept.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{dept.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-3 text-purple-500" />
                    <span>{dept.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-purple-500" />
                    <span>{dept.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Map & Location Section */}
        <section ref={mapAnim.ref} className={`mb-20 ${mapAnim.isVisible ? 'animate-flip-in' : 'opacity-0'}`}>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-4 shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Find Our Office</h2>
              <p className="text-gray-600 mt-2">Visit us at our headquarters</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-yellow-200 overflow-hidden h-96 shadow-lg">
                <div className="w-full h-full bg-yellow-50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-yellow-600 mx-auto mb-4 animate-bounce-in" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                    <p className="text-gray-500 mb-4">Google Maps integration would appear here</p>
                    <div className="text-sm text-gray-400">
                      Latitude: 40.7128 | Longitude: -74.0060
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-yellow-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Headquarters</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">info@enfrosindia.com</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Mon-Sat: 9:00 AM - 6:00 PM EST</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-yellow-200 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visiting Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Saturday', time: '9:00 AM - 6:00 PM' },
                    { day: 'Sunday', time: 'Closed' },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="text-gray-900 font-medium">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media & Newsletter */}
        <section ref={socialAnim.ref} className={`mb-20 ${socialAnim.isVisible ? 'animate-zoom-in' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Social Media */}
            <div className="bg-white rounded-2xl border border-yellow-200 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
              <p className="text-gray-600 mb-8">
                Follow us on social media for the latest updates, tips, and industry news.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, color: 'from-blue-600 to-blue-700', href: 'https://www.facebook.com/enfrosindia/' },
                  { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, color: 'from-purple-600 to-pink-600', href: 'https://www.instagram.com/enfros_india/' },
                  { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, color: 'from-blue-700 to-blue-800', href: 'https://www.linkedin.com/company/enfros-india/' },
                  { name: 'YouTube', icon: <Youtube className="w-6 h-6" />, color: 'from-red-600 to-red-700', href: 'https://www.youtube.com/@EnfrosIndia' },
                  { name: 'Telegram', icon: <Send className="w-6 h-6" />, color: 'from-sky-500 to-sky-600', href: 'https://t.me/EnfrosSolarHub' },
                  { name: 'WhatsApp', icon: <MessageCircle className="w-6 h-6" />, color: 'from-green-500 to-green-600', href: 'https://whatsapp.com/channel/0029Vb6XfzZ42DcjxnN5tI0F' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center px-6 py-3 rounded-xl bg-gradient-to-r ${social.color} text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300`}
                  >
                    <span className="mr-3">{social.icon}</span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-2xl border border-yellow-200 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Stay Updated</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter for solar industry insights and company updates.
              </p>
              <form className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Subscribe to Newsletter
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqAnim.ref} className={`mb-20 ${faqAnim.isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our services and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: 'How quickly will you respond to my inquiry?',
                answer: 'We typically respond within 2 hours during business hours and within 24 hours for inquiries submitted outside of business hours.'
              },
              {
                question: 'Do you provide free consultations?',
                answer: 'Yes, we offer free initial consultations for all solar projects to assess your needs and provide preliminary recommendations.'
              },
              {
                question: 'What regions do you serve?',
                answer: 'We serve clients globally with offices in North America, Europe, Middle East, and Asia. Remote consultations are available worldwide.'
              },
              {
                question: 'What types of solar projects do you handle?',
                answer: 'We handle residential, commercial, industrial, and utility-scale solar projects, including complete design, installation, and maintenance.'
              },
              {
                question: 'How do I schedule a site visit?',
                answer: 'Contact our projects team with your location and requirements. We\'ll coordinate a site visit within 5-7 business days.'
              },
              {
                question: 'Do you offer emergency support?',
                answer: 'Yes, we provide 24/7 emergency support for existing installations. Call our emergency hotline for immediate assistance.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-8">
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-700 hover:bg-yellow-50 transition-all duration-300">
              View All FAQs
            </button>
          </div> */}
        </section>

        {/* Final CTA */}
        <section ref={ctaAnim.ref} className={`relative overflow-hidden rounded-3xl shadow-2xl ${ctaAnim.isVisible ? 'animate-bounce-in' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 animate-pulse-gold"></div>
          <div className="relative p-12 text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-xl">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-white/90 underline decoration-white/30 decoration-4">Solar Journey?</span>
            </h3>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
              Contact us today for a personalized consultation and discover how solar energy can transform your energy costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-amber-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center">
                <Phone className="w-5 h-5 inline mr-3" />
                Call Now: +91 98765 43210
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                <Mail className="w-5 h-5 inline mr-3" />
                Email Us
              </button>
            </div>
            <div className="mt-10 text-sm text-white/80 font-medium">
              Available Monday - Friday: 9AM - 6PM EST | 24/7 Emergency Support
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;