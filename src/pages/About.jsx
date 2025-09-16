import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaHandshake,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import OurJourney from "../components/ourJourney/OurJourney";
import { motion } from "framer-motion";
import RajSir from "../assets/RajSir.jpg";
import DeepikaMam from "../assets/DeepikaMam.jpg";
import kartikSir from "../assets/kartikSir.jpg";
import VirajSir from "../assets/VirajSir.jpg";

export default function AboutPage() {
  const location = useLocation();

  // ✅ Scroll to top on page load / route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const teamMembers = [
    {
      name: "Deepika Dadore",
      role: "CEO & Founder",
      image: DeepikaMam,
      bio: "Visionary leader with 15+ years in tech industry",
      socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Mr. Shiladitya Raj",
      role: "Managing Director",
      image: RajSir,
      bio: "Technology expert specializing in scalable architectures",
      socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Kartik Maliviya",
      role: "Full Stack Developer",
      image: kartikSir,
      bio: "Full-stack developer with passion for clean code",
      socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      name: "Viraj Sharma",
      role: "UX Designer",
      image: VirajSir,
      bio: "Creative designer focused on user-centered experiences",
      socials: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#" },
    },
  ];

  const approachItems = [
    {
      title: "Collaborative Development",
      description:
        "We work closely with clients through regular communication and feedback loops to ensure projects align perfectly with their vision.",
      icon: FaHandshake,
    },
    {
      title: "Agile Methodologies",
      description:
        "We employ Scrum and Kanban to facilitate communication, transparency, and efficient workflow throughout development.",
      icon: FaProjectDiagram,
    },
    {
      title: "Result-Oriented",
      description:
        "Our focus is always on delivering measurable business results through technology solutions that drive growth.",
      icon: FaChartLine,
    },
  ];

  const values = [
    {
      name: "Innovation",
      description:
        "We constantly push boundaries to deliver cutting-edge solutions that give our clients a competitive edge.",
      icon: FaLightbulb,
    },
    {
      name: "Integrity",
      description:
        "We build trust through transparency, honesty, and ethical business practices in all our engagements.",
      icon: FaHandshake,
    },
    {
      name: "Excellence",
      description:
        "We're committed to delivering the highest quality solutions with attention to detail and technical perfection.",
      icon: FaChartLine,
    },
    {
      name: "Collaboration",
      description:
        "We believe the best results come from working closely with our clients as partners in success.",
      icon: FaUsers,
    },
    {
      name: "Agility",
      description:
        "We adapt quickly to changing requirements and market conditions to keep projects on track.",
      icon: FaProjectDiagram,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Hero Section */}
      <section className="pt-[5rem] pb-[2rem] bg-gradient-to-br from-blue50 via-white to-light relative overflow-hidden">
        <div className="relative container">
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* ✅ h1-fixed use */}
            <h1 className="text-h1-fixed text-gray-900 font-bold">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TechDigi
              </span>
            </h1>
            <p className="text-p-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are a passionate team of developers, designers, and digital
              strategists dedicated to transforming businesses through
              innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <div className="py-10 bg-gray-50">
        <div className="container">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-h2 text-gray-900">Who We Are</h2>
              <div className="mt-2 text-gray-600 space-y-6 text-justify">
                <p className="text-p-sm ">
                  TechDigi Software Pvt. Ltd. specializes in designing,
                  developing, and maintaining digital platforms for companies.
                  Our team of skilled software engineers, developers, designers,
                  and digital marketers work together to meet our clients'
                  unique development and marketing needs.
                </p>
                <p className="text-p-sm">
                  We offer a wide range of services, including web application
                  development, mobile app development, enterprise software
                  solutions, e-commerce platforms, digital marketing, and more.
                  Our expertise enables organizations to leverage technology
                  effectively, enhance operations, and achieve strategic goals.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="TechDigi team working"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Approach */}
      <div className="py-8 bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-h2 font-extrabold text-gray-900">
              Our Approach
            </h2>
            <p className="mt-4 max-w-2xl text-p-lg text-gray-600 mx-auto">
              How we deliver exceptional results for our clients
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {approachItems.map((item) => (
                <div
                  key={item.title}
                  className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 group hover:shadow-lg"
                >
                  {" "}
                  {/* Animated bottom border */}{" "}
                  <span className="absolute left-0 bottom-0 h-1 w-0 bg-blue-900 transition-all duration-500 group-hover:w-full rounded-b-lg"></span>{" "}
                  <div className="p-6">
                    {" "}
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-900 transition-all duration-500 group-hover:bg-blue-900 group-hover:text-white">
                      {" "}
                      <item.icon className="h-6 w-6" />{" "}
                    </div>{" "}
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {" "}
                      {item.title}{" "}
                    </h3>{" "}
                    <p className="mt-2 text-base text-gray-600">
                      {" "}
                      {item.description}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h2 className="text-base text-center text-primary font-semibold tracking-wide uppercase">
              Values
            </h2>
            <p className="mt-2 text-h2 font-extrabold text-gray-900">
              What We Believe In
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {values.map((value) => (
                <div key={value.name} className="group relative">
                  <dt>
                    <div className="group absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white transition-all duration-300 cursor-pointer group-hover:bg-blue-200 group-hover:text-primary">
                      <value.icon className="h-6 w-6" />
                    </div>

                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {value.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-600">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Our Journey */}
     <div className="hidden md:block">
       <OurJourney />
     </div>

      {/* Meet Our Team Section */}
      <div className="py-10 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-h2 font-bold text-gray-900 mb-1">Our Team</h2>
            <p className="text-p-lg text-gray-600">
              Building solutions that make life simpler and smarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {" "}
            {teamMembers.map((member, index) => (
              <div key={index}>
                {" "}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover"
                />{" "}
                <h3 className="text-xl font-bold text-gray-900">
                  {" "}
                  {member.name}{" "}
                </h3>{" "}
                <p className="text-blue-900 font-medium mb-4">{member.role}</p>{" "}
                <p className="text-gray-600 text-sm mb-6">{member.bio}</p>{" "}
                <div className="flex justify-center space-x-4">
                  {" "}
                  <a href={member.socials.facebook}>
                    {" "}
                    <FaFacebookF className="text-gray-600 hover:text-indigo-600" />{" "}
                  </a>{" "}
                  <a href={member.socials.twitter}>
                    {" "}
                    <FaTwitter className="text-gray-600 hover:text-indigo-600" />{" "}
                  </a>{" "}
                  <a href={member.socials.instagram}>
                    {" "}
                    <FaInstagram className="text-gray-600 hover:text-indigo-600" />{" "}
                  </a>{" "}
                  <a href={member.socials.linkedin}>
                    {" "}
                    <FaLinkedinIn className="text-gray-600 hover:text-indigo-600" />{" "}
                  </a>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
