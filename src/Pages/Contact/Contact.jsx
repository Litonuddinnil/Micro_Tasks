import React from "react";
import { Helmet } from "react-helmet";

const Contact = () => {
    const handlerSubmit = (e) =>{
        e.preventDefault();
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Helmet>
        <title>Micro Platform | ContactUs</title>
        </Helmet>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Contact Us
        </h1>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              onClick={handlerSubmit}
              className="px-6 py-3 bg-sky-500 text-white font-bold rounded-lg shadow hover:bg-sky-600 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
