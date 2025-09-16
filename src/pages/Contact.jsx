import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { submitContactQuery } from "../features/admin/queries/publicApiService";

export default function ContactPage() {
  const location = useLocation();
  const [phoneError, setPhoneError] = useState("");

  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "phone") {
      setPhoneError("");
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number.");
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
      return; // Form submission ko rokein
    }

    setIsLoading(true);
    try {
      const response = await submitContactQuery(formData);
      toast.success(
        response.message || "Your message has been sent successfully!"
      );
      setFormData({ name: "", email: "", phone: "", company: "", message: "" }); // Form ko reset karein
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <section className="pt-[5rem] pb-[2rem] bg-gradient-to-br from-blue50 via-white to-light relative overflow-hidden">
        <div className="container relative">
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-h1-fixed text-gray-900 font-bold">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-p-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your next project? We'd love to hear from you.
              Let's discuss how we can help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-10 md:py-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-h3 text-gray-900">Contact Our Team</h2>
                <p className="mt-4 text-p-lg text-gray-600">
                  Have questions about our services or want to discuss a
                  project? Reach out to us using the information below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Address
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Sector C-8 3rd floor, Indrapuri,
                      <br /> Raisen Road, Bhopal
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">
                      +91 9479850503
                      <br />
                      Mon-Fri, 9am-5pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">
                      info@techdigi.com
                      <br />
                      support@techdigi.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                    <p className="mt-1 text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-h3 text-center text-gray-900 mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Email in one row */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className={`mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                      phoneError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {phoneError && (
                    <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter your message"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 pb-8">
        <div className="container h-96">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.2705937200886!2d77.464819!3d23.250426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c430a9ca2948b%3A0xaa66b8d00e4575c0!2sTechDigi%20Software%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1691876572829!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TechDigi Location"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
    </div>
  );
}
