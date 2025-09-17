import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { performPasswordReset } from '../../features/auth/authSlice'; // ❗ Sahi path daalein
import { CheckCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Apni illustration image ko import karein
import illustration from '/images/password2.png'; // ❗ Yahan apni new image ka path daalein

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { token } = useParams();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long.");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match.");
        }
        setIsLoading(true);
        dispatch(performPasswordReset({ token, password }))
            .unwrap()
            .then((response) => {
                toast.success(response.message || "Password reset successfully!");
                setIsSuccess(true);
            })
            .catch((err) => {
                toast.error(err);
            })
            .finally(() => {
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
                    <motion.img 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        src={illustration} 
                        alt="Reset Password Illustration" 
                        className="max-w-md w-full" 
                    />
                </div>

                {/* Right Side - Form/Success Message */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-full max-w-sm mx-auto">
                        
                        {isSuccess ? (
                            // Success View
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-gray-800">Password Reset!</h2>
                                <p className="text-gray-500 mt-3">Your password has been changed successfully. You can now log in with your new credentials.</p>
                                <Link to="/login">
                                    <button className="mt-8 w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                        Proceed to Login
                                    </button>
                                </Link>
                            </motion.div>
                        ) : (
                            // Form View
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Set a New Password</h2>
                                <p className="text-gray-500 mb-8">Please enter and confirm your new password below.</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="relative">
                                        <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="New Password"
                                            required
                                            className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
                                            {showPassword ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm New Password"
                                            required
                                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={isLoading} 
                                        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                <span>Resetting...</span>
                                            </>
                                        ) : (
                                            'Set New Password'
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;