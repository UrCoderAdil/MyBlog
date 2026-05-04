"use client";
import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId;
    let cleanupFn;

    const init = async () => {
      const THREE = await import("three");

      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 50);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      /* ── Particles ── */
      const COUNT = 700;
      const positions = new Float32Array(COUNT * 3);
      const scales = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        scales[i] = Math.random();
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

      /* Use ShaderMaterial for round points */
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#a5b4fc") },
          uOpacity: { value: 0.0 },
        },
        vertexShader: `
          attribute float aScale;
          uniform float uTime;
          void main() {
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (3.0 + aScale * 2.0) * (300.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.2, d) * uOpacity;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      /* ── Fade-in ── */
      let opacity = 0;
      const fadeIn = () => {
        if (opacity < 0.55) {
          opacity += 0.008;
          mat.uniforms.uOpacity.value = opacity;
        }
      };

      /* ── Mouse parallax ── */
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const onMouse = (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      /* ── Resize — use ResizeObserver so mobile reflows are caught ── */
      const applySize = () => {
        const nw = canvas.clientWidth || window.innerWidth;
        const nh = canvas.clientHeight || window.innerHeight;
        if (nw === 0 || nh === 0) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh, false);
      };
      const ro = new ResizeObserver(applySize);
      ro.observe(canvas.parentElement ?? canvas);
      window.addEventListener("resize", applySize, { passive: true });

      /* ── Animation loop ── */
      const clock = new THREE.Clock();
      const tick = () => {
        animId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        /* Smooth mouse lerp */
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;

        points.rotation.y = t * 0.03 + currentX * 0.4;
        points.rotation.x = t * 0.015 + currentY * 0.3;

        mat.uniforms.uTime.value = t;
        fadeIn();

        renderer.render(scene, camera);
      };
      tick();

      /* Force correct size after first paint */
      requestAnimationFrame(applySize);

      return () => {
        cancelAnimationFrame(animId);
        ro.disconnect();
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", applySize);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    };

    init().then((fn) => {
      cleanupFn = fn;
    });

    return () => cleanupFn?.();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
