import { Component } from "solid-js";
import { GraduationCap, FileText, ArrowRight } from "lucide-solid";
import { Motion } from "solid-motionone";
import CvSection from "./cv/cv_section";

const AboutSection: Component = () => {
  return (
    <section
      id="about"
      class="w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 relative z-10"
    >
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div class="space-y-4 sm:space-y-6">
          <div class="relative">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              About <span class="text-cyan-400">Me</span>
            </h2>
            <div class="w-16 h-1 bg-cyan-500 rounded-full"></div>
          </div>

          <div class="text-slate-300 space-y-3 sm:space-y-4 leading-relaxed text-base sm:text-lg">
            <p>
              Hello! I'm{" "}
              <span class="text-white font-semibold">Alvin Ferina Putra</span>,
              a passionate developer who bridges the gap between complex backend
              logic and intuitive user experiences. With a strong foundation in
              modern web technologies, I specialize in building scalable
              applications that solve{" "}
              <span class="text-cyan-400">real-world problems</span>.
            </p>
            <p>
              I thrive in collaborative environments and am always eager to
              learn new tools to improve my craft. Whether it's optimizing
              database queries or tweaking UI animations, I pay attention to
              every detail.
            </p>
          </div>

          <CvSection />
        </div>

        <Motion.div
          class="relative group"
          initial={{ opacity: 0, y: 50 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, easing: "ease-out" }}
        >
          <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div class="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <GraduationCap size={24} class="text-cyan-400 sm:w-7 sm:h-7" />
              <h3 class="text-xl sm:text-2xl font-bold text-white">
                Education
              </h3>
            </div>

            <div class="relative pl-4 sm:pl-6 border-l-2 border-slate-700/50 space-y-2">
              <div class="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>

              <h4 class="text-lg sm:text-xl font-bold text-slate-100">
                Bachelor of Information System
              </h4>
              <div class="flex items-center gap-2 text-xs sm:text-sm text-cyan-300 font-mono mb-2 flex-wrap">
                <span>National University</span>
                <span>•</span>
                <span>2023 - 2027</span>
              </div>

              <p class="text-slate-400 leading-relaxed text-xs sm:text-sm">
                I specialize in creating reliable apps by fusing a thorough
                grasp of the Software Development Life Cycle (SDLC) with a
                strong foundation in programming fundamentals. I concentrate on
                developing technology-driven business systems that are both
                strategic and functional, providing users and stakeholders with
                real value from the first system analysis to implementation.
              </p>
            </div>

            {/* Decorative Background Element */}
            <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
