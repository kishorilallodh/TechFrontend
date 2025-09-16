import { motion } from "framer-motion";

export default function ServiceExploreCards({ services }) {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="group bg-white rounded-2xl shadow-lg overflow-hidden h-full 
             transform hover:-translate-y-2 transition-all duration-300 ease-in-out
             border-2 border-transparent hover:border-blue-900 cursor-pointer"
        >
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden">
            <img
               src={`${API_BASE_URL}${service.servicesOfferedImg}`}
              alt={service.title}
              className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out
                 group-hover:scale-110 group-hover:-translate-y-1"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              {service.title}
            </h3>
            <p className="text-slate-600 leading-relaxed line-clamp-3 flex-grow">
              {service.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}