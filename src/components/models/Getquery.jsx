import { useEffect, useState } from "react";
import {
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOffice2Icon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { submitContactQuery } from "../../features/admin/queries/publicApiService";

const GetQuoteModal = ({ isOpen, onClose }) => {
  // Step 2: Form data ke liye state banayein
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  // Step 3: Input change ko handle karne ke liye function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // CHANGE 2: Jab user phone field mein type kare, to error hata dein
    if (name === "phone") {
      setPhoneError("");
    }
  };

  // Step 4: Form submit ko handle karne ke liye function
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/; // 10-digit Indian number validation
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return; // Agar invalid hai to form submit na karein
    }

    setIsSubmitting(true);
    try {
      const response = await submitContactQuery(formData);
      toast.success(response.message || "Request submitted successfully!");
      setSubmitted(true); // Success screen dikhayein
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false); // Modal khulne par hamesha form dikhayein
      setPhoneError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out scale-95 animate-fade-in-scale">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        {!submitted ? (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side */}
            <div className="p-8 bg-slate-50 hidden md:flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What Your Quote Includes:
              </h2>
              <ul className="space-y-3 text-gray-600">
                {[
                  "Detailed Cost Breakdown",
                  "Campaign Timeline Estimation",
                  "Access to Prime Locations",
                  "Dedicated Expert Support",
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-900 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Request a Quote
              </h2>
              <p className="text-gray-600 mb-6">
                Fill your details and we'll reply within 24 hours.
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <div className="relative">
                    <PhoneIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                      className={`w-full border rounded-lg p-3 pl-11 outline-none focus:ring-2 ${
                        phoneError
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-300 focus:ring-blue-900"
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-600 text-sm mt-1">{phoneError}</p>
                  )}
                </div>
                <div className="relative">
                  <BuildingOffice2Icon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company / Organization (Optional)"
                    className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div className="relative">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-400 absolute top-3.5 left-4" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your requirements..."
                    rows="3"
                    required
                    className="w-full border border-slate-300 rounded-lg p-3 pl-11 focus:ring-2 focus:ring-blue-900 outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#03286d] to-[#4859da] text-white py-3 rounded-lg font-semibold text-lg hover:-translate-y-0.5 transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
              <svg
                className="w-12 h-12 text-blue-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Quote Request Sent!
            </h2>
            <p className="text-gray-600">
              Our team will get back to you shortly. Thank you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuoteModal;
