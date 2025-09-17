import React from "react";
import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import companyLogo from "/images/TechDigi_Logo.png";
import signatureImg from "/images/sign.png";
import stampImg from "/images/seal.png";
import backgroundImg from "/images/5opacity.jpg";
import img from "/images/phone.jpg";
const OfferLetter = ({ data }) => {
  if (!data) return null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });


  return (
    // Main container with a fixed aspect ratio for A4-like appearance
    <div
                className="relative w-full h-0 pb-[141.42%] shadow-lg"
                style={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                }}
            >

      {/* Main content container with flex layout */}
      <div className="absolute inset-0 flex flex-col pt-2 lg:pt-5 pl-6 lg:pl-10 pb-12 font-sans text-gray-800 z-10">
        {/* Header: Same as the Experience Certificate */}
        <header className="flex justify-between items-center  w-full pb-8 ">
          <div className="flex items-center -mt-2 lg:-mt-4">
            <img src={companyLogo} alt="TechDigi Logo" className="h-7 lg:h-14" />
          </div>    
          <div className="text-gray-700   text-[8px] lg:-mt-2 lg:text-sm pr-1 lg:pr-2">
            {/* <p className="flex items-center gap-2">
              <span className="blue-emoji">📞</span>7223077806, 9479850593 
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#003366]" />{" "}
              info@techdigisoftware.com
            </p>
            <p className="flex items-center gap-2">
              <FaGlobe className="text-[#003366]" /> www.techdigisoftware.com
            </p> */}
            <img src={img} alt="" className="h-10 lg:h-20" />
          </div>
        </header>

        {/* Date */}
        {/* <p className="text-left  lg:mt-12 mb-2 text-[1.2vh] lg:text-base">
          Date: {formatDate(data.createdAt)} 
        </p> */}

        {/* Main Content: Changed to match the Offer Letter format */}
        <main className="text-justify  leading-relaxed lg:mt-12 mt-2 lg:space-y-2 pr-4 lg:pr-8">
          <p className="font-bold text-[0.9vh] lg:text-base">Subject: Offer Letter</p>

          <p className="text-[0.9vh] lg:text-base mt-[0.4vh] ">Dear {data.recipientName},</p>

          <p className="text-[0.9vh] lg:text-base mt-[0.4vh]">
            We are pleased to offer you the position of{" "}
            <span>{data.position}</span> at TechDigi Software Private
            Limited.
          </p>

          <p className="text-[0.9vh] lg:text-base mt-[0.4vh]">
            We congratulate you on your selection and welcome you to our
            organization. We are confident that your skills and talents will be
            a valuable addition to our team.
          </p>

          <p className="text-[0.9vh] lg:text-base mt-[0.4vh]">
            Your tentative joining date is{" "}
            <span>{formatDate(data.joiningDate)}</span>. At the time of
            joining, you are requested to bring the following documents:
          </p>

          <ol className=" list-inside pl-4 space-y-1 text-[0.9vh] lg:text-base mt-[0.4vh]">
            <li>1. One passport-size photograph.</li>
            <li>2. One photocopy of your Aadhar Card.</li>
          </ol>

          <p className="text-[0.9vh] lg:text-base mt-[0.4vh]">
            If you have any questions, please don't hesitate to contact us at
            our office number or via email.
          </p>

          <p className="text-[0.9vh] lg:text-base mt-[0.4vh]">
            We look forward to working with you and wish you a rewarding and
            successful career at TechDigi Software Private Limited.
          </p>

          <div className="text-[0.9vh] lg:text-base mt-[0.4vh]">
            <p>Thanks & Regards,</p>
            <p>Shiladitya Raj</p>
          </div>
        </main>

        {/* Footer/Signature Section: Updated based on the image */}
        <footer className="w-full pt-5  lg:pt-8">
          <div className="relative w-72">
            <img
              src={stampImg}
              alt="Official Stamp"
              className="absolute h-7 w-7 lg:h-16 lg:w-16 top-[-0.5rem] lg:top-[-1rem] left-9 lg:left-14 opacity-90"
            />
            <img src={signatureImg} alt="Signature" className="h-5 lg:h-10" />
            <p className="lg:pt-1 text-[0.9vh] lg:text-base">Director / Co-Founder</p>
            <p className="text-[0.9vh] lg:text-base">TechDigi Software Private Limited</p>
          </div>
        </footer>
      </div>

      {/* Bottom Address Bar: Same as the Experience Certificate */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#003366] text-white text-center py-4 lg:py-8">
        <p className="text-[1vh] lg:text-lg -mt-2 lg:-mt-4">
          C-8 3rd Floor, Raisen Rd, Indrapuri, Bhopal, Madhya Pradesh 462022
        </p>
      </div>
    </div>
  );
};

export default OfferLetter;
