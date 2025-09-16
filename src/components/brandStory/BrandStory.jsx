// src/components/brandStory/BrandStory.js (UPDATED & CORRECTED)

import React from "react";
import {
  FaCube,
  FaPencilRuler,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const services = [
  {
    icon: <FaCube size={24} className="text-blue-900" />,
    title: "Development",
    description: "Building robust, scalable, and secure digital products.",
  },
  {
    icon: <FaPencilRuler size={24} className="text-blue-900" />,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user-centered interfaces.",
  },
  {
    icon: <FaShieldAlt size={24} className="text-blue-900" />,
    title: "Guaranteed Fit",
    description:
      "We match you with solutions that truly align with your mission.",
  },
  {
    icon: <FaChartLine size={24} className="text-blue-900" />,
    title: "Partnership for Success",
    description: "We support your growth with ongoing insights and support.",
  },
];

const BrandStoryPage = () => {
  return (
    <div className="font-inter">
      {/* --- HERO SECTION --- */}
      {/* Step 1: Ek full-width wrapper div banayein jise background color milega */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-8 md:py-8 lg:py-0">
        {/* Step 2: 'container mx-auto' class ko andar waale div par apply karein */}
        <div className="container mx-auto">
          {/* Step 3: Responsive layout ke liye 'flex' aur breakpoints ka istemal karein */}
          <div className="flex flex-col lg:flex-row items-center justify-between lg:min-h-[420px]">
            {/* Left Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
            >
              <span className="text-sm uppercase tracking-wider font-semibold text-primary">
                Websites that tell your brand's story
              </span>
              <h2 className="text-h2 font-bold text-gray-900">
                Design-focused across every touchpoint or interaction
              </h2>
              <p className="text-p-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
                Everything we do has a solid design impact. We create
                human-centered enterprise software with the polished feel of the
                best consumer apps.
              </p>
              <Link to="/careers">
                <button className="bg-primary hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition duration-300 mt-6">
                  Join Our Team
                </button>
              </Link>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center"
            >
              <img
                src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
                alt="A professional team collaborating on a project"
                className="object-cover w-full max-w-lg rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      {/* Step 4: 'container mx-auto' yahan bhi apply karein taaki alignment aache se ho */}
      <section className="container py-8 px-6 md:px-20 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.15, ease: "easeOut" }}
            className="flex flex-col items-center transition-transform hover:scale-105"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sky-100 mb-4">
              {service.icon}
            </div>
            {/* ✅ use text-p-xl for title */}
            <h3 className="text-p-xl font-bold mb-2 text-gray-900">
              {service.title}
            </h3>
            {/* ✅ use text-p-lg for description */}
            <p className="text-p-lg text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default BrandStoryPage;
