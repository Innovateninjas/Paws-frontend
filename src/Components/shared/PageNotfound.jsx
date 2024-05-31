import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row items-center max-w-2xl w-full text-center p-6 bg-white rounded-lg shadow-md">
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="/404.svg"
                        alt="404 Error"
                        className="w-full h-auto"
                    />
                </div>
                <div className="md:w-1/2 md:pl-6">
                    <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
                    <a
                        href="/"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
