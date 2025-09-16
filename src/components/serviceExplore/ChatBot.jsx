import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ServiceExploreCards from "../serviceCard/ServiceExploreCard";
import ServiceCards from "../serviceCard/ServiceCard";
import { motion } from "framer-motion";
import { SiZapier, SiPiped, SiZoho } from "react-icons/si";
import {
  FaMailchimp,
  FaHubspot,
  FaSalesforce,
  FaGoogle,
  FaSlack,
} from "react-icons/fa";

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
import Lottie from "lottie-react";
import heroAnimation from "../../lotties/ChatBot.json";

const stepsLeft = [
  {
    title: "Requirement Gathering & Planning",
    color: "bg-slate-400",
    icon: <FaLightbulb className="text-white text-lg" />,
  },
  {
    title: "Use Case & Audience Analysis",
    color: "bg-orange-400",
    icon: <FaChartLine className="text-white text-lg" />,
  },
  {
    title: "Define Features & Objectives",
    color: "bg-teal-400",
    icon: <FaBullseye className="text-white text-lg" />,
  },
  {
    title: "Conversation Flow Design",
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
    title: "Chatbot Development & Integration",
    color: "bg-sky-400",
    icon: <FaCode className="text-white text-lg" />,
  },
  {
    title: "Testing, NLP & Security",
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
    title: "Custom AI Chatbots",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Tailored AI chatbot solutions designed to handle customer queries, support, and engagement effectively.",
  },
  {
    title: "Cloud-Based Chatbots",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    description:
      "Scalable, cloud-hosted chatbots accessible anytime, enabling real-time customer interaction across devices.",
  },
  {
    title: "Third-Party Integrations",
    img: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
    description:
      "Seamless integration with CRM, websites, apps, and messaging platforms like WhatsApp, Slack, and Facebook.",
  },
  {
    title: "Workflow Automation",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Automate repetitive tasks such as FAQs, lead generation, and appointment booking to improve efficiency.",
  },
  {
    title: "AI-Powered Analytics",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Track user interactions, customer satisfaction, and performance metrics with advanced AI-driven insights.",
  },
  {
    title: "Maintenance & Support",
    img: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg",
    description:
      "Ongoing updates, NLP model training, and technical support to keep your chatbot optimized and effective.",
  },
];


const technologies = [
  { name: "Salesforce", icon: FaSalesforce, color: "text-blue-500" },
  { name: "HubSpot CRM", icon: FaHubspot, color: "text-orange-500" },
  { name: "Zoho CRM", icon: SiZoho, color: "text-blue-900" },
  { name: "Pipedrive", icon: SiPiped, color: "text-red-600" },
];
const technologiesRow = [
  { name: "Slack", icon: FaSlack, color: "text-red-500" },
  { name: "Zapier", icon: SiZapier, color: "text-orange-500" },
  { name: "Mailchimp", icon: FaMailchimp, color: "text-yellow-600" },
  { name: "Google Workspace", icon: FaGoogle, color: "text-blue-500" },
];

export default function ChatBot() {
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
            

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
             AI ChatBot{" "}
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03286d] to-[#4859da]">
                Development
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0">
              AI Chatbot automates conversations, answers queries, and provides personalized support using NLP and machine learning, improving customer engagement and efficiency.
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
    Automated Conversations
  </div>
  <div className="flex items-center">
    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
    Instant Query Resolution
  </div>
  <div className="flex items-center">
    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
    Personalized Responses
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
            Our AI ChatBot Development Strategy
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
          Our AI ChatBot Development Services
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
           Let’s build an intelligent AI Chatbot that enhances customer engagement, provides instant support, and boosts business efficiency.
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
            CRM Platforms We Rely On
          </h2>
          <p className="mb-10 md:mb-10 text-center max-w-2xl mx-auto text-gray-600">
            From lead tracking to customer engagement and retention, our CRM
            solutions are built on modern platforms for seamless management and
            automation.
          </p>

          {/* ===== Frontend Technologies ===== */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-900 pl-3">
            Core CRM Tools
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
            {technologies.map((tech, index) => (
              <div
                key={`frontend-${index}`}
                className="flex flex-col items-center p-4  rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <tech.icon
                  className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 ${tech.color}`}
                />
                <h3 className="mt-2 text-xs md:text-sm font-medium text-gray-900 text-center">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>

          {/* ===== Backend Technologies ===== */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-900 pl-3">
            Supporting Tools & Integrations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologiesRow.map((tech, index) => (
              <div
                key={`backend-${index}`}
                className="flex flex-col items-center p-4  rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <tech.icon
                  className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 ${tech.color}`}
                />
                <h3 className="mt-2 text-xs md:text-sm font-medium text-gray-900 text-center">
                  {tech.name}
                </h3>
              </div>
            ))}
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
