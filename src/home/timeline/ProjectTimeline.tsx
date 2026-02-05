import { Component, For } from "solid-js";
import { Motion } from "solid-motionone";
import {
  Briefcase,
  Layers,
  Globe,
  Smartphone,
  Hammer,
  BookOpen,
  Calendar,
} from "lucide-solid";

interface SubProject {
  title: string;
  description: string;
  icon: any;
}

interface TimelineItem {
  year: string;
  title: string;
  role: string;
  description: string;
  subProjects?: SubProject[];
  icon: any;
  color: string;
}

const ProjectTimeline: Component = () => {
  const timelineData: TimelineItem[] = [
    {
      year: "2024",
      title: "Freelinkd",
      role: "Full Stack Developer",
      description:
        "A comprehensive platform designed to bridge the gap between MSMEs (UMKM) and Freelancers, facilitating seamless collaboration and project management.",
      icon: Briefcase,
      color: "text-blue-400",
      subProjects: [],
    },
    {
      year: "2025",
      title: "Sagawa Group Ecosystem",
      role: "Backend Developer",
      description:
        "Spearheaded the digital transformation for Sagawa Group, delivering a suite of interconnected applications to streamline operations.",
      icon: Layers,
      color: "text-[#f57c00]",
      subProjects: [
        {
          title: "Sagawa Corporate Website",
          description: "Modern corporate identity and portfolio showcase.",
          icon: Globe,
        },
        {
          title: "Sagawa POS App",
          description: "Robust Point of Sale system for retail management.",
          icon: Smartphone,
        },
        {
          title: "AWA Construction by Sagawagroup",
          description: "Service platform for the renovation division.",
          icon: Hammer,
        },
      ],
    },
    {
      year: "2025",
      title: "Gerakan 7 Kebiasaan",
      role: "Full Stack Developer",
      description:
        "An educational initiative website promoting '7 Habits of Great Indonesian Children' for school programs.",
      icon: BookOpen,
      color: "text-[#4db6ac]",
      subProjects: [],
    },
  ];

  return (
    <section
      id="projects"
      class="w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 relative z-10"
    >
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Project <span class="text-cyan-400">Timeline</span>
          </h2>
          <div class="w-16 sm:w-20 h-1 bg-cyan-500 rounded-full mx-auto"></div>
        </div>

        <div class="relative">
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50 transform -translate-x-1/2 hidden md:block"></div>
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800 transform -translate-x-1/2 md:hidden"></div>

          <div class="space-y-8 sm:space-y-10 md:space-y-12">
            <For each={timelineData}>
              {(item, index) => (
                <div
                  class={`relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 ${index() % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div class="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <div
                      class={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full ${item.color.replace("text-", "bg-")} shadow-[0_0_10px_currentColor]`}
                    ></div>
                  </div>

                  <div
                    class={`hidden md:flex w-1/2 items-center ${index() % 2 === 0 ? "justify-start pl-12" : "justify-end pr-12"}`}
                  >
                    <div class="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-800/50 border border-white/5 backdrop-blur-sm">
                      <Calendar
                        size={14}
                        class="text-slate-400 sm:w-4 sm:h-4"
                      />
                      <span class="text-slate-200 font-mono text-xs sm:text-sm">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <div class="md:w-1/2 ml-12 md:ml-0">
                    <Motion.div
                      initial={{ opacity: 0, y: 20 }}
                      inView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index() * 0.1 }}
                      class="relative bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl hover:border-cyan-500/30 transition-colors duration-300 group"
                    >
                      {/* Mobile Date Label */}
                      <div class="md:hidden inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-slate-800/50 border border-white/5 mb-3 sm:mb-4">
                        <Calendar
                          size={12}
                          class="text-slate-400 sm:w-3.5 sm:h-3.5"
                        />
                        <span class="text-slate-200 font-mono text-[10px] sm:text-xs">
                          {item.year}
                        </span>
                      </div>

                      <div class="flex items-start justify-between mb-2">
                        <div>
                          <h3 class="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h3>
                          <span
                            class={`text-xs sm:text-sm font-medium ${item.color} font-mono`}
                          >
                            {item.role}
                          </span>
                        </div>
                        <div
                          class={`p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-white/5 ${item.color}`}
                        >
                          <item.icon size={16} class="sm:w-5 sm:h-5" />
                        </div>
                      </div>

                      <p class="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                        {item.description}
                      </p>

                      {/* Sub Projects for Sagawa */}
                      {item.subProjects && item.subProjects.length > 0 && (
                        <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5 space-y-2 sm:space-y-3">
                          <span class="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5 sm:mb-2">
                            Key Deliverables
                          </span>
                          <For each={item.subProjects}>
                            {(sub) => (
                              <div class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-md sm:rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                <div class="p-1 sm:p-1.5 rounded-md bg-slate-800 text-slate-300">
                                  <sub.icon
                                    size={12}
                                    class="sm:w-3.5 sm:h-3.5"
                                  />
                                </div>
                                <div>
                                  <h4 class="text-xs sm:text-sm font-semibold text-slate-200">
                                    {sub.title}
                                  </h4>
                                  <p class="text-[10px] sm:text-xs text-slate-500">
                                    {sub.description}
                                  </p>
                                </div>
                              </div>
                            )}
                          </For>
                        </div>
                      )}
                    </Motion.div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectTimeline;
