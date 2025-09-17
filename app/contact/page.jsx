"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Mail, Phone, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        (err) => {
          console.error("EmailJS Error:", err);
          setError(err.text || "Failed to send message");
        }
      );
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-100 to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950 px-6 py-20 transition-colors">
      <div className="max-w-6xl w-full text-center">
        {/* Typewriter Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-6xl font-extrabold mb-6 text-black dark:text-white leading-tight break-words"
        >
          <TypeAnimation
            sequence={[
              "Say Hello 👋",
              1500,
              "Get in Touch 📩",
              1500,
              "Let’s Work Together 🚀",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="block"
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-16 text-balance"
        >
          I’d love to hear from you! Whether you have a project in mind, a
          question, or just want to say hi — feel free to reach out.
        </motion.p>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Email */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-900 border border-blue-600 rounded-2xl p-8 shadow-lg transition-colors"
          >
            <Mail className="w-10 h-10 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">AdilUmer2005@gmail.com</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-900 border border-blue-600 rounded-2xl p-8 shadow-lg transition-colors"
          >
            <Phone className="w-10 h-10 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">+92 328 8915990</p>
          </motion.div>

          {/* Address */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-900 border border-blue-600 rounded-2xl p-8 shadow-lg transition-colors"
          >
            <MapPin className="w-10 h-10 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              Address
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Islamabad, Pakistan</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-blue-600 rounded-2xl shadow-lg p-8 flex flex-col gap-6"
        >
          <div className="text-left">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Your Name
            </label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full bg-transparent border-b-2 border-gray-400 outline-none focus:border-blue-500 py-2"
            />
          </div>

          <div className="text-left">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Your Email
            </label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full bg-transparent border-b-2 border-gray-400 outline-none focus:border-blue-500 py-2"
            />
          </div>

          <div className="text-left">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Message
            </label>
            <textarea
              rows={5}
              name="message"
              required
              className="w-full bg-transparent border-b-2 border-gray-400 outline-none focus:border-blue-500 resize-none py-2"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 transition-all shadow-lg text-lg font-semibold text-white"
          >
            Send Message
          </button>

          {success && (
            <p className="text-green-600 font-semibold mt-4">
              ✅ Your message has been sent successfully!
            </p>
          )}
          {error && (
            <p className="text-red-600 font-semibold mt-4">
              ❌ Something went wrong: {error}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
