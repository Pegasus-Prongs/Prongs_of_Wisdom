// pages/signin.js
'use client'
import React, { useEffect, useState } from "react";

import { useRouter } from 'next/navigation';

import { auth, googleProvider, db } from "@/lib/firebase";
import { adminDb } from '@/lib/firebase_admin'; // Import admin Firestore
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(""); // Reset any previous errors

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Reference to the user's document in Firestore
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            // Check if user data exists in Firestore
            if (!userDoc.exists()) {
                // User data from Google
                const userData = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                };

                // Save user data to Firestore
                await setDoc(userRef, userData);
                console.log("User signed in and data saved:", userData);
            } else {
                console.log("User already exists in Firestore:", userDoc.data());
            }
            router.push('/');
        } catch (error) {
            console.error("Error signing in:", error);
            setError("Failed to sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is already signed in:", user);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-96 p-24">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Welcome Back!</h1>
                <p className="mb-6 text-gray-600">Please sign in to your account</p>
                <button
                    className={`flex items-center justify-center bg-gradient-to-r from-blue-300 to-cyan-300 text-gray-800 px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    <FcGoogle className="h-6 w-6 mr-2" />
                    <span className="text-lg font-medium">{loading ? 'Signing In...' : 'Log In with Google'}</span>
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default SignIn;
