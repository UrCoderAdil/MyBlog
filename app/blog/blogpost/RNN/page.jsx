"use client";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    heading: "Why Sequence Matters",
    body: `Standard neural networks and CNNs treat every input independently. Feed in an image and you get a classification. Feed in another image and the network has no memory of the first.

But language doesn't work that way. The meaning of a word depends entirely on the words that came before it:

"The bank by the river was steep."
"The bank rejected my loan application."

The word "bank" is identical in both sentences. Only the surrounding context reveals its meaning. A model that processes words in isolation will fail completely at language understanding.

Recurrent Neural Networks (RNNs) were designed specifically to handle sequential data — input where order and context matter.`,
  },
  {
    heading: "The Recurrent Architecture: A Loop Through Time",
    body: `The key innovation in an RNN is a hidden state — a vector that acts as the network's memory. At each time step t:

1. The network receives the current input (e.g. a word embedding)
2. It combines the input with the previous hidden state
3. It produces a new hidden state
4. It (optionally) produces an output

Mathematically: h_t = tanh(W_hh · h_{t-1} + W_xh · x_t + b)

The same weights (W_hh and W_xh) are shared across all time steps — the network applies the same "update rule" at each position. This is parameter sharing over time, analogous to how CNNs share parameters over space.

This means an RNN trained on sentences processes each token while maintaining a running summary of everything it has seen so far.`,
  },
  {
    heading: "The Vanishing Gradient Problem",
    body: `Training RNNs with backpropagation through time (BPTT) unrolls the network across all time steps and applies the chain rule. For a sequence of length 100, you're multiplying 100 Jacobian matrices together.

If these matrices have eigenvalues < 1, gradients shrink exponentially as they flow backward — the vanishing gradient problem. The network can no longer learn dependencies between distant tokens ("The cat that sat on the mat... was hungry" — by the time we get to "was hungry", the gradient signal from "cat" has vanished).

If eigenvalues > 1, gradients explode — training diverges.

Standard RNNs effectively have a memory of only ~10-20 steps. This severely limits their ability to model long-range dependencies in text.`,
  },
  {
    heading: "LSTMs: Long Short-Term Memory",
    body: `In 1997, Hochreiter and Schmidhuber introduced the Long Short-Term Memory (LSTM) architecture to solve the vanishing gradient problem.

LSTMs add a separate cell state — a "conveyor belt" that runs through the network with minimal transformations — and three gates that control information flow:

• Forget Gate — Decides what to throw away from the previous cell state. ("This context about banking is no longer relevant.")
• Input Gate — Decides what new information to add. ("The word 'river' is important — store it.")
• Output Gate — Decides what part of the cell state to output as the hidden state.

These gates are implemented as sigmoid-activated linear layers, producing values between 0 (block) and 1 (pass through). The result: LSTMs can maintain useful information across hundreds of time steps, learning long-range dependencies that vanilla RNNs cannot.`,
  },
  {
    heading: "GRUs: A Simpler Alternative",
    body: `The Gated Recurrent Unit (GRU), introduced in 2014, simplifies the LSTM by merging the forget and input gates into a single update gate and eliminating the separate cell state.

GRUs have fewer parameters than LSTMs, train faster, and often achieve comparable performance — particularly on smaller datasets. They're a popular choice when computational resources are limited.

The core insight shared by both LSTMs and GRUs: gating mechanisms allow the network to selectively update its memory, creating "information highways" that let gradients flow backward without vanishing.`,
  },
  {
    heading: "Applications in Natural Language Processing",
    body: `RNNs and their variants (LSTMs, GRUs) powered the NLP field for years before Transformers took over:

• Language Modelling — Predicting the next word in a sequence. The foundation of text generation.
• Machine Translation — Sequence-to-sequence architectures with encoder-decoder RNNs (Google Translate, pre-2017).
• Sentiment Analysis — Classifying the emotional tone of reviews, tweets, or comments.
• Named Entity Recognition — Identifying people, places, and organisations in text.
• Speech Recognition — Processing audio as a temporal sequence to produce text.
• Time Series Forecasting — Stock prices, weather, sensor data — any ordered numeric sequence.

The encoder-decoder (seq2seq) architecture with attention was the direct precursor to the Transformer, which replaced RNNs as the dominant architecture for language tasks in 2017 and gave rise to BERT, GPT, and every modern LLM.`,
  },
  {
    heading: "Where RNNs Stand Today",
    body: `Transformers have largely supplanted RNNs for most NLP tasks. Self-attention processes the entire sequence in parallel — no sequential bottleneck — and captures long-range dependencies more effectively.

However, RNNs are far from dead:

• They remain competitive on small datasets and resource-constrained devices.
• State Space Models (SSMs) like Mamba (2023) combine ideas from RNNs and attention to achieve Transformer-level performance with linear (not quadratic) complexity in sequence length.
• For real-time streaming applications where you process tokens one at a time (robotics, audio), the sequential nature of RNNs is actually an advantage.

Understanding RNNs is essential for understanding the history of deep learning and the motivations behind modern architectures. Every serious ML engineer should know them.`,
  },
];

export default function RNNPost() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50">
      {/* Hero */}
      <div className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(244,63,94,0.07) 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-6 sm:px-10 max-w-3xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-10 group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold">NLP</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400"><Clock size={12} /> 8 min read</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400"><CalendarDays size={12} /> May 2025</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              RNNs and Language Processing:
              <br />
              <span className="text-rose-500">Teaching Machines to Read</span>
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-10">
              Recurrent Neural Networks process sequences like sentences, audio, and time-series data.
              Explore how RNNs, LSTMs, and GRUs laid the foundation for modern language models.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="container mx-auto px-6 sm:px-10 max-w-4xl"
        >
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-black/10">
            <img src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg"
              alt="Language Processing" className="w-full h-full object-cover" />
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
              transition={{ duration: 0.6, delay: i * 0.04 }}
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
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40"
        >
          <p className="text-xs font-bold tracking-[0.2em] text-rose-500 dark:text-rose-400 uppercase mb-3">Key Takeaway</p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            RNNs introduced the concept of memory into neural networks, enabling sequence modelling.
            LSTMs and GRUs solved the vanishing gradient problem through gating mechanisms.
            While Transformers now dominate NLP, RNNs remain foundational knowledge and are evolving
            into next-generation state space models.
          </p>
        </motion.div>

        {/* Related */}
        <div className="mt-14 pt-10 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase mb-5">Continue Reading</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { path: "NeuralNetworks", label: "AI / ML", title: "What Are Neural Networks? A Visual Explanation" },
              { path: "CNN", label: "Computer Vision", title: "CNNs and Computer Vision: How Machines Learn to See" },
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
