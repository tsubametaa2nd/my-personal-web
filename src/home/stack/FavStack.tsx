import { Component, createSignal, onMount, onCleanup, For } from "solid-js";
import { Motion } from "solid-motionone";

const FavStack: Component = () => {
  const [frontendIndex, setFrontendIndex] = createSignal(0);
  const [isHovered, setIsHovered] = createSignal(false);

  const frameworks = [
    {
      name: "Astro",
      icon: "/assets/astro.svg",
      color: "hover:shadow-orange-500/50",
      border: "hover:border-orange-500/50",
      bg: "hover:bg-orange-500/10",
    },
    {
      name: "Vue",
      icon: "/assets/vue.svg",
      color: "hover:shadow-emerald-500/50",
      border: "hover:border-emerald-500/50",
      bg: "hover:bg-emerald-500/10",
    },
    {
      name: "React",
      icon: "/assets/react.svg",
      color: "hover:shadow-blue-500/50",
      border: "hover:border-blue-500/50",
      bg: "hover:bg-blue-500/10",
    },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      if (!isHovered()) {
        setFrontendIndex((prev) => (prev + 1) % frameworks.length);
      }
    }, 2000);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="w-full max-w-4xl mx-auto mt-8 sm:mt-12 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none"></div>

      <div class="relative z-10">
        <div class="text-center mb-6 sm:mb-8">
          <h3 class="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
            My Favorite Stack
          </h3>
          <p class="text-slate-400 text-xs sm:text-sm mt-2">
            The core technologies I love building with
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8">
          <div class="relative w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-32 group">
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-md border border-white/5 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-green-500/50 group-hover:bg-green-500/10 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <img
                src="/assets/mongodb.svg"
                alt="MongoDB"
                class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all"
              />
              <span class="text-xs sm:text-sm font-mono text-slate-400 group-hover:text-green-400">
                MongoDB
              </span>
            </div>
          </div>

          <div class="w-6 h-0.5 bg-gradient-to-r from-green-500/20 to-slate-500/20 hidden sm:block md:w-8"></div>

          <div class="relative w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-32 group">
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-md border border-white/5 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-white/50 group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <img
                src="/assets/expressjs.svg"
                alt="Express"
                class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all invert opacity-80 group-hover:opacity-100"
                style="filter: invert(1);"
              />
              <span class="text-xs sm:text-sm font-mono text-slate-400 group-hover:text-white">
                Express
              </span>
            </div>
          </div>

          <div class="w-6 h-0.5 bg-gradient-to-r from-slate-500/20 to-blue-500/20 hidden sm:block md:w-8"></div>

          <div
            class="relative w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-32 perspective-[1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <For each={frameworks}>
              {(fw, i) => {
                const offset = () => (i() - frontendIndex() + 3) % 3;
                const isActive = () => offset() === 0;

                return (
                  <Motion.div
                    animate={{
                      y: isActive() ? 0 : isHovered() ? 0 : -40,
                      scale: isActive() ? 1 : isHovered() ? 0.9 : 0.5,
                      opacity: isActive() ? 1 : 0,
                      filter: isActive() ? "blur(0px)" : "blur(10px)",
                      zIndex: isActive() ? 20 : 0,
                    }}
                    transition={{ duration: 0.5, easing: "ease-in-out" }}
                    class={`absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-md border border-white/5 shadow-xl transition-colors duration-300 ${isActive() ? fw.border : ""} ${isActive() ? fw.bg : ""}`}
                    style={{ "transform-origin": "bottom center" }}
                  >
                    {" "}
                    <img
                      src={fw.icon}
                      alt={fw.name}
                      class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 drop-shadow-lg"
                    />
                    <span class="text-xs sm:text-sm font-mono text-slate-400">
                      {fw.name}
                    </span>
                  </Motion.div>
                );
              }}
            </For>
          </div>

          <div class="w-6 h-0.5 bg-gradient-to-r from-blue-500/20 to-green-500/20 hidden sm:block md:w-8"></div>

          <div class="relative w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-32 group">
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-md border border-white/5 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <img
                src="/assets/nodejs.svg"
                alt="Node.js"
                class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all"
              />
              <span class="text-xs sm:text-sm font-mono text-slate-400 group-hover:text-emerald-400">
                Node.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavStack;
