'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer/Footer';

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Prevent multiple redirects
    if (!loading && user && !isRedirecting) {
      console.log('User authenticated on home page, redirecting to dashboard');
      setIsRedirecting(true);

      router.push('/dashboard');
      router.refresh();
      // Add small delay to prevent layout flash
      // const timer = setTimeout(() => {
      //    // Force refresh to ensure proper hydration
      // }, 100);
      
      // return () => clearTimeout(timer);
    }
  }, [user, loading, router, isRedirecting]);

  // Show redirecting state
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Only render the home page if user is not authenticated
  if (user) {
    return null; // Will be caught by the redirecting state above
  }
  return (
     <div className="bg-white text-gray-800">

      {/* Navbar */}
<header className="fixed top-0 w-full bg-white/90 backdrop-blur shadow z-50 transition-all duration-300">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <img
        src="/images/logo/t-icon.png"
        alt="Tailorix Logo"
        className="w-8 h-8"
      />
      <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">Tailorix</h1>
    </div>

    {/* Desktop Nav */}
    <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
      <a href="#taiorix" className="hover:text-indigo-600 transition-colors">Why Tailorix</a>
      <a href="#feature" className="hover:text-indigo-600 transition-colors">Features</a>
      <a href="#services" className="hover:text-indigo-600 transition-colors">Services</a>
      <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
      <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
    </nav>

    {/* Actions */}
    <div className="hidden md:flex items-center space-x-4">
      <a
        href="#demo"
        className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
      >
        Dashboard Demo
            </a>
              <Link
                href="/sign-in"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition transform hover:scale-105"
              >
                Login
              </Link>
    </div>

    {/* Mobile Menu Button */}
    <button className="md:hidden text-gray-700 hover:text-indigo-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</header>
{/* Hero */}
      
      <section className="pt-32 pb-20 bg-gray-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Modern Tailor Management Dashboard
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Simplify your tailoring business with powerful tools for managing
              customers, orders, measurements, and payments — all in one place.
            </p>
            
            <a
              href="#pricing"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWRtaW4lMjBkYXNoYm9hcmR8ZW58MHx8MHx8fDA%3D"
            alt="Tailor dashboard preview"
            className="rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          />
        </div>
      </section>

      {/* About */}
      <section id="feature" className="py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1663040605717-0f78fcff60be?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Tailoring tools"
            className="rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          />
          <div className="animate-slide-up">
            <h3 className="text-3xl font-bold mb-6">Feature Tailorix</h3>
            <p className="mb-6 text-gray-600">
              Tailorix Admin Dashboard is built specifically for tailoring businesses. We help
              you save time, improve efficiency, and provide a better experience
              for your clients.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>✅ Digital measurement storage</li>
              <li>✅ Automated billing & invoicing</li>
              <li>✅ Customer order tracking</li>
              <li>✅ Customer History</li>
              <li>✅ Customer Delete History</li>
              <li>✅ Analytics & Reports</li>
              <li>✅ Online Service</li>
              <li>✅ Save Time</li>
              <li>✅ Easy to Use</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gray-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12 animate-slide-up">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-white shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.pexels.com/photos/6169033/pexels-photo-6169033.jpeg"
                alt="Orders"
                className="mx-auto mb-4 rounded "
              />
              <h4 className="text-xl font-semibold mb-3">Order Management</h4>
              <p>Track and manage all tailoring orders easily.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer"
                className="mx-auto mb-4 rounded "
              />
              <h4 className="text-xl font-semibold mb-3">Customer Profiles</h4>
              <p>Save customer measurements and history securely.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Analytics"
                className="mx-auto mb-4 rounded"
              />
              <h4 className="text-xl font-semibold mb-3">Analytics</h4>
              <p>View performance reports and revenue insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 text-white bg-gradient-to-r from-indigo-600 to-purple-600 animate-fade-in">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div className="animate-slide-up">
            <p className="text-4xl font-bold">1K+</p>
            <p>Tailors Registered</p>
          </div>
          <div className="animate-slide-up">
            <p className="text-4xl font-bold">50K+</p>
            <p>Orders Managed</p>
          </div>
          <div className="animate-slide-up">
            <p className="text-4xl font-bold">95%</p>
            <p>Customer Satisfaction</p>
          </div>
          <div className="animate-slide-up">
            <p className="text-4xl font-bold">24/7</p>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 text-center animate-fade-in">
        <h3 className="text-3xl font-bold mb-12 animate-slide-up">Choose Your Plan</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          <div className="bg-white shadow rounded-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h4 className="text-xl font-semibold mb-4">Starter</h4>
            <p className="text-4xl font-bold mb-6">$0</p>
            <p className="mb-6">Perfect for individual tailors</p>
            <a
              href="/signup"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Free
            </a>
          </div>
          <div className="bg-white shadow-lg border-2 border-indigo-600 rounded-lg p-8 scale-105 transform transition-all duration-300 hover:shadow-xl">
            <h4 className="text-xl font-semibold mb-4">Pro</h4>
            <p className="text-4xl font-bold mb-6">$19/mo</p>
            <p className="mb-6">For small tailoring shops</p>
            <a
              href="/signup"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Pro
            </a>
          </div>
          <div className="bg-white shadow rounded-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h4 className="text-xl font-semibold mb-4">Enterprise</h4>
            <p className="text-4xl font-bold mb-6">Custom</p>
            <p className="mb-6">For large tailoring businesses</p>
            <a
              href="#contact"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50 animate-fade-in">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12 animate-slide-up">What Our Clients Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <p className="italic mb-4">
                "Tailorix Dashboard saved me hours of paperwork every week. My customers
                love the professionalism."
              </p>
              <h4 className="font-semibold">– Sarah, Boutique Owner</h4>
            </div>
            <div className="bg-white p-6 shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <p className="italic mb-4">
                "With Tailorix Admin Dashboard, I can track every order and measurement. My
                shop runs smoother than ever."
              </p>
              <h4 className="font-semibold">– Ahmed, Tailor</h4>
            </div>
            <div className="bg-white p-6 shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <p className="italic mb-4">
                "Best investment for my tailoring business. I can finally focus
                on my craft."
              </p>
              <h4 className="font-semibold">– Maria, Designer</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section id="contact" className="py-20 bg-gray-50 animate-fade-in">
       <footer className="bg-gray-900 text-gray-200 py-12">
        <Footer/>
      </footer>
      </section>
     
    </div>
  )
}

export default HomePage