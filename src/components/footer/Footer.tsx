import React, { FormEvent, useCallback, useRef, useState } from "react";
import emailjs from "emailjs-com";

const serverice_email = process.env.NEXT_PUBLIC_SERVICE_EMAIL_ID!;
const templete_email = process.env.NEXT_PUBLIC_TEMPLATE_EMAIL_ID!;
const templete_client_id = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID!;
const public_key = process.env.NEXT_PUBLIC_EMAIL_KEY!;

const Footer = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; message: string } | null >(null);

  const sendEmail = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formRef.current) return;

      emailjs
        .sendForm(serverice_email,
          templete_email,
          formRef.current,
          public_key)
        .then(
          (result) => {
            console.log("Email sent:", result.text);
            setMessage({ type: "success", message: "Message sent successfully!" })
            formRef.current?.reset();
          },
          (error) => {
            console.error("Error sending email:", error.text);
                        setMessage({ type: "error", message: "Message sent Faild!" })

          }
        );
    },
    [serverice_email, templete_email, public_key]
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div className="animate-slide-up">
          <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
          <p className="mb-4 text-gray-400">
            We're here to help you streamline your tailoring business.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <a
                href="mailto:support@tailorix.com"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                mwaqas8795@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <a
                href="tel:+1234567890"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                +923036518795
              </a>
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>123 Tailor Street, Suite 100, New York, NY 10001</span>
            </li>
          </ul>
          <div className="mt-6 flex space-x-4">
            <a
              href="https://twitter.com/tailorix"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.379 4.482 13.944 13.944 0 01-10.125-5.135 4.916 4.916 0 001.523 6.557 4.902 4.902 0 01-2.229-.616v.062a4.917 4.917 0 003.946 4.827 4.902 4.902 0 01-2.224.085 4.917 4.917 0 004.583 3.416 9.867 9.867 0 01-6.102 2.105c-.396 0-.788-.023-1.175-.068a13.944 13.944 0 007.548 2.213c9.057 0 14.01-7.496 14.01-13.986 0-.213-.005-.426-.014-.637A10.025 10.025 0 0024 4.557z"></path>
              </svg>
            </a>
            <a
              href="https://facebook.com/tailorix"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/tailorix"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
              </svg>
            </a>
          </div>
        </div>

        
        {/* Contact Form */}
        <div className="animate-slide-up">
           {message && (
          <p  className={`text-sm ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`} > {message.message}</p>
        )}
          <h3 className="text-2xl font-bold text-white mb-6">
            Send Us a Message
          </h3>
          
       
          <form ref={formRef} onSubmit={sendEmail} className="grid gap-6">
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            <input
              type="email"
              name="to_email"
              placeholder="Your Email"
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              rows={4}
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Tailorix. All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
