import { Component } from "solid-js";
import { FileDown, Eye, ExternalLink } from "lucide-solid";
import { A } from "@solidjs/router";
import { Motion } from "solid-motionone";

const CvSection: Component = () => {
  const cvPath = "/Alvin_Ferina_Putra_CV.pdf";

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      inView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      class="flex flex-wrap gap-4 mt-6"
    >
      <A
        href="/cv"
        class="group flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-cyan-500/30 text-cyan-400 rounded-xl font-medium hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
      >
        <Eye size={18} />
        <span>View Full CV</span>
      </A>
    </Motion.div>
  );
};

export default CvSection;
