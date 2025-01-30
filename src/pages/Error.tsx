import React from 'react';
import { Link } from 'react-router';

const Error: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-8 text-center mx-3">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                Go Home
            </Link>
        </div>
    );
};

export default Error;