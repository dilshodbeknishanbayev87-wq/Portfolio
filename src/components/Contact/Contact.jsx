import React from "react";

function Contact() {
  return (
    <div
      id="contact"
      className="flex flex-col md:flex-row gap-10 w-full min-h-screen bg-gray-900 text-white px-6 md:px-20 py-16"
    >
      <div className="flex-1">
        <h2 className="text-4xl md:text-6xl mb-4">Get In Touch</h2>

        <p className="mb-6">
          If you're considering my contribution, have a question,
          or just want to say hi, I'd love to hear from you!
        </p>

        <div className="w-[250px] flex items-center gap-3 text-xl bg-blue-700 px-4 py-3 rounded-full hover:bg-blue-800 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <button>Say hello</button>
        </div>

        <div className="mt-10 space-y-4">
          <h3 className="text-2xl font-bold">Contact Information</h3>

          <p>📞 +998 91 399 07 30</p>
          <p>📧 dilshodbknishanbayev87@gmail.com</p>
          <p>📍 Kungrad, Uzbekistan</p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl mb-2">Social Media</h3>

          <div className="flex gap-4 text-2xl">
            <span>📸</span>
            <span>✉️</span>
            <span>💬</span>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Built with React, Tailwind CSS and deployed on Vercel.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps?q=Kungrad,Uzbekistan&output=embed"
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;