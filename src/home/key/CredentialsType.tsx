import { Component, createSignal, onMount, createEffect, Show } from "solid-js";
import { Terminal, Copy, Check } from "lucide-solid";
import { Motion } from "solid-motionone";
import Background from "../introduction/bg/background";

const CredentialsType: Component = () => {
  const [content, setContent] = createSignal("");
  const [displayedContent, setDisplayedContent] = createSignal("");
  const [isTyping, setIsTyping] = createSignal(true);
  const [copied, setCopied] = createSignal(false);

  onMount(async () => {
    try {
      const response = await fetch("/assets/credentials.txt");
      if (response.ok) {
        const text = await response.text();
        setContent(text);
      } else {
        setContent("Error: Failed to load credentials.");
      }
    } catch (error) {
      setContent("Error: Failed to load credentials.");
    }
  });

  createEffect(() => {
    const text = content();
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedContent((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10); // Adjust speed here

    return () => clearInterval(interval);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(content());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section class="w-full min-h-screen pt-24 pb-12 px-4 md:px-8 relative overflow-hidden flex items-center justify-center">
      <Background />

      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        class="w-full max-w-4xl relative z-10"
      >
        <div class="w-full bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 flex flex-col font-mono text-sm sm:text-base relative group min-h-[500px]">
          {/* Header */}
          <div class="bg-slate-800/50 border-b border-white/5 px-4 py-3 flex items-center justify-between relative z-10 backdrop-blur-sm">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div class="flex items-center gap-2 text-slate-400 text-xs">
              <Terminal size={12} />
              <span>credentials.txt - cat</span>
            </div>
            <div class="flex items-center">
              <button
                onClick={handleCopy}
                class="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
                title="Copy to clipboard"
              >
                <Show when={copied()} fallback={<Copy size={14} />}>
                  <Check size={14} class="text-green-500" />
                </Show>
              </button>
            </div>
          </div>

          {/* Body */}
          <div class="p-6 md:p-8 space-y-4 relative z-10 bg-[#0d1117]/95 flex-1 overflow-auto">
            <div class="text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
              <span class="text-emerald-400 font-bold mr-2">
                testing@uta.dev:~$
              </span>
              <span class="text-yellow-300">cat</span> credentials.txt
              <br />
              <br />
              {displayedContent()}
              <Show when={isTyping()}>
                <span class="animate-pulse inline-block w-2.5 h-5 bg-emerald-500 ml-1 align-middle"></span>
              </Show>
            </div>
          </div>
        </div>
      </Motion.div>
    </section>
  );
};

export default CredentialsType;
