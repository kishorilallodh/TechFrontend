import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PiCertificate } from "react-icons/pi";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaBriefcase,
  FaEnvelope,
  FaSignInAlt, // Login icon
} from "react-icons/fa";

import TechDigiLogo from "../../assets/TechDigi_Logo.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // CSS classes for active/inactive NavLink (Desktop)
  const getNavLinkClass = ({ isActive }) =>
    `text-base font-medium transition-colors duration-200 ${
      isActive ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"
    }`;

  // CSS classes for active/inactive NavLink (Mobile)
  const getMobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-4 p-3 rounded-lg text-lg transition-colors duration-200 ${
      isActive
        ? "bg-blue-50 text-primary font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/service", label: "Service", icon: <FaServicestack /> },
    { to: "/careers", label: "Careers", icon: <FaBriefcase /> },
    { to: "/certificate-verification", label: "Verification", icon: <PiCertificate /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled || menuOpen ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={TechDigiLogo}
              alt="TechDigi Logo"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={getNavLinkClass}>
                {link.label}
              </NavLink>
            ))}
            {/* CHANGE 1: Button is now a Link to /login */}
            <Link
              to="/login"
              className="py-2 px-6 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 p-1"
            >
              {menuOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CHANGE 2: Slide-in Mobile Menu (Completely redesigned UI) */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            menuOpen ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <img
              src={TechDigiLogo}
              alt="TechDigi Logo"
              className="h-8"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 p-1"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow p-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={getMobileNavLinkClass}
              >
                <span className="text-primary">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Menu Footer with Login Button */}
          <div className="p-4 border-t">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-md transition-all duration-300"
            >
              <FaSignInAlt />
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}