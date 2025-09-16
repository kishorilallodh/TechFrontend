import React from "react";
import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import companyLogo from "../../../assets/TechDigi_Logo.png";
import signatureImg from "../../../assets/sign.png";
import stampImg from "../../../assets/seal.png";
import backgroundImg from "../../../assets/5opacity.jpg";
import img from "../../../assets/phone.jpg";
const ExperienceLetter = ({ data }) => {
  if (!data) return null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div
      className="relative w-full h-0 pb-[141.42%] shadow-lg"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 flex flex-col pt-2 lg:pt-5 pl-6 lg:pl-10 pb-12 font-sans text-gray-800 z-10">
        <header className="flex justify-between items-center  w-full pb-8 ">
          <div className="flex items-center -mt-2 lg:-mt-4">
            <img
              src={companyLogo}
              alt="TechDigi Logo"
              className="h-7 lg:h-14"
            />
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
        <p className="text-left  lg:mt-6 lg:mb-2 text-[0.9vh] lg:text-base font-medium">
          Date: {formatDate(data.issueDate)}
        </p>

        <main className="text-justify  leading-relaxed lg:mt-2 mt-2 lg:space-y-5 pr-4 lg:pr-8">
          <p className="font-medium text-[0.9vh] lg:text-base mb-2 ">To Whom It May Concern</p>

          <p className="text-[0.9vh] lg:text-base mb-2 ">
            This is to certify that Mrs./Mr. {data.recipientName} has worked in
            our organization for the past {data.duration}, and was designated as
            a<span> {data.position}</span> from {data.timePeriod}.{" "}
            {/* Combined timePeriod */}
          </p>

          <p className="text-[0.9vh] lg:text-base mb-2 ">
            During his/her tenure, we found him/her regular, honest, and
            diligent in his/her duties and responsibilities.
          </p>

          <p className="text-[0.9vh] lg:text-base mb-2 ">
            This also certifies that Mrs./Mr. {data.recipientName} has no
            liabilities towards the Company.
          </p>

          <p className="text-[0.9vh] lg:text-base mb-2 ">
            We wish him/her good luck in the future and thank him/her for
            his/her valuable contribution to our company.
          </p>

          <p className="text-[0.9vh] lg:text-base mb-2 ">Thanking you,</p>

          <p className="text-[0.9vh] lg:text-base">Yours faithfully,</p>
          <p className="text-[0.9vh] lg:text-base">HR Head</p>
        </main>

        <footer className="w-full mt-4">
          <div className="relative w-60 ">
            <img
              src={stampImg}
              alt="Official Stamp"
              className="absolute h-7 w-7 lg:h-16 lg:w-16 top-[-0.5rem] lg:top-[-1rem] left-9 lg:left-14 opacity-90"
            />
            <img src={signatureImg} alt="Signature" className="h-5 lg:h-10" />
            <p className=" text-[0.9vh] lg:text-base mt-6">Authorized Signatory</p>
          </div>
        </footer>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#003366] text-white text-center py-4 lg:py-8">
        <p className="text-[1vh] lg:text-lg -mt-2 lg:-mt-4">
          C-8 3rd Floor, Raisen Rd, Indrapuri, Bhopal, Madhya Pradesh 462022
        </p>
      </div>
    </div>
  );
};

export default ExperienceLetter;
