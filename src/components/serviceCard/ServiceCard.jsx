// components/ServiceCards.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../features/admin/service/serviceApi"; // <-- adjust path as per your project

const ServiceCard = ({ pageType = "home" }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: services, loading } = useSelector((state) => state.services);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    // 🔑 **यह कंडीशन जोड़ें**
    // अगर सर्विसेज की लिस्ट पहले से मौजूद नहीं है, तभी fetch करें।
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length])

  // Logic for which cards to show
  let visibleServices = services || [];
  if (pageType === "home") {
    visibleServices = visibleServices.slice(0, 6);
  } else if (pageType === "services" && !showAll) {
    visibleServices = visibleServices.slice(0, 6);
  }

  const renderCard = (service) => (
    <motion.div
      key={service._id}
      className="relative w-full max-w-sm group cursor-pointer mb-8"
      onMouseEnter={() => setHoveredCard(service._id)}
      onMouseLeave={() => setHoveredCard(null)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      style={{ height: "fit-content" }}
      onClick={() => navigate(`/service/${service.slug}`)} // 🔑 using slug
    >
      <div className="h-60 relative overflow-hidden rounded-lg">
        <motion.img
          src={`${API_BASE_URL}${service.cardImage}`} // 🔑 service image from backend
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: hoveredCard === service._id ? 0.7 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-black to-transparent"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: hoveredCard === service._id ? "100%" : 0,
            opacity: hoveredCard === service._id ? 0.6 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <motion.div
        className="relative w-[85%] bg-white left-0 right-0 mx-auto p-3 rounded-b-2xl text-center z-10 overflow-hidden mt-[-40px]"
        initial={{ y: 0 }}
        animate={{ y: hoveredCard === service._id ? -5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-[#03286d] z-0"
          initial={{ y: "100%" }}
          animate={{ y: hoveredCard === service._id ? "0%" : "100%" }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
          <h3
            className={`text-xl font-semibold mb-1 transition-colors duration-300 ${
              hoveredCard === service._id ? "text-white" : "text-gray-800"
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`text-sm transition-colors duration-300 mb-1 ${
              hoveredCard === service._id ? "text-blue-100" : "text-gray-600"
            }`}
          >
            {service.description}
          </p>
          <motion.button
            className={`mt-2 px-4 py-2 rounded text-sm font-medium transition-colors duration-300 ${
              hoveredCard === service._id
                ? "bg-white text-[#03286d] hover:bg-blue-50"
                : "bg-[#03286d] text-white hover:bg-[#4859da]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation(); // button click par parent card trigger na ho
              navigate(`/service/${service.slug}`);
            }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div id="services" className="px-4 text-center">
      {loading ? (
        <p className="text-gray-600">Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {visibleServices.map((service) => renderCard(service))}
        </div>
      )}

      {/* Buttons */}
      {pageType === "home" && (
        <button
          onClick={() => navigate("/service")}
          className="mt-4 px-6 py-2 bg-[#03286d] text-white rounded-lg hover:bg-[#061055] transition"
        >
          View All Services
        </button>
      )}

      {pageType === "services" && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 px-6 py-2 bg-[#03286d] text-white rounded-lg hover:bg-[#4859da] transition"
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      )}
    </div>
  );
};

export default ServiceCard;