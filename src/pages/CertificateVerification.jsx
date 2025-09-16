import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
  FiShield,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiX,
} from "react-icons/fi";
import certificateService from "../features/admin/certificate/certificateService";


const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  
  return new Date(dateString).toLocaleDateString("en-GB");
};

const CertificateVerification = () => {
  // Form input states
  const [name, setName] = useState("");
  const [certNumber, setCertNumber] = useState("");

  // Process states
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [verifiedData, setVerifiedData] = useState(null);
  const [error, setError] = useState("");

  // Naya state: Modal ki visibility ke liye
  const [isModalOpen, setIsModalOpen] = useState(false);


  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleVerification = async (e) => {
    e.preventDefault();
    setResult(null);
    setVerifiedData(null);
    setError("");

    if (!name.trim() || !certNumber.trim()) {
      setError("Please enter both name and certificate number.");
      return;
    }

    setIsLoading(true);

    // --- Simulate API call ---
    try {
      const data = await certificateService.verifyCertificate({
        nameOnCertificate: name.trim(),
        certificateNumber: certNumber.trim(),
      });
      // If successful, data will contain the certificate object
      setResult("valid");
      setVerifiedData(data);
    } catch (err) {
      // The service will throw an error for 404 or 500 status codes
      setResult("invalid");
      // Optional: You could display the error message from the backend
      // setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
      setIsModalOpen(true); // Open modal for both valid and invalid results
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gray-50 border-b flex items-center gap-4">
          <FiShield className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Certificate Verification
            </h1>
            <p className="text-gray-500">
              Verify the authenticity of a certificate issued by us.
            </p>
          </div>
        </div>

        {/* Verification Form (No changes here) */}
        <form onSubmit={handleVerification} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the name as it appears on the certificate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="certNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Certificate Number
            </label>
            <input
              type="text"
              id="certNumber"
              value={certNumber}
              onChange={(e) => setCertNumber(e.target.value)}
              placeholder="Enter the certificate number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  {" "}
                  <FiSearch /> Verify Certificate{" "}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Verification Result Modal */}
       {/* Verification Result Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
                        {result === "valid" && verifiedData && (
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <FiCheckCircle className="w-12 h-12 text-green-500 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Certificate Verified!</h3>
                                        <p className="text-gray-600">This certificate is authentic and valid.</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="ml-auto text-gray-500 hover:text-gray-800"><FiX /></button>
                                </div>
                                
                                {/* UPDATED: Displaying real data with correct field names */}
                                <div className="mt-4 pt-4 border-t text-sm space-y-3">
                                    {[
                                        ["Certificate No", verifiedData.certificateNumber],
                                        ["Name", verifiedData.nameOnCertificate],
                                        ["Course", verifiedData.courseName],
                                        ["Duration", verifiedData.duration],
                                        ["Start Date", formatDate(verifiedData.startDate)],
                                        ["Completion Date", formatDate(verifiedData.completionDate)],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4" >
                                            <span className="font-semibold text-gray-500">{label}:</span>
                                            <span className="text-gray-800 text-right">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {result === "invalid" && (
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <FiXCircle className="w-12 h-12 text-red-500 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Verification Failed</h3>
                                        <p className="text-gray-600">The details provided do not match our records. Please verify the information and try again.</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="ml-auto text-gray-500 hover:text-gray-800"><FiX /></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
    </div>
  );
};

export default CertificateVerification;
