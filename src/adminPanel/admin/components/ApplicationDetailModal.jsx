import React from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiLink,
  FiFileText,
  FiAward,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

// Ek chhota helper component details ko neatly dikhane ke liye
const DetailItem = ({ icon, label, value, isLink = false }) => {
  if (!value) return null; // Agar value nahi hai to kuch na dikhayein

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 flex items-center mb-1">
        {icon}
        <span className="ml-2">{label}</span>
      </h3>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-words"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-800 break-words">{value}</p>
      )}
    </div>
  );
};

const ApplicationDetailModal = ({ isOpen, onClose, application, onStatusChange }) => {
  if (!isOpen || !application) return null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Resume ka full URL banayein
  const resumeUrl = `${API_BASE_URL}${application.resume}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
            <p className="text-gray-500">{application.position}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem icon={<FiMail />} label="Email" value={application.email} />
            <DetailItem icon={<FiPhone />} label="Phone" value={application.phone} />
            <DetailItem icon={<FiAward />} label="Experience" value={`${application.experience} years`} />
            <DetailItem icon={<FiLink />} label="Portfolio" value={application.portfolio} isLink={true} />
          </div>
          <DetailItem icon={<FiFileText />} label="Cover Letter" value={application.coverLetter} />
           <div>
              <h3 className="text-sm font-semibold text-gray-500 flex items-center mb-1">
                <FiBriefcase />
                <span className="ml-2">Resume</span>
              </h3>
               <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#03286d] rounded-md hover:bg-blue-700"
              >
                Download Resume
              </a>
           </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end p-6 space-x-3 border-t border-gray-200 rounded-b">
          <button
            onClick={() => onStatusChange(application._id, "Rejected")}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            <FiXCircle className="mr-2" />
            Reject
          </button>
          <button
            onClick={() => onStatusChange(application._id, "Shortlisted")}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            <FiCheckCircle className="mr-2" />
            Shortlist (Accept)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;