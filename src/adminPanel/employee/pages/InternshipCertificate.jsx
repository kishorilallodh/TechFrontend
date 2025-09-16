import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // highlight-start
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FiDownload, FiFileText } from "react-icons/fi";
import { FiInbox } from 'react-icons/fi';
// Import your certificate component
import InternshipCertificate from "../components/Certificate";
// Import the Redux action
import { fetchUserRequests } from "../../../features/admin/certificate/certificateSlice"; // highlight-end

const InternshipCertificateRequest = ({ icon }) => {
     const IconComponent = icon || FiInbox;
  // --- Redux State Management ---
  // highlight-start
  const dispatch = useDispatch();
  const { requests, status } = useSelector((state) => state.certificates);

  // Filter to get only approved certificates
  const approvedCertificates = requests.filter(
    (req) => req.status === "Approved"
  );
  // highlight-end

  // --- Component State ---
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  // --- Data Fetching Effect ---
  // highlight-start
  useEffect(() => {
    // Fetch the user's requests when the component mounts
    dispatch(fetchUserRequests());
  }, [dispatch]);
  // highlight-end

  // --- Effect to set the initial selected certificate ---
  // highlight-start
  useEffect(() => {
    // When approved certificates are loaded, select the first one by default
    if (!selectedCertificate && approvedCertificates.length > 0) {
      setSelectedCertificate(approvedCertificates[0]);
    }
  }, [approvedCertificates, selectedCertificate]);
  // highlight-end

  const handleDownload = () => {
    // ... (Your handleDownload function is perfect, no changes needed here)
    if (!certificateRef.current) return;
    setIsDownloading(true);

    html2canvas(certificateRef.current, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${selectedCertificate.certificateType.trim()}.pdf`);
        setIsDownloading(false);
      })
      .catch((err) => {
        console.error("Could not generate PDF", err);
        setIsDownloading(false);
      });
  };

  // Skeleton for certificate list items
  const CertificateSkeletonItem = () => (
    <div className="w-full text-left p-4 rounded-lg bg-gray-100 animate-pulse flex items-center gap-3">
      <div className="w-5 h-5 bg-gray-300 rounded"></div>
      <div className="flex-1">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  // Skeleton for certificate preview header
  const CertificatePreviewSkeleton = () => (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      <div className="h-10 bg-gray-300 rounded w-32"></div>
    </div>
  );

  // --- Render Logic ---
  // highlight-start
  if (status === "loading") {
    return (
      <div className="p-4 bg-gray-100 min-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Skeleton List of Certificates */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <div className="h-7 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <CertificateSkeletonItem key={index} />
              ))}
            </div>
          </div>

          {/* Right Side: Skeleton Certificate Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <CertificatePreviewSkeleton />
            <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "succeeded" && approvedCertificates.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 h-full bg-white rounded-lg shadow-md">
          <div className="bg-gray-100 p-5 rounded-full mb-6">
            <IconComponent className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
             No Certificates Found
          </h3>
          <p className="text-gray-500 max-w-sm">
            You haven’t received any certificates from the administration yet.
          Once available, they will appear here.
          </p>
        </div>
      </div> 
    );
  }
  // highlight-end
// p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen
  return (
    <div className="p-4  bg-gray-100 min-h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: List of Certificates */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            My Certificates
          </h2>
          <div className="space-y-3">
            {/* highlight-start */}
            {/* Map over the REAL approved certificates from Redux state */}
            {approvedCertificates.map((cert) => (
              <button
                key={cert._id} // Use the unique ID from the database
                onClick={() => setSelectedCertificate(cert)}
                className={`w-full text-left p-4 rounded-lg transition-all flex items-center gap-3 ${
                  selectedCertificate?._id === cert._id
                    ? "bg-blue-900 text-white shadow-lg"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
              >
                <FiFileText className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{cert.certificateType}</p>
                  <p className="text-xs">{cert.courseName}</p>
                </div>
              </button>
            ))}
            {/* highlight-end */}
          </div>
        </div>

        {/* Right Side: Certificate Viewer and Download Button */}
        <div className="lg:col-span-2 space-y-6">
          {selectedCertificate && ( // Only show preview if a certificate is selected
            <>
              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800">Certificate</h2>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <FiDownload />
                  {isDownloading ? "Download..." : "Download"}
                </button>
              </div>

              <div ref={certificateRef}>
                {/* Pass the selected certificate data to the component */}
                <InternshipCertificate request={selectedCertificate} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipCertificateRequest;