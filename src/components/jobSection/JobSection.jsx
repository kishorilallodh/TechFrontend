import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Send,
  CheckCircle,
  Upload,
  X,
  Briefcase,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { MdCurrencyRupee } from "react-icons/md";
// API service functions ko import karein
import {
  getActiveJobs,
  submitApplication,
} from "../../features/admin/jobs/publicApiService"; // ❗ Sahi path daalein

const JobSection = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [jobOpenings, setJobOpenings] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const data = await getActiveJobs();
        setJobOpenings(data);
      } catch (err) {
        setError("Could not fetch job openings at the moment.");
        console.error("Failed to fetch jobs:", err);
      } finally {
        setIsLoadingJobs(false);
      }
    };
    fetchJobsData();
  }, []);

  const handleInputChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        setErrors({ ...errors, resume: "File size must be less than 5MB" });
        e.target.value = null; // reset file input
        setApplicationData({ ...applicationData, resume: null });
        return;
      }
      setErrors({ ...errors, resume: "" });
      setApplicationData({ ...applicationData, resume: file });
    }
  };

  // phone validation function
  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(applicationData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      setErrors({ phone: "Please enter a valid 10-digit phone number." });
      return;
    } else {
      setErrors({});
    }

    setIsSubmitting(true);

    const formData = new FormData();
    Object.keys(applicationData).forEach((key) => {
      formData.append(key, applicationData[key]);
    });

    try {
      const response = await submitApplication(formData);
      toast.success(response.message);
      setApplicationData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        portfolio: "",
        coverLetter: "",
        resume: null,
      });
      document.getElementById("resume-upload").value = null;
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Job Openings */}
      <section id="openings" className="py-6 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 text-gray-900 font-bold ">
              Open{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Positions
              </span>
            </h2>
            <p className="text-p-xl text-gray-600 max-w-3xl mx-auto">
              Find your next career opportunity with us
            </p>
          </motion.div>

          {isLoadingJobs && (
            <div className="text-center py-10">Loading job openings...</div>
          )}
          {error && (
            <div className="text-center py-10 text-red-500">{error}</div>
          )}
          {!isLoadingJobs && !error && jobOpenings.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="font-semibold">No open positions at the moment.</p>
              <p className="text-sm">Please check back later!</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedJob(job)}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {job.department}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MdCurrencyRupee className="w-4 h-4" />
                      <span>{job.salaryLPA}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gradient-to-r from-[#03286d] to-[#4859da] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-center">
                    View Details & Apply
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Job Detail Modal (Poora Code) */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedJob.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{selectedJob.salaryLPA}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedJob.type}</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Job Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-[#48C9DA] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setApplicationData({
                      ...applicationData,
                      position: selectedJob.title,
                    });
                    setSelectedJob(null);
                    document
                      .getElementById("application-form")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-[#48C9DA] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Apply for this Position
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ✅ Application Form (Poora Code) */}
      <section id="application-form" className="py-8 bg-gray-50">
        <div className="container max-w-4xl">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 text-gray-900 font-bold ">
              Apply{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Today
              </span>
            </h2>
            <p className="text-p-xl text-gray-600">
              Ready to join our team? Submit your application below
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position Applying For *
                  </label>
                  <select
                    name="position"
                    value={applicationData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select a position</option>
                    {jobOpenings.map((job) => (
                      <option key={job._id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={applicationData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={applicationData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://your-portfolio.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {applicationData.resume
                        ? applicationData.resume.name
                        : "Click to upload your resume"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      PDF, DOC, or DOCX (max 5MB)
                    </p>
                  </label>
                </div>
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-2">{errors.resume}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us why you're interested in this position..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#03286d] to-[#4859da] text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default JobSection;
