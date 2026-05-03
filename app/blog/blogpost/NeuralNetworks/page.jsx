"use client";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    heading: "What Even Is a Neural Network?",
    body: `A neural network is a computational model loosely inspired by the human brain. Just as your brain uses billions of interconnected neurons to process information, an artificial neural network (ANN) uses layers of interconnected nodes — each called an artificial neuron — to learn patterns from data.

The magic isn't in any single neuron. It's in the connections between them. Each connection carries a weight — a number that determines how much influence one neuron has on the next. During training, the network adjusts these weights to minimise the gap between its predictions and the correct answers.`,
  },
  {
    heading: "The Architecture: Layers, Neurons, Weights",
    body: `Every neural network has three types of layers:

• Input Layer — Receives raw data (pixel values, numbers, embeddings). Each node represents one feature.

• Hidden Layers — The "thinking" happens here. Each neuron takes a weighted sum of the previous layer's outputs, adds a bias term, and passes the result through an activation function. Deep networks have many hidden layers, which is why we call the field "deep learning."

• Output Layer — Produces the final result: a class probability, a regression value, or a generated token.

The depth (number of hidden layers) and width (neurons per layer) are hyperparameters you tune based on your problem.`,
  },
  {
    heading: "Activation Functions: The Non-Linearity That Makes It Work",
    body: `Without activation functions, stacking layers would be mathematically equivalent to a single linear transformation — useless for learning complex patterns.

Common activations:

• ReLU (Rectified Linear Unit) — max(0, x). Simple, fast, and the default choice for hidden layers. Solves the vanishing gradient problem that plagued early networks.

• Sigmoid — Squashes output to [0, 1]. Used in binary classification output layers.

• Softmax — Converts a vector of numbers into a probability distribution. Used in multi-class classification outputs.

• GELU / Swish — Smoother variants of ReLU used in modern transformers and large language models.`,
  },
  {
    heading: "How Networks Learn: Backpropagation & Gradient Descent",
    body: `Training a neural network is an optimisation problem. You have a loss function (e.g. cross-entropy for classification, MSE for regression) that measures how wrong the network is. The goal: minimise it.

Here's the loop:

1. Forward pass — Input flows through the network and produces a prediction.
2. Compute loss — Compare prediction to the ground truth label.
3. Backward pass (backpropagation) — Using the chain rule of calculus, compute the gradient of the loss with respect to every weight in the network.
4. Update weights — Move each weight slightly in the direction that reduces the loss (gradient descent). The step size is the learning rate.

Repeat millions of times over batches of data, and the network gradually learns meaningful representations.`,
  },
  {
    heading: "Why Neural Networks Are So Powerful",
    body: `The Universal Approximation Theorem states that a neural network with at least one hidden layer and a non-linear activation function can approximate any continuous function to arbitrary precision — given enough neurons and data.

This theoretical result, combined with modern hardware (GPUs, TPUs) and massive datasets, explains why neural networks now power image recognition, speech synthesis, protein folding, code generation, and almost every frontier of AI.

Understanding neural networks is the gateway to understanding CNNs (computer vision), RNNs (sequence modelling), and Transformers (the architecture behind GPT, BERT, and modern LLMs).`,
  },
];

export default function NeuralNetworksPost() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50">
      {/* Hero */}
      <div className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-6 sm:px-10 max-w-3xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-10 group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-bold">AI / ML</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400"><Clock size={12} /> 6 min read</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400"><CalendarDays size={12} /> March 2025</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              What Are Neural Networks?
              <br />
              <span className="text-indigo-500">A Visual Explanation</span>
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-10">
              Neurons, layers, weights, and activations — demystified. Understand how neural networks
              learn from data and why they power everything from image recognition to ChatGPT.
            </p>
          </motion.div>
        </div>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="container mx-auto px-6 sm:px-10 max-w-4xl"
        >
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-black/10">
            <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
              alt="Neural Networks" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Article body */}
      <article className="container mx-auto px-6 sm:px-10 max-w-3xl py-16">
        <div className="flex flex-col gap-12">
          {sections.map((section, i) => (
            <motion.section
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-zinc-900 dark:text-zinc-50">
                {section.heading}
              </h2>
              <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="whitespace-pre-line">{para}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50"
        >
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3">Key Takeaway</p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            Neural networks learn by adjusting connection weights through repeated forward and backward passes.
            Their power lies in composition — simple operations stacked into layers that learn increasingly
            abstract representations of data.
          </p>
        </motion.div>

        {/* Related */}
        <div className="mt-14 pt-10 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase mb-5">Continue Reading</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { path: "CNN", label: "Computer Vision", title: "CNNs and Computer Vision: How Machines Learn to See" },
              { path: "RNN", label: "NLP", title: "RNNs and Language Processing: Teaching Machines to Read" },
            ].map((r) => (
              <Link key={r.path} href={`/blog/blogpost/${r.path}`}
                className="flex-1 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all duration-200 group"
              >
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{r.label}</span>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-indigo-500 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            All articles
          </Link>
        </div>
      </article>
    </div>
  );
}
