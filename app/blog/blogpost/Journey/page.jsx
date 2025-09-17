"use client";
import Image from "next/image";

export default function PythonBlog() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold mb-4">
        How I Started Coding in Python
      </h1>
      <p className="text-gray-500 mb-6">By Muhammad Adil Umer • Sept 16, 2025</p>
      <div className="relative w-full h-80 mb-8">
        <img fill="true" 
          src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg"
          alt="Python coding journey"
          height={"250px"}
          width={"350px"}
          className="object-cover rounded-lg"
        />
      </div>
      <article className="prose prose-lg">
        <p>
          My coding journey began in 2022 when I picked up Python. I had always
          been curious about how software worked, and Python seemed like the
          perfect entry point.
        </p>

        <h2>🐍 Why Python?</h2>
        <p>
          Python’s syntax is clean and beginner-friendly. I didn’t have to worry
          about curly braces or complex syntax—I could focus on logic.
        </p>

        <h2>💡 My First Program</h2>
        <p>
          Like most beginners, my first program was a simple “Hello World.” But
          even that small step felt like unlocking a new world.
        </p>

        <h2>🚀 Challenges I Faced</h2>
        <ul>
          <li>Understanding loops and conditionals.</li>
          <li>Debugging syntax errors.</li>
          <li>Learning how to structure larger programs.</li>
        </ul>

        <h2>🌱 How I Grew</h2>
        <p>
          I started building mini projects: a calculator, a to-do list app, and
          even simple games. Each project gave me confidence and pushed me to
          explore more.
        </p>

        <h2>🎯 My Advice</h2>
        <p>
          If you’re starting today, pick one language (Python is great), focus
          on consistency, and don’t fear mistakes. Every error is a lesson.
        </p>
      </article>
    </div>
  );
}
