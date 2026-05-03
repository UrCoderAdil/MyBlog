"use client";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    heading: "The Problem with Flat Neural Networks for Images",
    body: `Imagine a 224×224 colour image. That's 224 × 224 × 3 = 150,528 pixel values. If you feed that into a standard fully connected (dense) layer with 1,000 neurons, you already have 150 million parameters — just in the first layer.

This approach has two crushing problems:
• It doesn't scale. More pixels = exponentially more parameters.
• It ignores spatial structure. A dog in the top-left corner and the same dog in the bottom-right should activate the same "dog detector" — but a dense network treats each pixel position independently.

Convolutional Neural Networks solve both problems elegantly.`,
  },
  {
    heading: "The Core Idea: Filters and Feature Maps",
    body: `A CNN learns to detect visual patterns using small, learnable matrices called filters (or kernels). A filter slides across the image — this operation is called convolution — computing a dot product at each position.

For example, a 3×3 filter might learn to detect vertical edges. Wherever that pattern appears in the image, the output (the feature map) will have a high activation. The network learns thousands of such filters automatically from data.

Key advantages:
• Parameter sharing — the same filter is applied everywhere in the image, drastically reducing parameter count.
• Translation invariance — if a filter detects "cat ear", it detects it anywhere in the image.
• Local connectivity — each neuron only looks at a small region (receptive field), matching how visual features are spatially local.`,
  },
  {
    heading: "Pooling: Downsampling for Robustness",
    body: `After a convolutional layer, the feature maps are still large. Pooling layers reduce spatial dimensions while retaining the most important information.

Max Pooling takes the maximum value in each small region (e.g. 2×2), keeping only the strongest activations. This makes the network robust to small shifts and distortions — a feature that's slightly offset still gets detected.

Average Pooling takes the mean instead and is used in some modern architectures for smoother representations.

A typical CNN block: Convolution → Batch Normalisation → ReLU → Max Pool. These blocks are stacked, each one learning increasingly abstract features.`,
  },
  {
    heading: "The Hierarchy of Visual Features",
    body: `One of the most beautiful properties of deep CNNs is the feature hierarchy they learn — completely unsupervised, just from labelled examples:

• Layer 1–2: Edges, colour gradients, simple textures
• Layer 3–4: Curves, corners, repeating patterns like grids
• Layer 5–6: Object parts — wheels, eyes, ears, fur
• Final layers: High-level concepts — "labrador", "convertible", "fire hydrant"

This mirrors the visual cortex's hierarchy in the human brain. Earlier layers respond to simple stimuli; deeper layers to increasingly complex combinations.`,
  },
  {
    heading: "Famous CNN Architectures",
    body: `LeNet (1989) — Yann LeCun's pioneering architecture for digit recognition. Proved the concept worked.

AlexNet (2012) — Won ImageNet by a landslide, kickstarting the deep learning revolution. Used ReLU and GPU training.

VGGNet (2014) — Showed that depth matters. Simple stacks of 3×3 convolutions, up to 19 layers.

ResNet (2015) — Introduced residual connections (skip connections) to train networks 50–152 layers deep without vanishing gradients. Still widely used today.

EfficientNet (2019) — Systematically scales width, depth, and resolution together for maximum accuracy per FLOP.

Modern ViTs (Vision Transformers) challenge CNNs by applying the attention mechanism directly to image patches, often outperforming CNNs on large datasets.`,
  },
  {
    heading: "Real-World Applications in Computer Vision",
    body: `CNNs are the backbone of virtually every modern computer vision system:

• Image Classification — "Is this a cat or a dog?" (ImageNet, medical diagnosis)
• Object Detection — "Where are the pedestrians in this frame?" (YOLO, Faster R-CNN for autonomous driving)
• Semantic Segmentation — Labelling every pixel of a scene (autonomous driving, satellite imagery)
• Face Recognition — Detecting and identifying faces (Face ID, security systems)
• Medical Imaging — Detecting tumours in MRI/CT scans with radiologist-level accuracy
• Image Generation — CNNs in GANs generate realistic synthetic images

If you're working in computer vision, CNNs are non-negotiable knowledge.`,
  },
];

export default function CNNPost() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50">
      {/* Hero */}
      <div className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-6 sm:px-10 max-w-3xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-10 group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">Computer Vision</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400"><Clock size={12} /> 7 min read</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400"><CalendarDays size={12} /> April 2025</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              CNNs and Computer Vision:
              <br />
              <span className="text-emerald-500">How Machines Learn to See</span>
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-10">
              Convolutional Neural Networks gave machines the gift of sight. Dive into how filters,
              pooling, and feature maps enable models to detect objects, faces, and entire scenes.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="container mx-auto px-6 sm:px-10 max-w-4xl"
        >
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-black/10">
            <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
              alt="Computer Vision" className="w-full h-full object-cover" />
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
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40"
        >
          <p className="text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">Key Takeaway</p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
            CNNs exploit the spatial structure of images through local connectivity and parameter sharing.
            Their learned feature hierarchy — from edges to objects — mirrors the human visual cortex
            and underpins nearly every modern computer vision system.
          </p>
        </motion.div>

        {/* Related */}
        <div className="mt-14 pt-10 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase mb-5">Continue Reading</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { path: "NeuralNetworks", label: "AI / ML", title: "What Are Neural Networks? A Visual Explanation" },
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
