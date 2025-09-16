import React, { Component } from 'react';

// Yeh humara fallback UI component hai jo error hone par dikhega.
const ErrorFallbackUI = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="mt-4 text-2xl font-bold text-gray-800">Oops! Something went wrong.</h1>
      <p className="mt-2 text-gray-600">
        We're sorry for the inconvenience. Our team has been notified of this issue.
        Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()} // Page ko refresh karne ka button
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Step 1: Jab bhi child component mein error aayega, yeh method call hoga.
  // Yeh state ko update karta hai taaki agle render mein fallback UI dikh sake.
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  // Step 2: Yeh method error catch hone ke baad call hota hai.
  // Yahan aap error ko kisi logging service (jaise Sentry, LogRocket) par bhej sakte hain.
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Example: Log to an external service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    // Agar state mein error hai, to fallback UI dikhayein.
    if (this.state.hasError) {
      return <ErrorFallbackUI />;
    }

    // Agar koi error nahi hai, to normal child components ko render karein.
    return this.props.children;
  }
}

export default ErrorBoundary;