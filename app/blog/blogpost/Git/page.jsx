"use client";
import Image from "next/image";

export default function GitGithubBlog() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold mb-4">
        Why Every CS Student Should Learn Git and GitHub Early
      </h1>
      <p className="text-gray-500 mb-6">
        By Muhammad Adil Umer • Sept 16, 2025
      </p>
      <div className="relative w-full h-80 mb-8">
        <img fill="true" 
          src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
          alt="GitHub collaboration"
          height={"250px"}
          width={"350px"}
          className="object-cover rounded-lg"
        />
      </div>
      <article className="prose prose-lg">
        <p>
          As computer science students, we often focus on learning programming
          languages, algorithms, and frameworks. While these are essential,
          many overlook one of the most powerful tools that can make their
          academic and professional life much easier: Git and GitHub.
        </p>

        <h1>📌 What is Git and GitHub?</h1>
        <p>
          Git is a version control system that helps you track changes in your
          code. GitHub is a platform that lets you host your Git repositories
          online, collaborate with others, and showcase your work.
        </p>

        <h2>🚀 Why Learn Them Early?</h2>
        <ul>
          <li>
            <strong>Collaboration:</strong> Whether in group projects or
            hackathons, GitHub makes teamwork seamless.
          </li>
          <li>
            <strong>Portfolio:</strong> Every project you push to GitHub becomes
            part of your resume.
          </li>
          <li>
            <strong>Backup:</strong> Never lose your code again—GitHub stores it
            safely.
          </li>
          <li>
            <strong>Industry Standard:</strong> Almost all tech companies use
            Git.
          </li>
        </ul>

        <h1>🎯 Final Thoughts</h1>
        <p>
          Learning Git and GitHub early will give you a head start. Instead of
          struggling in final-year projects or internships, you’ll already be
          comfortable with tools that professionals use every day.
        </p>
      </article>
    </div>
  );
}