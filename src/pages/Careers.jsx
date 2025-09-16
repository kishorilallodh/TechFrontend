import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Target, TrendingUp, Heart, Shield, Globe, Award, Coffee, Zap, Star } from "lucide-react";
import { FaFileAlt, FaRulerCombined, FaCode, FaFlask, FaRocket } from "react-icons/fa";

// Step 1: Naye component ko import karein
import JobSection from "../components/jobSection/JobSection"; // ❗ Path ko check kar lein

const Career = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const companyValues = [
    { icon: <Target className="w-8 h-8" />, title: "Innovation First", description: "We embrace cutting-edge technologies and encourage creative problem-solving." },
    { icon: <Users className="w-8 h-8" />, title: "Team Collaboration", description: "We believe in the power of diverse teams working together towards common goals." },
    { icon: <TrendingUp className="w-8 h-8" />, title: "Continuous Growth", description: "We invest in our people and provide opportunities for professional development." },
    { icon: <Heart className="w-8 h-8" />, title: "Work-Life Balance", description: "We prioritize employee wellbeing and offer flexible work arrangements." },
  ];

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, title: "Comprehensive Health Coverage", description: "Medical, dental, and vision insurance for you and your family" },
    { icon: <Globe className="w-6 h-6" />, title: "Remote Work Options", description: "Flexible work arrangements with remote and hybrid options" },
    { icon: <Award className="w-6 h-6" />, title: "Professional Development", description: "Annual learning budget and conference attendance support" },
    { icon: <Coffee className="w-6 h-6" />, title: "Unlimited PTO", description: "Take the time you need to recharge and maintain work-life balance" },
    { icon: <Zap className="w-6 h-6" />, title: "Latest Technology", description: "State-of-the-art equipment and access to cutting-edge tools" },
    { icon: <Star className="w-6 h-6" />, title: "Equity Participation", description: "Stock options and profit-sharing opportunities" },
  ];

  const steps = [
    { label: "STEP 1", title: "Apply Online", icon: <FaFileAlt className="text-4xl" />, color: "bg-red-500" },
    { label: "STEP 2", title: "Initial Screening", icon: <FaRulerCombined className="text-4xl" />, color: "bg-orange-500" },
    { label: "STEP 3", title: "Technical Interview", icon: <FaCode className="text-4xl" />, color: "bg-green-500" },
    { label: "STEP 4", title: "Final Interview", icon: <FaFlask className="text-4xl" />, color: "bg-teal-500" },
    { label: "STEP 5", title: "Welcome To Team", icon: <FaRocket className="text-4xl" />, color: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen font-inter">
      {/* Hero Section */}
      <section className="pt-[5rem] pb-[2rem] bg-gradient-to-br from-blue50 via-white to-light relative overflow-hidden">
        <div className="relative container">
          <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-h1-fixed text-gray-900 font-bold">Join Our{" "}<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Team</span></h1>
            <p className="text-p-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Build the future of technology with us. We're looking for passionate individuals who want to make a meaningful impact in the world of software development.</p>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section id="culture" className="py-6 bg-white">
        <div className="container">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-h2 text-gray-900 font-bold ">Our{" "}<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Values</span></h2>
            <p className="text-p-xl text-gray-600 max-w-3xl mx-auto">We believe in creating an environment where innovation thrives and people grow</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div key={index} className="group transition duration-500 text-center space-y-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                <div className={` inline-flex p-4 rounded-xl bg-gray-100 text-blue-900 group-hover:bg-blue-900 group-hover:text-gray-100 mx-auto transition duration-500`}>{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-6 bg-gray-50">
        <div className="container">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-h2 text-gray-900 font-bold ">Why Work{" "}<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">With Us</span></h2>
            <p className="text-p-xl text-gray-600 max-w-3xl mx-auto">We offer competitive benefits and a supportive work environment</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 w-full md:w-[45%] lg:w-[30%] group" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -5 }}>
                <span className="absolute left-0 bottom-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full rounded-b-2xl"></span>
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg transition-all duration-500 group-hover:bg-primary"><div className="text-primary group-hover:text-white">{benefit.icon}</div></div>
                  <div><h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3><p className="text-gray-600">{benefit.description}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Interview Process */}
      <div className="flex items-center justify-center bg-gray-50 p-6 font-sans hidden md:block">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-foreground mb-1">Application{" "}<span className="bg-gradient-to-r from-[#03286d] to-[#4859da] bg-clip-text text-transparent">Process</span></h2>
            <p className="text-xl text-muted-foreground">Simple steps to join our team</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="relative flex items-center justify-center w-96 h-96 mx-auto">
              <div className="absolute w-56 h-56 bg-white rounded-full border-4 border-dotted border-gray-400 flex flex-col items-center justify-center shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">Interview</h2>
                <h3 className="text-2xl font-bold text-gray-800">Process</h3>
                <div className="flex mt-2"><span className="w-4 h-2 bg-red-500 rounded-full mx-1"></span><span className="w-4 h-2 bg-orange-500 rounded-full mx-1"></span><span className="w-4 h-2 bg-green-500 rounded-full mx-1"></span><span className="w-4 h-2 bg-teal-500 rounded-full mx-1"></span><span className="w-4 h-2 bg-indigo-500 rounded-full mx-1"></span></div>
              </div>
              {steps.map((step, index) => {
                const angle = index * 72 - 90;
                const radius = 180;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);
                return (
                  <div key={index} className="absolute flex items-center justify-center" style={{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`, left: "50%", top: "50%" }}>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-16 h-16 rounded-full text-white flex items-center justify-center ${step.color} shadow-md`}>{step.icon}</div>
                      <div className="text-center p-2 min-w-[140px]"><p className="font-bold text-gray-500 text-xs">{step.label}</p><p className="text-sm font-semibold text-gray-800">{step.title}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Naye component ko yahan render karein */}
      <JobSection />
    </div>
  );
};

export default Career;