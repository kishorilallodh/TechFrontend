import { motion } from 'framer-motion';
import { Building, Rocket, Award, Users, Target } from 'lucide-react';

const timeline = [
  { year: '2018', title: 'Company Foundation', description: 'Our journey began with a small team and a big vision.', icon: <Building size={28} /> },
  { year: '2019', title: 'First Major Product Launch', description: 'We launched our flagship product to widespread acclaim.', icon: <Rocket size={28} /> },
  { year: '2020', title: 'Secured Series A Funding', description: 'Received significant investment to scale our operations.', icon: <Award size={28} /> },
  { year: '2022', title: 'Reached 1 Million Users', description: 'Celebrating a growing community of happy customers.', icon: <Users size={28} /> },
  { year: '2024', title: 'Expanded Internationally', description: 'Launched our services in three new countries.', icon: <Target size={28} /> },
];

const cardVariants = (isLeft) => ({
  hidden: { opacity: 0, x: isLeft ? -120 : 120 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",      
      stiffness: 60,       
      damping: 15,         
      delay: 0.2 
    }
  },
});

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    } 
  },
};

const OurJourney = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-10" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-[#03286d] to-[#4859da] bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Key milestones in our company's growth
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line only for desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#03286d]/30 to-[#4859da]/30 rounded-full"></div>

          <div className="space-y-12 md:space-y-8">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row justify-center items-center w-full">
                  
                  {/* Left side card */}
                  <div className={`w-full md:w-1/2 flex ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start'}`}>
                    {isLeft && (
                      <motion.div
                        className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md border border-gray-200 transform hover:-translate-y-1 transition-transform duration-300
                                   before:hidden md:before:block
                                   before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-r before:border-t before:border-gray-200
                                   before:top-1/2 before:-translate-y-1/2 before:right-[-9px] before:rotate-45"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={cardVariants(isLeft)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold bg-gradient-to-r from-[#03286d] to-[#4859da] bg-clip-text text-transparent">{item.title}</h3>
                          <div className="bg-gradient-to-r from-[#03286d] to-[#4859da] text-white px-3 py-1 rounded-full text-sm font-semibold">{item.year}</div>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Center dot */}
                  <motion.div 
                    className="z-10 absolute left-1/1. -translate-x-1/2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={iconVariants}
                  >
                    <div className="bg-white w-5 h-5 rounded-full shadow-lg flex items-center justify-center border-4 border-[#4859da]">
                    </div>
                  </motion.div>

                  {/* Right side card */}
                  <div className={`w-full md:w-1/2 flex ${!isLeft ? 'md:justify-start md:pl-12' : 'md:justify-end'}`}>
                    {!isLeft && (
                      <motion.div
                        className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md border border-gray-200 transform hover:-translate-y-1 transition-transform duration-300
                                   before:hidden md:before:block
                                   before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:border-l before:border-b before:border-gray-200
                                   before:top-1/2 before:-translate-y-1/2 before:left-[-9px] before:rotate-45"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={cardVariants(isLeft)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold bg-gradient-to-r from-[#03286d] to-[#4859da] bg-clip-text text-transparent">{item.title}</h3>
                          <div className="bg-gradient-to-r from-[#03286d] to-[#4859da] text-white px-3 py-1 rounded-full text-sm font-semibold">{item.year}</div>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* For mobile: show center dot between cards */}
                  <motion.div 
                    className="z-10 flex md:hidden my-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={iconVariants}
                  >
                    <div className="mx-auto bg-white w-5 h-5 rounded-full shadow-lg flex items-center justify-center border-4 border-[#4859da]"></div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
