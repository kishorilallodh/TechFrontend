"use client";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import webDevImg from "../assets/webdev.png";
import appDevImg from "../assets/appdev.png";
import digitalMarketingImg from "../assets/digitalmark.png";
import crmImg from "../assets/crm1.png";
import { Code, Clock, Users, Zap } from "lucide-react";
import {
  FaAngular,
  FaBootstrap,
  FaPython,
  FaNodeJs,
  FaAndroid,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiLaravel,
  SiElectron,
  SiSolidity,
  SiTailwindcss,
  SiGraphql,
  SiFlutter,
  SiSwift,
  SiMongodb,
  SiFirebase,
  SiElastic,
} from "react-icons/si";
import { FaReact, FaVuejs } from "react-icons/fa6";
import { RiJavascriptFill } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { DiNodejs } from "react-icons/di";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ServiceCards from "../components/serviceCard/ServiceCard";

// ✅ Reusable Button with theme integration
const Button = ({ children, size = "default", className = "", ...props }) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:scale-105 transform transition-all duration-200 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Service() {
  const location = useLocation();

  // ✅ Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ✅ Technologies Array (same but using theme colors if possible)
  const technologies = [
    { name: "Angular", icon: FaAngular, color: "text-red-600" },
    { name: "Bootstrap", icon: FaBootstrap, color: "text-purple-600" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-black" },
    { name: "Nest.js", icon: SiNestjs, color: "text-red-500" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
    { name: "Python", icon: FaPython, color: "text-blue-500" },
    { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
    { name: "Electron.js", icon: SiElectron, color: "text-gray-700" },
    { name: "Solidity", icon: SiSolidity, color: "text-gray-800" },
    { name: "React", icon: FaReact, color: "text-blue-600" },
    { name: "JavaScript", icon: RiJavascriptFill, color: "text-yellow-500" },
    { name: "Vue.js", icon: FaVuejs, color: "text-green-600" },
  ];

  const technologiesRow = [
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500" },
    { name: "GraphQL", icon: SiGraphql, color: "text-pink-600" },
    { name: "Android", icon: FaAndroid, color: "text-green-500" },
    { name: "Flutter", icon: SiFlutter, color: "text-blue-400" },
    { name: "MySQL", icon: GrMysql, color: "text-blue-500" },
    { name: "Swift", icon: SiSwift, color: "text-orange-500" },
    { name: "Elastic", icon: SiElastic, color: "text-yellow-600" },
    { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "TypeScript", icon: BiLogoTypescript, color: "text-blue-500" },
    { name: "PostgreSQL", icon: BiLogoPostgresql, color: "text-blue-500" },
    { name: "Node.js", icon: DiNodejs, color: "text-green-600" },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We start by understanding your business, goals, and requirements through detailed consultations.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Our team creates a comprehensive project plan with timelines, milestones, and deliverables.",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Development",
      description:
        "We build your solution using agile methodologies with regular updates and feedback loops.",
      icon: <Code className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Launch",
      description:
        "After thorough testing, we deploy your solution and provide ongoing support and maintenance.",
      icon: <Zap className="w-8 h-8" />,
    },
  ];

  return (
    <div className="bg-white  overflow-hidden">
      {/* Hero Section */}
      <section className="pt-[5rem] pb-[2rem]  bg-gradient-to-br from-blue50 via-white to-light relative overflow-hidden">
        <div className="relative container">
          <motion.div
            className="text-center space-y-2 md:space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-h1-fixed text-gray-900 font-bold">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-p-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital solutions tailored to your business needs.
              From web development to AI integration, we have the expertise to
              bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <div className="min-h-screen bg-gray-100 py-8 md:py-12">
        <div className="container">
          <ServiceCards pageType="services" />
        </div>
      </div>

      {/* Process Section */}
      <section className="py-8 md:py-8 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-8 md:mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 mb-2 text-gray-900">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-p-lg text-gray-600">
              How we bring your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2 p-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-r from-primary to-secondary w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-secondary font-bold text-xs md:text-sm w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-secondary">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-p-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-10 md:py-10 bg-gray-50">
        <div className="container grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661277604122-4324e519402a?q=80&w=870&auto=format&fit=crop"
              alt="Team collaboration"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 lg:mt-0"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              {" "}
              Choose <span className="text-blue-900"> Best</span> IT Service
              Company{" "}
            </h2>{" "}
            <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base text-justify">
              {" "}
              At an IT firm or MSP, the role goes far beyond just fixing issues
              — it’s about being a true partner in your growth. A reliable IT
              service provider ensures your systems run smoothly 24/7, protects
              your business from downtime, and keeps your data secure. By
              leveraging the latest technologies, they not only solve immediate
              problems but also help you plan for the future. A great IT partner
              frees you from the burden of technical worries so you can focus on
              innovation, expansion, and achieving your business goals.
              Unfortunately, many IT companies fail to deliver consistent
              results, leaving clients frustrated. That’s why choosing the right
              IT firm is crucial — one that understands your vision, aligns with
              your strategy, and grows with you every step of the way.{" "}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <div className="py-8 md:py-12 bg-white">
        <div className="container">
          <p className="text-base text-blue-900 text-center font-semibold tracking-wide uppercase">
            {" "}
            Our Technology{" "}
          </p>{" "}
          <h2 className="text-h2 font-extrabold text-center text-gray-900 mb-8 md:mb-10">
            {" "}
            Technologies We Work With Us{" "}
          </h2>
          {/* First Row */}
          <div className="mb-6 md:mb-8">
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
                1024: { slidesPerView: 8 },
              }}
              modules={[Autoplay]}
              className="py-2"
            >
              {technologies.map((tech, index) => (
                <SwiperSlide key={`first-${index}`}>
                  <div className="flex flex-col items-center p-2">
                    <tech.icon
                      className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 ${tech.color}`}
                    />
                    <h3 className="mt-2 text-xs md:text-sm font-medium text-gray-900 text-center">
                      {tech.name}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Second Row */}
          <div>
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={5000}
              loop={true}
              breakpoints={{
                480: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                768: { slidesPerView: 6 },
                1024: { slidesPerView: 8 },
              }}
              modules={[Autoplay]}
              className="py-2"
            >
              {technologiesRow.map((tech, index) => (
                <SwiperSlide key={`second-${index}`}>
                  <div className="flex flex-col items-center p-2">
                    <tech.icon
                      className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 ${tech.color}`}
                    />
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
    </div>
  );
}
