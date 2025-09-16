import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FiDownload, FiFileText, FiLoader } from 'react-icons/fi';
import { FiInbox } from 'react-icons/fi';
// Import the Redux action and letter components
import { fetchUserLetters } from '../../../features/admin/letter/letterSlice';
import OfferLetter from '../components/OfferLetter';
import ExperienceLetter from '../components/ExperienceLetter';

const UserLettersPage = ({ icon }) => {
    const dispatch = useDispatch();
     const IconComponent = icon || FiInbox;
    const { letters, status } = useSelector((state) => state.letters);

    const [selectedLetter, setSelectedLetter] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const letterPreviewRef = useRef(null);

    // Fetch letters when the component mounts
    useEffect(() => {
        dispatch(fetchUserLetters());
    }, [dispatch]);
    
    // Set the first letter as selected by default when data loads
    useEffect(() => {
        if (!selectedLetter && letters.length > 0) {
            setSelectedLetter(letters[0]);
        }
    }, [letters, selectedLetter]);

    const handleDownload = () => {
        if (!letterPreviewRef.current) return;
        setIsDownloading(true);

        html2canvas(letterPreviewRef.current, { scale: 2, useCORS: true })
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4', true); // `true` for compression
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${selectedLetter.letterType}-Letter-${selectedLetter.letterNumber}.pdf`);
                setIsDownloading(false);
            }).catch(err => {
                console.error("Could not generate PDF", err);
                setIsDownloading(false);
            });
    };

    // Helper to render the correct letter component based on type
    const renderLetterComponent = () => {
        if (!selectedLetter) return null;
        
        switch (selectedLetter.letterType) {
            case 'Offer':
                return <OfferLetter data={selectedLetter} />;
            case 'Experience':
                return <ExperienceLetter data={selectedLetter} />;
            default:
                return <div>Unknown letter type</div>;
        }
    };

    // Skeleton for letter list items
    const LetterSkeletonItem = () => (
        <div className="w-full text-left p-4 rounded-lg bg-gray-100 animate-pulse flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-300 rounded"></div>
            <div className="flex-1">
                <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
        </div>
    );

    // Skeleton for letter preview header
    const LetterPreviewSkeleton = () => (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
    );

    if (status === 'loading') {
        return (
            <div className="p-4 bg-gray-100 min-h-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side: Skeleton List of Letters */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                        <div className="h-7 bg-gray-300 rounded w-1/3 mb-4"></div>
                        <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <LetterSkeletonItem key={index} />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Skeleton Letter Viewer */}
                    <div className="lg:col-span-2 space-y-6">
                        <LetterPreviewSkeleton />
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

    if (status === 'succeeded' && letters.length === 0) {
        return (
           <div className="p-4 md:p-6">
                 <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 h-full bg-white rounded-lg shadow-md">
      <div className="bg-gray-100 p-5 rounded-full mb-6">
        <IconComponent className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Letters Found</h3>
      <p className="text-gray-500 max-w-sm">You haven't received any offer or experience letters from the administration yet. When you do, they will appear here.</p>
    </div>
           </div>
        );
    }

    return (
        <div className="p-4 bg-gray-100 min-h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Side: List of Letters */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">My Letters</h2>
                    <div className="space-y-3">
                        {letters.map(letter => (
                            <button
                                key={letter._id}
                                onClick={() => setSelectedLetter(letter)}
                                className={`w-full text-left p-4 rounded-lg transition-all flex items-center gap-3 ${
                                    selectedLetter?._id === letter._id 
                                    ? 'bg-[#003366] text-white shadow-lg' 
                                    : 'bg-gray-100 hover:bg-indigo-100'
                                }`}
                            >
                                <FiFileText className="w-7 h-7 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">{letter.letterType} Letter</p>
                                    <p className="text-base ">Issued : {new Date(letter.createdAt).toLocaleDateString()}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Letter Viewer and Download Button */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedLetter && (
                        <>
                            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                                 <h2 className="text-xl font-bold text-gray-800">{selectedLetter.letterType} Letter</h2>
                                 <button 
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="flex items-center gap-2 bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                 >
                                    <FiDownload />
                                    {isDownloading ? 'Download...' : 'Download'}
                                 </button>
                            </div>

                            <div ref={letterPreviewRef}>
                                {renderLetterComponent()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserLettersPage;