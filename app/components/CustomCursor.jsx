"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const lbl = labelRef.current;
    if (!dot || !ring) return;

    let gsapCleanup;

    (async () => {
      const { gsap } = await import("gsap");

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

      const dX = gsap.quickTo(dot, "x", { duration: 0.06 });
      const dY = gsap.quickTo(dot, "y", { duration: 0.06 });
      const rX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
      const rY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
      const lX = gsap.quickTo(lbl, "x", { duration: 0.55, ease: "power3.out" });
      const lY = gsap.quickTo(lbl, "y", { duration: 0.55, ease: "power3.out" });

      const onMove = (e) => {
        setVisible(true);
        dX(e.clientX);
        dY(e.clientY);
        rX(e.clientX);
        rY(e.clientY);
        lX(e.clientX);
        lY(e.clientY);
      };

      const onDown = () => gsap.to(ring, { scale: 0.75, duration: 0.1 });
      const onUp = () => gsap.to(ring, { scale: 1, duration: 0.25, ease: "back.out(2)" });

      // Cursor states per element type
      const applyHover = () => {
        // Links
        document.querySelectorAll("a, button, [role='button']").forEach((el) => {
          el.addEventListener("mouseenter", () => {
            const cursorLabel = el.dataset.cursor || "";
            setLabel(cursorLabel);
            gsap.to(ring, {
              scale: cursorLabel ? 2.5 : 1.6,
              borderColor: "#6366f1",
              backgroundColor: cursorLabel ? "rgba(99,102,241,0.12)" : "transparent",
              duration: 0.35,
              ease: "power2.out",
            });
            gsap.to(dot, { scale: 0.3, opacity: 0.6, duration: 0.2 });
          });
          el.addEventListener("mouseleave", () => {
            setLabel("");
            gsap.to(ring, {
              scale: 1,
              borderColor: "rgba(99,102,241,0.45)",
              backgroundColor: "transparent",
              duration: 0.35,
              ease: "power2.out",
            });
            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
          });
        });

        // Inputs / textareas → thin cursor
        document.querySelectorAll("input, textarea").forEach((el) => {
          el.addEventListener("mouseenter", () => {
            gsap.to(ring, { scale: 0.4, borderColor: "#6366f1", duration: 0.2 });
          });
          el.addEventListener("mouseleave", () => {
            gsap.to(ring, { scale: 1, borderColor: "rgba(99,102,241,0.45)", duration: 0.2 });
          });
        });
      };

      applyHover();
      const observer = new MutationObserver(applyHover);
      observer.observe(document.body, { childList: true, subtree: true });

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);
      document.documentElement.addEventListener("mouseleave", () => setVisible(false));
      document.documentElement.addEventListener("mouseenter", () => setVisible(true));

      gsapCleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup", onUp);
        observer.disconnect();
      };
    })();

    return () => gsapCleanup?.();
  }, []);

  return (
    <>
      {/* Hide native cursor globally */}
      <style>{`html, html * { cursor: none !important; }`}</style>

      {/* Dot — exact position */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#6366f1",
          willChange: "transform",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Ring — trailing with lerp */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998]"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(99,102,241,0.45)",
          willChange: "transform",
          opacity: visible ? 0.9 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Label inside ring — shown when data-cursor set */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[99997] flex items-center justify-center"
        style={{
          width: 90,
          height: 90,
          marginLeft: -45,
          marginTop: -45,
          willChange: "transform",
          opacity: label ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest whitespace-nowrap">
          {label}
        </span>
      </div>
    </>
  );
}
