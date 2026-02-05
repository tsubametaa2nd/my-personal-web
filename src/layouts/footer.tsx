import { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <footer class="w-full py-6 sm:py-8 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>

      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-24 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

      <div class="container mx-auto px-4 text-center relative z-10">
        <p class="text-slate-500 text-xs sm:text-sm font-mono tracking-wide">
          &copy; {new Date().getFullYear()}{" "}
          <span class="text-slate-300 hover:text-emerald-400 transition-colors cursor-default selection:bg-emerald-500/30">
            Alvin Putra
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
