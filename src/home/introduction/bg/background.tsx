import { Component, onMount } from "solid-js";
import { animate } from "motion";

const Background: Component = () => {
  let blob1: HTMLDivElement | undefined;
  let blob2: HTMLDivElement | undefined;
  let blob3: HTMLDivElement | undefined;

  onMount(() => {
    if (blob1) {
      animate(
        blob1,
        {
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        } as any,
        { duration: 20, ease: "easeInOut", repeat: Infinity },
      );
    }
    if (blob2) {
      animate(
        blob2,
        {
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.2, 0.9, 1],
        } as any,
        { duration: 25, ease: "easeInOut", repeat: Infinity, delay: 2 },
      );
    }
    if (blob3) {
      animate(
        blob3,
        {
          x: [0, 50, -20, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        } as any,
        { duration: 22, ease: "easeInOut", repeat: Infinity, delay: 1 },
      );
    }
  });

  return (
    <div class="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-slate-900 text-white">
      {/* Base Layer - Deep Calm Blue Gradient - darker base to prevent eye strain */}
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 opacity-100" />

      {/* Grid Pattern Overlay for Professional Look */}
      <div
        class="absolute inset-0 opacity-[0.03]"
        style={{
          "background-image":
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          "background-size": "50px 50px",
        }}
      />

      {/* Animated Glowing Orbs/Blobs - Providing the "Bright Blue" essence without being overwhelming */}
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Top Left Bright Blue - Cyan tint */}
        <div
          ref={blob1}
          class="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"
        />

        {/* Bottom Right Deep Blue/Indigo */}
        <div
          ref={blob2}
          class="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"
        />

        {/* Center/Random light Accent */}
        <div
          ref={blob3}
          class="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] bg-cyan-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15"
        />
      </div>

      {/* Noise Texture for Matte Finish (reduces digital harshness) */}
      <div class="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Subtle Vignette to focus attention to center */}
      <div class="absolute inset-0 bg-radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 120%) pointer-events-none" />
    </div>
  );
};

export default Background;
