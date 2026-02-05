import { Component, For } from "solid-js";
import { Motion } from "solid-motionone";
import FavStack from "./FavStack";

const StackSection: Component = () => {
  const otherSkills = [
    { name: "Figma", icon: "/assets/figma.svg", category: "Tool" },
    { name: "Astro", icon: "/assets/astro.svg", category: "Framework" },
    { name: "React", icon: "/assets/react.svg", category: "Framework" },
    { name: "Vue", icon: "/assets/vue.svg", category: "Framework" },
    { name: "TypeScript", icon: "/assets/ts.svg", category: "Language" },
    { name: "Go", icon: "/assets/go.svg", category: "Language" },
    { name: "Cassandra", icon: "/assets/cassandra.svg", category: "Database" },
    { name: "GitHub", icon: "/assets/github.svg", category: "Tool" },
  ];

  return (
    <section
      id="stack"
      class="w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 relative z-10"
    >
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Tech <span class="text-cyan-400">Stack</span>
          </h2>
          <div class="w-16 sm:w-20 h-1 bg-cyan-500 rounded-full mx-auto"></div>
          <p class="text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            A curated list of technologies I use to build performant and
            scalable web applications.
          </p>
        </div>

        <FavStack />

        <div class="mt-12 sm:mt-16 md:mt-20">
          <h3 class="text-xl font-bold text-white mb-6 sm:mb-8 text-center md:text-left flex items-center gap-3">
            <span class="w-full h-0.5 bg-slate-700 block md:hidden"></span>
            <span class="w-full h-0.5 bg-slate-700 hidden md:block opacity-30"></span>
          </h3>

          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            <For each={otherSkills}>
              {(skill, index) => (
                <Motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  inView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index() * 0.05 }}
                  class="group relative bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 hover:-translate-y-1"
                >
                  <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <span class="text-[10px] sm:text-xs md:text-sm font-medium text-slate-300 group-hover:text-cyan-400 text-center">
                    {skill.name}
                  </span>
                </Motion.div>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
