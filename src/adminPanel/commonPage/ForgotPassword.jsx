import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendPasswordResetLink } from '../../features/auth/authSlice'; // ❗ Sahi path daalein
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Apni illustration image ko import karein
import illustration from '../../assets/forgot2.png'; // ❗ Yahan apni new image ka path daalein

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(sendPasswordResetLink(email)).unwrap()
            .then(response => {
                toast.success(response.message);
                setIsLoading(false);
                setEmail('');
            })
            .catch(err => {
                toast.error(err);
                setIsLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
                
                {/* Left Side - Illustration */}
                <div className="hidden md:flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
                    {/* Image ko bada karne ke liye 'max-w-md' use kiya hai */}
                    <motion.img 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        src={illustration} 
                        alt="Forgot Password Illustration" 
                        className="max-w-md w-full" 
                    />
                </div>

                {/* Right Side - Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-full max-w-sm mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Your Password?</h2>
                            <p className="text-gray-500 mb-8">No worries! Enter your email and we'll send you a reset link.</p>
                        
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="relative">
                                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        required
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isLoading} 
                                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-6">
                                <Link to="/login" className="text-sm text-gray-500 hover:text-blue-600 hover:underline">
                                    Back to sign in
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;