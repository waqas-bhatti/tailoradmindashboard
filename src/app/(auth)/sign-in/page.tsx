"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false); // NEW STATE
  const { user, loading, login, googleLogin } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      setIsSubmitting(false);
      return;
    }

    if (!password || password.length < 5) {
      setError("Password must be at least 5 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsGoogleSubmitting(true);
    try {
      await googleLogin();
    } catch (err: any) {
      setError(err.message || "Google login failed. Please try again.");
      setIsGoogleSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/sewing-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center">
          <img
            src="/images/logo/t-icon.png"
            alt="Tailorix Logo"
            className="w-16 h-16 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">Welcome to Tailorix</h1>
          <p className="text-lg max-w-md mx-auto">
            Simplify your tailoring business with powerful tools for managing
            customers, orders, and more.
          </p>
        </div>
      </div>

      {/* Right side - Sign-in card */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-50 dark:bg-gray-900 p-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Sign in to Tailorix
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
            Enter your credentials to access your dashboard
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting || loading}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting || loading}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Google Login button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleSubmitting || loading}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full px-4 py-2 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition disabled:opacity-50"
            >
              {isGoogleSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Connecting...
                </div>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="#4285F4"
                      d="M488 261.8c0-17.7-1.5-35.6-4.7-52.8H249v99.9h134.3c-5.8 31.3-23.3 57.8-49.8 75.6v62.7h80.4c47-43.3 73.9-107.2 73.9-185.4z"
                    />
                    <path
                      fill="#34A853"
                      d="M249 492c67.6 0 124.4-22.4 165.9-60.8l-80.4-62.7c-22.4 15-51.2 23.8-85.5 23.8-65.7 0-121.3-44.4-141.2-104.1H25.7v65.6C67.2 439.6 152.8 492 249 492z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M107.8 288.2c-9.7-28.8-9.7-59.9 0-88.7V133.9H25.7c-19.6 39.2-30.7 83.3-30.7 130.5s11.1 91.3 30.7 130.5l82.1-65.6z"
                    />
                    <path
                      fill="#EA4335"
                      d="M249 97.2c35.8 0 67.8 12.3 93.1 36.4l69.6-69.6C373.4 24.1 316.6 0 249 0 152.8 0 67.2 52.4 25.7 133.9l82.1 65.6c19.9-59.7 75.5-104.1 141.2-104.1z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
