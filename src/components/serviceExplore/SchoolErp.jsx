import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ServiceExploreCards from "../serviceCard/ServiceExploreCard";
import ServiceCards from "../serviceCard/ServiceCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaChartLine,
  FaBullseye,
  FaUsers,
  FaSketch,
  FaCode,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

// React Icons
import { FaHtml5, FaCss3Alt, FaAngular, FaBootstrap, FaReact, FaPython, FaNodeJs } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { SiNextdotjs, SiTailwindcss, SiExpress, SiFirebase, SiMongodb, SiLaravel } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { DiNodejs } from "react-icons/di";

import Lottie from "lottie-react";
import heroAnimation from "../../lotties/schoolErp.json";

const stepsLeft = [
  {
    title: "Requirement Gathering & Planning",
    color: "bg-slate-400",
    icon: <FaLightbulb className="text-white text-lg" />,
  },
  {
    title: "Institution & Stakeholder Analysis",
    color: "bg-orange-400",
    icon: <FaChartLine className="text-white text-lg" />,
  },
  {
    title: "Define ERP Modules & Objectives",
    color: "bg-teal-400",
    icon: <FaBullseye className="text-white text-lg" />,
  },
  {
    title: "Database & Architecture Design",
    color: "bg-purple-400",
    icon: <FaUsers className="text-white text-lg" />,
  },
];

const stepsRight = [
  {
    title: "UI/UX Design & Prototyping",
    color: "bg-green-400",
    icon: <FaSketch className="text-white text-lg" />,
  },
  {
    title: "ERP Development & Integration",
    color: "bg-sky-400",
    icon: <FaCode className="text-white text-lg" />,
  },
  {
    title: "Testing, Security & Compliance",
    color: "bg-pink-400",
    icon: <FaShieldAlt className="text-white text-lg" />,
  },
  {
    title: "Deployment, Training & Support",
    color: "bg-orange-500",
    icon: <FaRocket className="text-white text-lg" />,
  },
];


const services = [
  {
    title: "Custom ERP Solutions",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Tailored ERP platforms designed to manage academic and administrative processes efficiently.",
  },
  {
    title: "Cloud-Based ERP",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    description:
      "Scalable, cloud-hosted ERP systems with anytime access, enabling collaboration between staff, students, and parents.",
  },
  {
    title: "Third-Party Integrations",
    img: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
    description:
      "Seamless integration with payment gateways, SMS, email, and learning management systems for a unified workflow.",
  },
  {
    title: "Workflow Automation",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Automate tasks like admissions, attendance, exams, and fee management to improve accuracy and efficiency.",
  },
  {
    title: "ERP Analytics & Reports",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Get insights on student performance, fee collection, and institutional growth with advanced reporting tools.",
  },
  {
    title: "Maintenance & Support",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Continuous updates, module enhancements, and technical support to keep your ERP system running smoothly.",
  },
];

const technologies = [
  { name: "HTML5", icon: FaHtml5, color: "text-orange-600" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-blue-600" },
  { name: "Angular", icon: FaAngular, color: "text-red-600" },
  { name: "Bootstrap", icon: FaBootstrap, color: "text-purple-600" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-black" },
  { name: "React", icon: FaReact, color: "text-blue-600" },
  { name: "JavaScript", icon: RiJavascriptFill, color: "text-yellow-500" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500" },
  { name: "TypeScript", icon: BiLogoTypescript, color: "text-blue-500" },
];
const technologiesRow = [
  { name: "Express.js", icon: SiExpress, color: "text-gray-800" },
  { name: "MySQL", icon: GrMysql, color: "text-blue-500" },
  { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "PostgreSQL", icon: BiLogoPostgresql, color: "text-blue-500" },
  { name: "Node.js", icon: DiNodejs, color: "text-green-600" },
  { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
  { name: "Python", icon: FaPython, color: "text-blue-500" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
];

export default function SchoolErp() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceSectionRef = useRef(null);

  // Scroll to top on page load / route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToServices = () => {
    serviceSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-white to-[#48C9DA] py-20 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                Innovative Solutions
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              School & College{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03286d] to-[#4859da]">
                ERP Solutions
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0">
              School & College ERP streamlines academic and administrative tasks
              by automating admissions, attendance, exams, and fee management,
              while providing analytics and integrations to improve efficiency
              and student success.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#03286d] to-[#4859da] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToServices}
              >
                Explore Services
              </motion.button>
            </div>

            <div className="mt-10 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Admission Management
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Attendance Tracking
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Exam & Result Management
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center order-1 md:order-2"
          >
            <div className="relative w-full max-w-xl">
              {" "}
              {/* 👈 max-w-md → max-w-xl */}
              <div className="absolute -inset-8 bg-blue-100 rounded-3xl blur-xl opacity-50"></div>{" "}
              {/* 👈 thoda bada glow */}
              <Lottie
                animationData={heroAnimation}
                loop={true}
                className="relative rounded-2xl"
                style={{ width: "90%", height: "auto" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            Our School & College ERP Solutions Strategy
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
                  {/* Step Card */}
                  <div className="bg-white rounded-full px-5 py-3 shadow-md flex items-center gap-3 relative z-10">
                    <div
                      className={`${step.color} w-10 h-10 rounded-full flex items-center justify-center`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-700 whitespace-nowrap">
                      {step.title}
                    </h3>
                  </div>
                  {/* Connector line with arrow */}
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
                className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center border-8 border-blue-400 font-bold text-center text-blue-600 text-lg relative"
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
                  {/* Connector line with arrow */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
                    <div className="w-0 h-0 border-t-2 border-b-2 border-r-4 border-t-transparent border-b-transparent border-r-gray-400"></div>
                    <div className="h-0.5 bg-gray-300 w-12"></div>
                  </div>
                  {/* Step Card */}
                  <div className="bg-white rounded-full px-5 py-3 shadow-md flex items-center gap-3 relative z-10">
                    <div
                      className={`${step.color} w-10 h-10 rounded-full flex items-center justify-center`}
                    >
                      {step.icon}
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
      {/* Services Section */}
      <section ref={serviceSectionRef} className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our School & College ERP Services
        </h2>
        <ServiceExploreCards services={services} />
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-blue-900 text-lg mb-8">
            Let’s build a smart School & College ERP that streamlines operations, centralizes data, and improves academic & administrative efficiency.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
          >
            Contact Us
          </button>
        </div>
      </section>

       {/* technology section */}
           <div className="py-8 md:py-12 bg-white">
             <div className="max-w-7xl mx-auto px-4">
               {/* Main Section Heading */}
               <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-3">
                 Technologies We Use in School & College ERP Development
               </h2>
               <p className="mb-10 md:mb-10 text-center max-w-2xl mx-auto text-gray-600">
                 We implement modern and robust technologies to build scalable, secure, and high-performance ERP systems for schools and colleges, ensuring smooth academic and administrative operations.
               </p>
     
               {/* ===== Frontend Technologies ===== */}
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
                   {technologies.map((tech, index) => (
                     <SwiperSlide key={`frontend-${index}`}>
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
     
               {/* ===== Backend Technologies ===== */}
               <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-900 pl-3">
                 Backend Technologies
               </h3>
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
                     1024: { slidesPerView: 6 },
                   }}
                   modules={[Autoplay]}
                   className="py-2"
                 >
                   {technologiesRow.map((tech, index) => (
                     <SwiperSlide key={`backend-${index}`}>
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

      {/* all services section */}
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-inter">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-[#03286d] to-[#4859da] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive digital solutions to help your business
              thrive in the modern world
            </p>
          </motion.div>
          <ServiceCards />
        </div>
      </div>
    </>
  );
}
