import React from 'react';
import companyLogo from '../../../assets/TechDigi_Logo.png';
import signatureImg from '../../../assets/sign.png';
import stampImg from '../../../assets/seal.png';
import certificateBg from "../../../assets/internshipC.png";

const Certificate = ({ request }) => {
    if (!request) return null;

    // highlight-start
    // Helper function to format dates nicely
    const formatDate = (dateString) => {
        if (!dateString) return '';
        // 'en-GB' locale provides the DD/MM/YYYY format by default.
        return new Date(dateString).toLocaleDateString('en-GB'); 
    };
    // highlight-end

    return (
        <div
            className="relative w-full h-0 pb-[141.42%] shadow-lg"
            style={{
                backgroundImage: `url(${certificateBg})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-5 flex flex-col pb-20 font-poppins text-center">
            
                <header className="flex justify-end w-full -mt-2 lg:mt-0 pr-0 lg:pr-4">
                    <img src={companyLogo} alt="TechDigi Logo" className="h-6 lg:h-12" />
                </header>
            
                <main className="flex-grow flex flex-col items-center justify-center pt-16 lg:pt-36">
                    <h1 className="text-4xl lg:text-7xl font-bold text-[#036772] tracking-wider">CERTIFICATE</h1>
                    <p className="text-lg lg:text-3xl tracking-[0.1em] lg:tracking-[0.2em] mt-0 lg:mt-4 mb-10">Of {request.certificateType.toUpperCase()}</p>

                    <p className="text-[9px] lg:text-lg font-semibold text-black -mt-4 lg:mt-2">This Certificate is Presented To :</p>
                    <p className="font-dancing text-2xl lg:text-5xl text-[#028492] mt-5 lg:mt-12 mb-12">{request.nameOnCertificate}</p>

                    <p className="text-black leading-relaxed text-[8px] lg:text-[16px] max-w-sm -mt-7 lg:mt-0 lg:max-w-3xl">
                        This is to certify that He/She successfully completed his/her <br />
                        {/* highlight-start */}
                        {/* Use `duration` from the database instead of `time` */}
                        <strong className="text-black text-[8px] lg:text-[16px]">{request.duration} internship Training on {request.courseName}</strong>.
                        {/* highlight-end */}
                        <br />
                        We wish you good luck in your future endeavors.
                    </p>
                </main>
            
                <footer className="w-full mt-auto pl-10 pr-6 pt-6 lg:pl-16 lg:pr-16 lg:pt-[5rem]">
                    <div className="flex justify-between items-center -ml-5 lg:ml-0 ">
                        <div className="text-center relative pt-3 lg:pt-6">
                            <img src={stampImg} alt="Official Stamp" className="h-8 w-8 lg:h-[60px] lg:w-16 absolute bottom-[30px] lg:bottom-[4rem] left-3 lg:left-10 opacity-100 ml-4" />
                            <img src={signatureImg} alt="Signature" className="h-4 absolute bottom-[23px] left-10 lg:left-20 lg:bottom-[3rem] lg:mt-0 lg:h-8 mx-auto" />
                            <div className="border-t-[1px] lg:border-t-2 border-black text-[7px] lg:text-sm w-24 lg:w-52 pt-0 lg:pt-1">
                                <p className="font-semibold ">SHILADITYA RAJ</p>
                                <p className=" tracking-wide">DIRECTOR</p>
                            </div>
                        </div>
                        <div className="text-center mt-5 lg:-mt-8 ">
                            <div className=" mb-7 lg:mb-0">
                                {/* highlight-start */}
                                {/* Use formatted dates and `completionDate` from the database */}
                                <p className="font-semibold  text-[7px] lg:text-sm pb-1   lg:pb-[0.1rem]">{formatDate(request.startDate)} TO {formatDate(request.completionDate)}</p>
                                {/* highlight-end */}
                                {/* <div className="border-t-[1px] lg:border-t-2 border-black  w-30 lg:w-52"></div> */}
                                <p className="text-[8px]  border-t-[1px] lg:border-t-2 border-black lg:text-sm tracking-widest mt-0 lg:mt-1">DATE</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-left h-12 mt-12"></div>
                </footer>
            </div>
            <div className="absolute bottom-1 lg:bottom-2 left-2 lg:left-4 text-left mt-12">
                <p className="text-[6px] lg:text-xs font-semibold">Certificate Number : {request.certificateNumber}</p>
                <p className=" text-[6px] -mb-3 lg:mb-0 lg:text-xs font-semibold">Certificate Verification Link :</p>
                <a
                  href="https://www.sakshamdigitaltechnology.com/certificate"
                  className="text-[6px] lg:text-xs text-blue-600 underline"
                >
                  https://www.sakshamdigitaltechnology.com/certificate
                </a>
            </div>
        </div>
    );
};

export default Certificate;