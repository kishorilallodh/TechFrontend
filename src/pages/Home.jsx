import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Lottie from "lottie-react";
import heroAnimation from "../lotties/Hero.json";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  Zap,
  Play,
 
} from "lucide-react";
import { FaHandHoldingHeart, FaHandsHelping, FaChartLine, FaIndustry } from "react-icons/fa";
import { MdSolarPower } from "react-icons/md";
import { GiHerbsBundle, GiCardboardBox } from "react-icons/gi";

import Review from "../components/reviewCard/review";
import ServiceCards from "../components/serviceCard/ServiceCard";
import BrandStoryPage from "../components/brandStory/BrandStory";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const location = useLocation();
const [key, setKey] = useState(0);

  // ✅ Loop every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1); // har 5s me countUp reset
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  // ✅ Scroll to top on page load / route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

const stats = [
  { number: 200, suffix: "+", label: "Projects Completed", icon: <Award /> },
  { number: 75, suffix: "+", label: "Happy Clients", icon: <Users /> },
  { number: 6, suffix: "+", label: "Years Experience", icon: <Star /> },
  { number: 24, suffix: "/7", label: "Support", icon: <Zap /> },
];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 pb-5 md:pb-8 bg-gradient-to-br from-blue50 via-white to-light overflow-hidden">
        <div className="relative container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6 text-center lg:text-left">
                <motion.h1
                  className="text-h1 text-gray-900 leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  We Design
                  <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block whitespace-nowrap">
                    Develop & Scale
                  </span>
                  <br />
                  Digital Success
                </motion.h1>

                <motion.p
                  className="text-p-lg text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  We’re a Software Development Company in Bhopal City. Strategy,
                  design, and development across all platforms. Digital products
                  that people love to use.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/service"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-primary hover:text-primary transition-all duration-300 group"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  View Our Work
                </Link>
              </motion.div>

             {/* Stats */}
 <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center group">
          <div className="flex justify-center mb-2 text-primary group-hover:scale-110 transition-transform duration-300">
            {stat.icon}
          </div>
          <div className="text-3xl font-bold text-gray-900">
            <CountUp
              key={key + index} // हर बार नया render
              start={0}
              end={stat.number}
              duration={2.5}
              separator=","
              suffix={stat.suffix || ""}
              redraw={true}
            />
          </div>
          <div className="text-gray-600 text-sm">{stat.label}</div>
        </div>
      ))}
    </motion.div>
            </motion.div>

            {/* Right: Lottie Animation */}
            <div className="pt-0 lg:pt-16  w-full h-full">
              <Lottie
                animationData={heroAnimation}
                loop={true}
                style={{ width: "100%", maxWidth: 800, height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section>
        <BrandStoryPage />
      </section>

      {/* Services */}
      <div className="bg-gray-100 pt-8 pb-8 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="container">
          <motion.div
            className="text-center mb-8 sm:mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 text-gray-900 mb-1 sm:mb-1">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-p-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto">
              We offer comprehensive digital solutions to help your business
              thrive in the modern world
            </p>
          </motion.div>
          <ServiceCards pageType="home" />
        </div>
      </div>

      {/* Scrolling Ticker */}
   <section className="py-5 bg-gradient-to-r from-blue-600 to-[#48C9DA] overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 12,
                ease: "linear",
              },
            }}
          >
            <div className="flex items-center space-x-16 px-8">
              <div className="flex items-center text-white font-semibold text-lg">
                <FaHandHoldingHeart className="w-6 h-6 mr-3" />
                AyurHomeoCare
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <MdSolarPower className="w-6 h-6 mr-3" />
                SaiTech
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <FaHandsHelping className="w-6 h-6 mr-3" />
                Vasundhara Sanrakshan Samajik Sansthan
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <GiHerbsBundle className="w-6 h-6 mr-3" />
                Pratyaksh Ayurveda
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <GiCardboardBox className="w-6 h-6 mr-3" />
                Rishi Packaging
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <FaChartLine className="w-6 h-6 mr-3" />
                Mudra Nivesh & Prabandhan
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <FaIndustry className="w-6 h-6 mr-3" />
                Vaidehi Enterprises
              </div>
            </div>

            <div className="flex items-center space-x-16 px-8">
              <div className="flex items-center text-white font-semibold text-lg">
                <FaHandHoldingHeart className="w-6 h-6 mr-3" />
                AyurHomeoCare
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <MdSolarPower className="w-6 h-6 mr-3" />
                SaiTech
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <FaHandsHelping className="w-6 h-6 mr-3" />
                Vasundhara Sanrakshan Samajik Sansthan
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <GiHerbsBundle className="w-6 h-6 mr-3" />
                Pratyaksh Ayurveda
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <GiCardboardBox className="w-6 h-6 mr-3" />
                Rishi Packaging
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <FaChartLine className="w-6 h-6 mr-3" />
                Mudra Nivesh & Prabandhan
              </div>
              <div className="flex items-center text-white font-semibold text-lg">
                <FaIndustry className="w-6 h-6 mr-3" />
                Vaidehi Enterprises
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-8 bg-gradient-to-br from-blue50 to-indigo-50">
        <div className="container">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-h2 text-gray-900 mb-2 font-bold">
              WHAT OUR{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CLIENTS SAY
              </span>{" "}
              !!
            </h2>
            <p className="text-p-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto">
              Discover why businesses choose TechDigi for their digital
              transformation
            </p>
          </div>
          <Review />
        </div>
      </section>
    </div>
  );
};

export default Home;
