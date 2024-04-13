import React from 'react';

const NotFound = () => {
    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100  sm:items-center pt-4">
            <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center pt-20 ">
                    <div className="px-4 text-lg text-gray-500 border-r  border-gray-400 tracking-wider">
                        404
                    </div>
                    <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                        Not Found
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
