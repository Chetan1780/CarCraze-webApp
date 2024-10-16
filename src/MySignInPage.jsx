import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const MySignInPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-lg flex flex-col items-center p-10 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome Back</h2>
                <p className="text-center text-gray-600 mb-6">Please sign in to continue</p>
              

                    <SignIn
                        appearance={{
                            variables: {
                                colorPrimary: '#4a90e2',
                                colorText: '#333',
                            },
                        }}
                    />

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account?
                        <a href="/sign-up" className="text-blue-600 hover:underline"> Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MySignInPage;
