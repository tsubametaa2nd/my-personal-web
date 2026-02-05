import { createSignal, Show, onMount, onCleanup } from "solid-js";
import { animate } from "motion";
import RotatingText from "./text";
import { useNavigate } from "@solidjs/router";
import Tooltip from "../../../layouts/tooltip";
import {
  User,
  Code,
  MapPin,
  QrCode,
  ScanLine,
  Github,
  Linkedin,
  Mail,
  BadgeCheck,
  GraduationCap,
  GitPullRequest,
} from "lucide-solid";

interface LanyardCardProps {
  name: string;
  roles: string[];
  description: string;
  photoUrl?: string;
}

const LanyardCard = (props: LanyardCardProps) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = createSignal(false);
  const [isDragging, setIsDragging] = createSignal(false);

  const [cardPosition, setCardPosition] = createSignal({
    x: 0,
    y: 0,
    rotate: 0,
  });

  let cardFlipRef: HTMLDivElement | undefined;
  let containerRef: HTMLDivElement | undefined;

  let isPointerDown = false;
  let startX = 0;
  let startY = 0;
  const physics = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    targetX: 0,
    targetY: 0,
    angularVelocity: 0,
    time: 0,
  };

  const spring = {
    stiffness: 0.025,
    damping: 0.92,
    mass: 1.2,
  };

  const drag = {
    smoothing: 0.15,
    rotationFactor: 2.5,
    rotationSmoothing: 0.08,
  };

  let rafId: number;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let lastTime = performance.now();

  const smoothDamp = (
    current: number,
    target: number,
    velocity: number,
    smoothTime: number,
    deltaTime: number,
  ) => {
    const omega = 2 / smoothTime;
    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    const change = current - target;
    const temp = (velocity + omega * change) * deltaTime;
    const newVelocity = (velocity - omega * temp) * exp;
    const newValue = target + (change + temp) * exp;
    return { value: newValue, velocity: newVelocity };
  };

  const updatePhysics = () => {
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
    lastTime = currentTime;
    physics.time += deltaTime;

    if (isPointerDown) {
      const dx = physics.targetX - physics.x;
      const dy = physics.targetY - physics.y;

      physics.vx += (dx * drag.smoothing - physics.vx) * 0.3;
      physics.vy += (dy * drag.smoothing - physics.vy) * 0.3;

      physics.x += physics.vx;
      physics.y += physics.vy;

      const targetRotation = -physics.vx * drag.rotationFactor;
      physics.angularVelocity +=
        (targetRotation - physics.rotation) * drag.rotationSmoothing;
      physics.angularVelocity *= 0.9;
      physics.rotation += physics.angularVelocity;
    } else {
      const forceX = (-physics.x * spring.stiffness) / spring.mass;
      const forceY = (-physics.y * spring.stiffness) / spring.mass;

      physics.vx += forceX;
      physics.vy += forceY;

      const speed = Math.sqrt(
        physics.vx * physics.vx + physics.vy * physics.vy,
      );
      const dampingFactor =
        spring.damping - (1 - spring.damping) * Math.min(speed * 0.01, 0.1);

      physics.vx *= dampingFactor;
      physics.vy *= dampingFactor;

      physics.x += physics.vx;
      physics.y += physics.vy;

      const targetRotation = physics.x * 0.08 + physics.vx * 0.5;
      physics.angularVelocity += (targetRotation - physics.rotation) * 0.05;
      physics.angularVelocity *= 0.95;
      physics.rotation += physics.angularVelocity;

      const isNearlyStill =
        Math.abs(physics.x) < 0.5 &&
        Math.abs(physics.y) < 0.5 &&
        Math.abs(physics.vx) < 0.1;
      if (isNearlyStill) {
        const idleSway = Math.sin(physics.time * 1.5) * 0.3;
        physics.rotation += (idleSway - physics.rotation) * 0.02;
      }
    }

    setCardPosition({
      x: physics.x,
      y: physics.y,
      rotate: Math.max(-45, Math.min(45, physics.rotation)),
    });

    rafId = requestAnimationFrame(updatePhysics);
  };

  onMount(() => {
    rafId = requestAnimationFrame(updatePhysics);
  });

  onCleanup(() => {
    cancelAnimationFrame(rafId);
  });

  const onDown = (e: PointerEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(".social-icons-area") ||
      target.closest(".social-icon-btn") ||
      target.closest("a, button")
    ) {
      return;
    }

    e.preventDefault();

    isPointerDown = true;
    setIsDragging(true);
    dragOffsetX = physics.x - e.clientX;
    dragOffsetY = physics.y - e.clientY;

    physics.targetX = physics.x;
    physics.targetY = physics.y;

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onMove = (e: PointerEvent) => {
    if (!isPointerDown) return;
    physics.targetX = e.clientX + dragOffsetX;
    physics.targetY = e.clientY + dragOffsetY;
  };

  const onUp = () => {
    isPointerDown = false;
    setIsDragging(false);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };

  const handleFlip = (e: MouseEvent) => {
    if (isDragging()) return;

    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest(".social-icons-area")) return;

    if (Math.abs(physics.x) > 5) return;

    e.stopPropagation();
    setIsFlipped(!isFlipped());
    if (cardFlipRef) {
      animate(
        cardFlipRef,
        { transform: isFlipped() ? "rotateY(180deg)" : "rotateY(0deg)" } as any,
        { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
      );
    }
  };

  const getStringPath = () => {
    const startX = 170;
    const startY = 0;
    const cardX = cardPosition().x;
    const cardY = cardPosition().y;
    const cardRotate = cardPosition().rotate;

    // Calculate more natural curve control points
    const gravity = 15 + Math.abs(cardX) * 0.1;
    const controlX1 = startX + cardX * 0.2;
    const controlY1 = gravity + Math.max(0, cardY * 0.2);

    const controlX2 = startX + cardX * 0.7;
    const controlY2 = 25 + Math.max(0, cardY * 0.6) + Math.abs(cardX) * 0.15;

    const endX = startX + cardX;
    const endY = 35 + cardY;

    return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
  };

  return (
    <div
      class="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] mx-auto z-10 h-[520px] sm:h-[560px] md:h-[600px] flex justify-center pointer-events-none"
      ref={containerRef}
    >
      <svg
        class="absolute top-0 left-0 w-full z-0 overflow-visible pointer-events-none hidden sm:block"
        style={{ height: "400px" }}
        viewBox="0 0 340 400"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="clip-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#4b5563" />
            <stop offset="30%" stop-color="#9ca3af" />
            <stop offset="50%" stop-color="#d1d5db" />
            <stop offset="70%" stop-color="#9ca3af" />
            <stop offset="100%" stop-color="#4b5563" />
          </linearGradient>

          <pattern
            id="logo-pattern"
            width="30"
            height="80"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(0)"
          >
            <path
              d="M15 25 C15 25, 20 15, 25 15 C30 15, 30 25, 25 25 C20 25, 15 25, 15 25 Z 
                 M15 25 C15 25, 10 35, 5 35 C0 35, 0 25, 5 25 C10 25, 15 25, 15 25 Z
                 M15 25 C15 25, 25 30, 25 40 C25 45, 15 45, 15 40 C15 35, 15 25, 15 25 Z
                 M15 25 C15 25, 5 20, 5 10 C5 5, 15 5, 15 10 C15 15, 15 25, 15 25 Z"
              fill="white"
              fill-opacity="0.9"
              transform="translate(0, 10) scale(0.6)"
            />
            <circle
              cx="15"
              cy="40"
              r="4"
              fill="none"
              stroke="white"
              stroke-width="2"
            />
            <path
              d="M15 34 L15 46 M9 40 L21 40 M11 36 L19 44 M19 36 L11 44"
              stroke="white"
              stroke-width="1.5"
            />
          </pattern>

          <filter id="soft-shadow">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              flood-color="#000"
              flood-opacity="0.4"
            />
          </filter>
        </defs>

        <path
          d={getStringPath()}
          stroke="#000000"
          stroke-width="20"
          fill="none"
          stroke-linecap="round"
          filter="url(#soft-shadow)"
        />
      </svg>

      <div
        class="absolute top-[40px] pointer-events-auto cursor-grab active:cursor-grabbing hover:z-20 origin-top"
        style={{
          transform: `translate3d(${cardPosition().x}px, ${cardPosition().y}px, 0) rotate(${cardPosition().rotate}deg)`,
          "touch-action": "none",
        }}
        onPointerDown={onDown}
      >
        <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-neutral-200 to-neutral-400 rounded-full shadow-md flex items-center justify-center z-10 border border-neutral-400 ring-1 ring-white/30">
          <GitPullRequest
            size={16}
            class="text-neutral-700 drop-shadow-sm"
            fill="currentColor"
          />
        </div>

        <div
          ref={cardFlipRef}
          class="relative w-[260px] sm:w-[290px] md:w-[320px] h-[420px] sm:h-[460px] md:h-[500px] rounded-[20px] md:rounded-[24px] transform-style-3d will-change-transform"
          style={{ "transform-style": "preserve-3d" }}
          onClick={handleFlip}
        >
          <div
            class="absolute inset-0 w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden backface-hidden bg-neutral-900 shadow-[0_0_15px_rgba(0,0,0,0.5),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5"
            style={{ "backface-visibility": "hidden" }}
          >
            <div class="absolute top-0 left-0 w-full h-24 sm:h-28 md:h-32 bg-gradient-to-b from-neutral-800 to-neutral-900 border-b border-white/5">
              <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            </div>

            <div class="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 z-20">
              <Tooltip content="View Gallery" position="left">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/gallery");
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  class="text-neutral-600 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <ScanLine size={18} class="sm:w-5 sm:h-5" />
                </button>
              </Tooltip>
            </div>

            <div
              class="absolute top-10 sm:top-12 md:top-16 left-1/2 -translate-x-1/2 z-10 group backface-hidden"
              style={{ "backface-visibility": "hidden" }}
            >
              <div class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 sm:p-1.5 bg-gradient-to-br from-cyan-400 via-white to-purple-500 shadow-xl relative">
                <div class="w-full h-full rounded-full bg-neutral-900 border-4 border-neutral-900 overflow-hidden relative">
                  <Show
                    when={props.photoUrl}
                    fallback={
                      <User
                        size={48}
                        class="text-neutral-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-14 sm:h-14 md:w-16 md:h-16"
                      />
                    }
                  >
                    <img
                      src={props.photoUrl}
                      alt={props.name}
                      class="w-full h-full object-cover"
                    />
                  </Show>
                </div>
                <div class="absolute bottom-1 sm:bottom-1.5 md:bottom-2 right-1 sm:right-1.5 md:right-2 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 bg-green-500 border-2 sm:border-3 md:border-4 border-neutral-900 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
              </div>
            </div>
            <div class="mt-36 sm:mt-44 md:mt-52 px-4 sm:px-5 md:px-6 flex flex-col items-center text-center">
              <h1 class="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                {props.name}
              </h1>

              <div class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-neutral-800/80 border border-white/5 backdrop-blur-sm shadow-sm mb-4 sm:mb-6 md:mb-8">
                <Code size={12} class="text-cyan-400 sm:w-3.5 sm:h-3.5" />
                <span class="text-xs sm:text-sm font-semibold text-cyan-500 tracking-wide">
                  <RotatingText
                    texts={props.roles}
                    rotationInterval={2000}
                    mainClassName="text-cyan-500 min-w-[80px]"
                  />
                </span>
              </div>

              <div class="w-full">
                <div class="bg-neutral-800/30 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center hover:bg-neutral-800/50 transition-colors w-full">
                  <GraduationCap
                    size={20}
                    class="text-purple-400 mb-1.5 sm:mb-2 opacity-80 sm:w-6 sm:h-6"
                  />
                  <span class="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-0.5">
                    Major
                  </span>
                  <span class="text-base sm:text-lg font-mono font-medium text-neutral-200">
                    Information System
                  </span>
                </div>
              </div>
            </div>

            <div class="absolute bottom-6 left-0 w-full px-8 flex justify-between items-center opacity-60"></div>
          </div>

          <div
            class="absolute inset-0 w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden backface-hidden bg-white shadow-xl border border-neutral-200"
            style={{
              "backface-visibility": "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div class="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div class="flex flex-col h-full p-5 sm:p-6 md:p-8 items-center text-center">
              <div class="w-12 sm:w-14 md:w-16 h-0.5 sm:h-1 bg-neutral-200 rounded-full mb-4 sm:mb-6 md:mb-8"></div>

              <h2 class="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4 flex items-center gap-2">
                Hello, I'm Alvin Putra
              </h2>

              <p class="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-auto">
                {props.description}
              </p>

              <div
                class="social-icons-area w-full flex justify-center gap-3 sm:gap-4 py-4 sm:py-5 md:py-6 border-t border-neutral-100 mt-4 sm:mt-5 md:mt-6"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open("https://github.com/tsubametaa", "_blank");
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  class="social-icon-btn p-2.5 sm:p-3 rounded-full bg-neutral-100 hover:bg-neutral-800 hover:text-white transition-all transform hover:scale-110"
                >
                  <Github size={18} class="sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(
                      "https://linkedin.com/in/alvinfputra12",
                      "_blank",
                    );
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  class="social-icon-btn p-2.5 sm:p-3 rounded-full bg-neutral-100 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                >
                  <Linkedin size={18} class="sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href =
                      "mailto:alvinferinaputra2023@student.unas.ac.id";
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  class="social-icon-btn p-2.5 sm:p-3 rounded-full bg-neutral-100 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                >
                  <Mail size={18} class="sm:w-5 sm:h-5" />
                </button>
              </div>

              <div class="mt-3 sm:mt-4 w-full">
                <div class="bg-emerald-500/5 border border-emerald-500/20 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm flex items-center justify-center gap-2 sm:gap-3 group/status">
                  <div class="relative flex h-2.5 sm:h-3 w-2.5 sm:w-3">
                    <span class="relative inline-flex rounded-full h-2.5 sm:h-3 w-2.5 sm:w-3 bg-emerald-500"></span>
                  </div>
                  <span class="text-[10px] sm:text-xs text-emerald-600 font-bold uppercase tracking-widest group-hover/status:text-emerald-500 transition-colors">
                    Available For Hire
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanyardCard;
