"use client";
import Image from "next/image";

export default function MistakesBlog() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold mb-4">
        Top 5 Mistakes Beginners Make When Learning Programming
      </h1>
      <p className="text-gray-500 mb-6">By Muhammad Adil Umer • Sept 16, 2025</p>
      <div className="relative w-full h-80 mb-8">
        <img fill="true" 
          src="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg
"
          alt="Programming mistakes"
          height={"250px"}
          width={"350px"}
          className="object-cover rounded-lg"
        />
      </div>
      <article className="prose prose-lg">
        <p>
          Learning programming is exciting, but it’s also easy to get stuck in
          bad habits that slow down your progress. Over the years, I’ve seen
          beginners repeat the same mistakes again and again. Let’s look at the
          top five—and how to avoid them.
        </p>

        <h2>❌ Mistake 1: Copy-Pasting Without Understanding</h2>
        <p>
          Beginners often copy code from tutorials without really knowing what’s
          happening. Instead, take time to understand each line.
        </p>

        <h2>❌ Mistake 2: Avoiding Problem Solving</h2>
        <p>
          Programming is about solving problems. If you only follow tutorials,
          you won’t develop problem-solving skills.
        </p>

        <h2>❌ Mistake 3: Ignoring Debugging</h2>
        <p>
          Debugging teaches you more than writing code. Don’t fear errors—learn
          to read and fix them.
        </p>

        <h2>❌ Mistake 4: Learning Too Many Languages</h2>
        <p>
          Focus on mastering one language before jumping into others. Depth is
          better than shallow knowledge.
        </p>

        <h2>❌ Mistake 5: Giving Up Too Soon</h2>
        <p>
          Many stop when coding feels hard. Remember: consistency beats talent.
        </p>

        <h2>✅ How to Avoid These Mistakes</h2>
        <p>
          Practice small projects, write your own code, and learn from errors.
          Programming is a journey, and persistence pays off.
        </p>
      </article>
    </div>
  );
}
