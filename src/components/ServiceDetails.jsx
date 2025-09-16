import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceBySlug } from "../features/admin/service/serviceApi";
import ServiceExploreCards from "./serviceCard/ServiceExploreCard";
import ServiceCards from "./serviceCard/ServiceCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


// Import all icons
import {
  FaReact,
  FaAngular,
  FaBootstrap,
  FaNodeJs,
  FaPython,
  FaJava,
  FaAndroid,
  FaApple,
  FaSwift,
  FaCube,
  FaServer,
  FaLaptopCode,
  FaShieldAlt,
  FaSlack,
  FaHtml5,
  FaCss3Alt
} from "react-icons/fa";
import {
  SiVuedotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiGo,
  SiExpress,
  SiLaravel,
  SiFlutter,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiSalesforce,
  SiHubspot,
  SiZoho,
  SiZapier,
  SiMailchimp,
  SiGoogle,
  SiRedux,
  SiSass,
  SiNextdotjs,
  SiDocker,
  SiDart,
  SiKotlin
} from "react-icons/si";

import { GrMysql } from "react-icons/gr";
import { DiRuby } from "react-icons/di";


const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
// Create a mapping object for icon names to actual icon components
const iconComponents = {
  FaReact,
  FaAngular,
  FaBootstrap,
  SiVuedotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  FaNodeJs,
  FaPython,
  FaJava,
  SiGo,
  SiExpress,
  SiLaravel,
  FaAndroid,
  FaApple,
  FaSwift,
  SiFlutter,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  GrMysql,
  FaCube,
  FaServer,
  FaLaptopCode,
  FaShieldAlt,
  SiSalesforce,
  SiHubspot,
  SiZoho,
  SiZapier,
  SiMailchimp,
  SiGoogle,
  FaSlack,
  DiRuby,
  FaHtml5,
  FaCss3Alt,
   SiRedux,
  SiSass,
  SiNextdotjs,
  SiDocker,
  SiDart,
  SiKotlin
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const serviceSectionRef = useRef(null);
  const dispatch = useDispatch();

  const { selected: service, loading, error } = useSelector((s) => s.services);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!service || service.slug !== slug) {
      dispatch(fetchServiceBySlug(slug));
    }
  }, [dispatch, slug, service]);

  const scrollToServices = () => {
    serviceSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!service) return null;

  // Strategy steps divided left/right
  const stepsLeft =
    service.strategySteps?.filter((s) => s.side === "left") || [];
  const stepsRight =
    service.strategySteps?.filter((s) => s.side === "right") || [];

  // Technologies divided by category
  const firstRow =
    service.technologies?.filter((t) => t.category === "firstRow") || [];
  const secondRow =
    service.technologies?.filter((t) => t.category === "secondRow") || [];

  // Function to render icon based on iconString from API
  const renderIcon = (iconString, colorClass, size = 40) => {
    const IconComponent = iconComponents[iconString];
    if (!IconComponent) {
      console.warn(`Icon not found: ${iconString}`);
      return (
        <div
          className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ${colorClass}`}
        ></div>
      );
    }
    return <IconComponent className={colorClass} size={size} />;
  };

  return (
    <>
      {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue50 via-white to-light   pb-16 overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-4 items-center pt-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {service.heroTitle}
            </h1>

            <p className="mt-9 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0">
              {service.heroDescription}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#03286d] to-[#4859da] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToServices}
              >
                Explore Services
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center order-1 md:order-2  lg:h-[480px]"
          >
            <div className="relative w-full max-w-xl ">
              <div className="absolute -inset-8 bg-blue-100 rounded-3xl blur-xl opacity-50"></div>
             
                <img
                  src={`${BACKEND_URL}/${service.heroImage}`}
                  alt={service.heroTitle}
                  className="relative rounded-2xl  w-full  "
                />
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategy Section */}
      {service.strategySteps?.length > 0 && (
        <section className="hidden lg:block py-10 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
          <div className="container">
            <h2 className="text-h2 text-center mb-16 text-gray-800">
              Our {service.heroTitle} Strategy
            </h2>

            <div className="relative flex flex-col lg:flex-row gap-6 items-center justify-center">
              {/* Left Side */}
              <div className="flex flex-col gap-10 lg:w-2/5">
                {stepsLeft.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-end gap-4 relative"
                  >
                    <div className="bg-white rounded-full px-5 py-3 shadow-md flex items-center gap-3 relative z-10">
                      <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <h3 className="font-semibold text-gray-700 whitespace-nowrap">
                        {step.title}
                      </h3>
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center">
                      <div className="h-0.5 bg-gray-300 w-12"></div>
                      <div className="w-0 h-0 border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-400"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Center Circle */}
              <div className="flex justify-center my-10 lg:my-0 lg:w-1/5 relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center border-8 border-secondary font-bold text-center text-primary text-lg"
                >
                  <span>PROCESS</span>
                </motion.div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col gap-10 lg:w-2/5">
                {stepsRight.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 relative"
                  >
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
                      <div className="w-0 h-0 border-t-2 border-b-2 border-r-4 border-t-transparent border-b-transparent border-r-gray-400"></div>
                      <div className="h-0.5 bg-gray-300 w-12"></div>
                    </div>
                    <div className="bg-white rounded-full px-5 py-3 shadow-md flex items-center gap-3 relative z-10">
                      <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 5}
                      </div>
                      <h3 className="font-semibold text-gray-700 whitespace-nowrap">
                        {step.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Offered Section */}
      {service.servicesOffered?.length > 0 && (
        <section ref={serviceSectionRef} className="py-10 bg-gray-50">
          <div className="container">
          <h2 className="text-h2 text-center mb-10">Our {service.heroTitle} Services</h2>
          <ServiceExploreCards services={service.servicesOffered} />
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-blue50 py-12">
        <div className="container text-center ">
          <h2 className="text-h2 text-gray-900 mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-p-lg text-gray-700 mb-8">
            Ready to bring your vision to life? Our expert team specializes in delivering world-class {service.heroTitle} solutions designed to match your unique business goals.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-primary font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Technology Section */}
      {service.technologies?.length > 0 && (
        <div className="py-10 bg-white">
          <div className="container">
            <h2 className="text-h2 text-center text-gray-900 mb-3">
              Technologies We Use
            </h2>
            <p className="mb-10 text-center max-w-2xl mx-auto text-gray-600">
              We implement modern and robust frontend and backend technologies
              to deliver high-performance, scalable, and secure applications.
            </p>

            {/* First Row */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-900 pl-3">
              Frontend Technologies
            </h3>
            <div className="mb-10">
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: true,
                }}
                speed={5000}
                loop={true}
                breakpoints={{
                  480: { slidesPerView: 3 },
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 6 },
                  1024: { slidesPerView: 6 },
                }}
                modules={[Autoplay]}
                className="py-2"
              >
                {firstRow.map((tech, index) => (
                  <SwiperSlide key={`front-${index}`}>
                    <div className="flex flex-col items-center p-2">
                      <div className="flex items-center justify-center h-14 w-14">
                        {renderIcon(tech.iconString, tech.colorClass)}
                      </div>
                      <h3 className="mt-2 text-xs md:text-sm font-medium text-gray-900 text-center">
                        {tech.name}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Second Row */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-900 pl-3">
              Backend Technologies
            </h3>
            <div>
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={5000}
                loop={true}
                breakpoints={{
                  480: { slidesPerView: 3 },
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 6 },
                  1024: { slidesPerView: 6 },
                }}
                modules={[Autoplay]}
                className="py-2"
              >
                {secondRow.map((tech, index) => (
                  <SwiperSlide key={`back-${index}`}>
                    <div className="flex flex-col items-center p-2">
                      <div className="flex items-center justify-center h-14 w-14">
                        {renderIcon(tech.iconString, tech.colorClass)}
                      </div>
                      <h3 className="mt-2 text-xs md:text-sm font-medium text-gray-900 text-center">
                        {tech.name}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}

      {/* All Services Section */}
      <section className="min-h-screen bg-gray-100 py-10">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-p-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive digital solutions to help your business
              thrive in the modern world
            </p>
          </motion.div>
          <ServiceCards />
        </div>
      </section>
    </>
  );
}
