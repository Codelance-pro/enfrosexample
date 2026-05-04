import { useState, useEffect } from "react";
import {
  Menu, X, ChevronDown, ChevronRight, LogOut, User, Settings, FileText,
  Home, Info, Package, Folder, Phone, BookOpen,
  Calculator, Zap, Shield, Grid, Lightbulb, Droplets, Layout, Flame, Cable
} from "lucide-react";
import logo2 from "../assets/enfros-logo.png";
import { useNavigate } from "react-router-dom";

interface UserData {
  role: "admin" | "vendor" | "guest";
  name?: string;
  email?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>({ role: "guest" });

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserData["role"] | null;
    if (savedRole) setUser({ role: savedRole });
  }, []);

  const goToPage = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setIsAdminDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsProductsDropdownOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileProductsOpen(false);
  };

  const handleAdminLogin = () => goToPage("/admin/login");
  const handleVendorLogin = () => goToPage("/vendor/login");
  const handleVendorRegistration = () => goToPage("/vendor/registration");

  const handleLogout = () => {
    localStorage.clear();
    setUser({ role: "guest" });
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "About", path: "/about", icon: <Info className="w-5 h-5" /> },
    { name: "Services", path: "/services", icon: <Phone className="w-5 h-5" />, hasDropdown: true, dropdownType: 'services' },
    { name: "Projects", path: "/projects", icon: <Folder className="w-5 h-5" /> },
    { name: "Products", path: "/products", icon: <Package className="w-5 h-5" />, hasDropdown: true, dropdownType: 'products' },
    { name: "Careers", path: "/career", icon: <FileText className="w-5 h-5" /> },
    { name: "Contact", path: "/contact", icon: <Phone className="w-5 h-5" /> },
  ];

  const productCategories = [
    {
      name: "Earthing & Lighting protecting solution",
      icon: <Shield className="w-5 h-5" />,
      subheadings: [
        "ESE Lightning Arrester",
        "Copper Bonded Earthing Rod",
        "Hot Dip GI Earthing Strip",
        "Copper Strip",
        "Conventional Lightning Arrester",
        "Earthing Chamber (RCC & GI Cast Iron)",
        "Earthing Compound"
      ]
    },
    { 
      name: "Fencing & boundary solution", 
      icon: <Grid className="w-5 h-5" />, 
      subheadings: [
        "PVC Chain Link Fence",
        "GI Chain Link Fence",
        "Barbed Wire",
        "Concertina Coil",
        "Tension Wires",
        "Razor Panel",
        "Wire Mesh"
      ] 
    },
    { 
      name: "Cable management system", 
      icon: <Zap className="w-5 h-5" />, 
      subheadings: [
        "Gi cable tray (Hot dip galvanized)",
        "Perforated cable tray",
        "Cable tray support structures"
      ] 
    },
    { 
      name: "Street Lights & Lighting Solution", 
      icon: <Lightbulb className="w-5 h-5" />, 
      subheadings: [
        "Solar Street Lights",
        "Ac Street Lights"
      ] 
    },
    { 
      name: "Dwc Pipes & Its accessories", 
      icon: <Droplets className="w-5 h-5" />, 
      subheadings: [
        "Dwc Pipes & Accessories"
      ] 
    },
    { 
      name: "Precast Boundary Wall", 
      icon: <Layout className="w-5 h-5" />, 
      subheadings: [
        "Precast Boundary Wall"
      ] 
    },
    { 
      name: "Fire safety System", 
      icon: <Flame className="w-5 h-5" />, 
      subheadings: [
        "Fire & Safety door",
        "Certified Fire resistant doors"
      ] 
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg"
          : "bg-gradient-to-b from-white/80 to-white/30 backdrop-blur-sm"
          }`}
      >
        <div className="px-4 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* ── LOGO ── */}
            <div
              className="shrink-0 space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={logo2}
                alt="Enfros Logo"
                className="h-20 w-60 p-2 hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* ── DESKTOP MENU (centred, pushed away from logo) ── */}
            <div className="hidden lg:flex items-center  gap-1 space-x-5  ">
              {menuItems.map((item) => {
                if (item.hasDropdown) {
                  const isOpen = item.dropdownType === 'services' ? isServicesDropdownOpen : isProductsDropdownOpen;
                  const setOpen = item.dropdownType === 'services' ? setIsServicesDropdownOpen : setIsProductsDropdownOpen;

                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => {
                        setOpen(false);
                        if (item.dropdownType === 'products') setHoveredCategory(null);
                      }}
                    >
                      <button
                        onClick={() => goToPage(item.path)}
                        className="relative group flex items-center gap-1 px-3 py-2 text-gray-800 font-semibold text-lg xl:text-lg hover:text-yellow-600 transition-colors duration-200"
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-yellow-500" : ""
                            }`}
                        />
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                      </button>

                      {/* Generic Dropdown Container */}
                      {isOpen && (
                        <div className={`absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200 ${item.dropdownType === 'products' ? 'w-[600px] flex' : 'w-58 min-w-[220px]'
                          }`}>
                          {item.dropdownType === 'services' ? (
                            <>
                              <button
                                onClick={() => goToPage("/services")}
                                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                              >
                                <Phone className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium">All Services</span>
                              </button>
                              <div className="h-px bg-gray-100 mx-4 my-1" />
                              <button
                                onClick={() => goToPage("/calculator")}
                                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                              >
                                <Calculator className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium">Solar Calculator</span>
                              </button>
                              <button
                                onClick={() => goToPage("/blog")}
                                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                              >
                                <BookOpen className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium">Blog &amp; Insights</span>
                              </button>
                            </>
                          ) : (
                            <>
                              {/* Products Mega Menu */}
                              <div className="w-1/2 border-r border-gray-50 max-h-[400px] overflow-y-auto">
                                {productCategories.map((cat) => (
                                  <div
                                    key={cat.name}
                                    onMouseEnter={() => setHoveredCategory(cat.name)}
                                    onClick={() => goToPage(`/products?category=${encodeURIComponent(cat.name)}`)}
                                    className={`group flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${hoveredCategory === cat.name ? 'bg-yellow-50 text-yellow-700' : 'text-gray-700 hover:bg-gray-50'
                                      }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className={`${hoveredCategory === cat.name ? 'text-yellow-600' : 'text-gray-400 group-hover:text-yellow-500'}`}>
                                        {cat.icon}
                                      </span>
                                      <span className="text-sm font-medium">{cat.name}</span>
                                    </div>
                                    {cat.subheadings.length > 0 && (
                                      <ChevronRight className={`w-4 h-4 ${hoveredCategory === cat.name ? 'translate-x-1' : 'opacity-0'} transition-all`} />
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="w-1/2 bg-gray-50/50 p-4 min-h-[300px]">
                                {hoveredCategory ? (
                                  <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                                      {hoveredCategory} Sub-products
                                    </h3>
                                    <div className="grid gap-1">
                                      {productCategories.find(c => c.name === hoveredCategory)?.subheadings.length ? (
                                        productCategories.find(c => c.name === hoveredCategory)?.subheadings.map((sub) => (
                                          <button
                                            key={sub}
                                            onClick={() => goToPage(`/products?category=${encodeURIComponent(hoveredCategory)}&product=${encodeURIComponent(sub)}`)}
                                            className="text-left px-3 py-2 text-sm text-gray-600 hover:text-yellow-700 hover:bg-white rounded-lg transition-all"
                                          >
                                            {sub}
                                          </button>
                                        ))
                                      ) : (
                                        <div className="px-2 py-4 text-sm text-gray-400 italic">
                                          Explore our full range of {hoveredCategory}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400">
                                    <Package className="w-10 h-10 mb-2 opacity-20" />
                                    <p className="text-sm">Hover over a category to see products</p>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.name}
                    onClick={() => goToPage(item.path)}
                    className="relative group px-3 py-2 text-gray-800 font-semibold text-lg xl:text-lg hover:text-yellow-600 transition-colors duration-200"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                );
              })}
            </div>

            {/* ── LOGIN / ADMIN BUTTONS (right side) ── */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              {user.role !== "admin" && (
                <div className="relative">
                  <button
                    onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-all"
                  >
                    <User className="w-4 h-4 text-yellow-400" />
                    Login
                    <ChevronDown
                      className={`w-4 h-4 text-yellow-400 transition-transform ${isAdminDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isAdminDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-xl py-2 z-[60]">
                      <button
                        onClick={handleAdminLogin}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 text-sm transition-colors"
                      >
                        <Settings className="w-4 h-4 text-yellow-400" />
                        Admin Login
                      </button>
                      <button
                        onClick={handleVendorLogin}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 text-sm transition-colors"
                      >
                        <User className="w-4 h-4 text-yellow-400" />
                        Vendor Login
                      </button>
                    </div>
                  )}
                </div>
              )}

              {user.role === "admin" && (
                <button
                  onClick={() => navigate("/admin-dashboard")}
                  className="px-5 py-2 text-sm text-white bg-red-700 hover:bg-red-600 rounded-lg transition"
                >
                  Admin Panel
                </button>
              )}

              {user.role !== "guest" && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="lg:hidden ml-auto p-2 bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen
                ? <X className="w-5 h-5 text-yellow-400" />
                : <Menu className="w-5 h-5 text-yellow-400" />
              }
            </button>

          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-gray-950/98 backdrop-blur-xl overflow-y-auto lg:hidden">
          <div className="p-5 pb-10 flex flex-col gap-1">

            {/* Nav Items */}
            {menuItems.map((item) => {
              if (item.hasDropdown) {
                const isDropdownOpen = item.dropdownType === 'services' ? isMobileServicesOpen : isMobileProductsOpen;
                const setDropdownOpen = item.dropdownType === 'services' ? setIsMobileServicesOpen : setIsMobileProductsOpen;

                return (
                  <div key={item.name}>
                    <button
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-white hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-yellow-400">{item.icon}</span>
                        <span className="text-base font-semibold">{item.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="ml-4 pl-4 border-l border-gray-800 mb-1 flex flex-col gap-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                        {item.dropdownType === 'services' ? (
                          <>
                            <button
                              onClick={() => goToPage("/services")}
                              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            >
                              <Phone className="w-5 h-5 text-yellow-500" />
                              <span>All Services</span>
                            </button>
                            <button
                              onClick={() => goToPage("/calculator")}
                              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            >
                              <Calculator className="w-5 h-5 text-yellow-500" />
                              <span>Solar Calculator</span>
                            </button>
                            <button
                              onClick={() => goToPage("/blog")}
                              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            >
                              <BookOpen className="w-5 h-5 text-yellow-500" />
                              <span>Blog &amp; Insights</span>
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col gap-1 py-1">
                            {productCategories.map((cat) => (
                              <div key={cat.name}>
                                <button
                                  onClick={() => cat.subheadings.length > 0 ? setMobileExpandedCategory(mobileExpandedCategory === cat.name ? null : cat.name) : goToPage(`/products?category=${encodeURIComponent(cat.name)}`)}
                                  className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-yellow-600/70">{cat.icon}</span>
                                    <span className="text-sm font-medium">{cat.name}</span>
                                  </div>
                                  {cat.subheadings.length > 0 && (
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedCategory === cat.name ? 'rotate-180' : ''}`} />
                                  )}
                                </button>
                                {mobileExpandedCategory === cat.name && (
                                  <div className="ml-8 pl-4 border-l border-gray-800 flex flex-col gap-1 my-1 animate-in slide-in-from-left-1 duration-200">
                                    {cat.subheadings.map(sub => (
                                      <button
                                        key={sub}
                                        onClick={() => goToPage(`/products?category=${encodeURIComponent(cat.name)}&product=${encodeURIComponent(sub)}`)}
                                        className="text-left px-4 py-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                                      >
                                        {sub}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => goToPage(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-white hover:bg-white/5 transition-colors"
                >
                  <span className="text-yellow-400">{item.icon}</span>
                  <span className="text-base font-semibold">{item.name}</span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="border-t border-gray-800 my-4" />

            {/* Login section */}
            <p className="px-4 text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Login Options
            </p>
            <button
              onClick={handleAdminLogin}
              className="flex items-center gap-3 px-4 py-4 rounded-xl bg-gray-800/60 text-white hover:bg-gray-800 transition-colors"
            >
              <Settings className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Admin Login</span>
            </button>
            <button
              onClick={handleVendorLogin}
              className="flex items-center gap-3 px-4 py-4 rounded-xl bg-gray-800/60 text-white hover:bg-gray-800 transition-colors"
            >
              <User className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Vendor Login</span>
            </button>
            <button
              onClick={handleVendorRegistration}
              className="flex items-center gap-3 px-4 py-4 rounded-xl bg-yellow-500 text-gray-900 font-bold hover:bg-yellow-400 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>Vendor Registration</span>
            </button>

            {/* Logout */}
            {user.role !== "guest" && (
              <>
                <div className="border-t border-gray-800 my-4" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl border border-red-900/50 text-red-400 hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout Account</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Click-outside to close admin dropdown */}
      {isAdminDropdownOpen && (
        <div
          className="fixed inset-0 z-[55]"
          onClick={() => setIsAdminDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;