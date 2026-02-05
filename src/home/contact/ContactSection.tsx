import { Component, createSignal, Show } from "solid-js";
import {
  Send,
  Terminal,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Github,
  Linkedin,
} from "lucide-solid";
import { Motion } from "solid-motionone";
import { onMount, onCleanup } from "solid-js";

const ContactSection: Component = () => {
  const [isFormVisible, setIsFormVisible] = createSignal(false);
  const [typedCommand, setTypedCommand] = createSignal("");
  const fullCommand = "./send-message.exe";

  let terminalRef: HTMLDivElement | undefined;
  const [isTerminalInView, setIsTerminalInView] = createSignal(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTerminalInView()) {
            setIsTerminalInView(true);
            setTimeout(startTyping, 500); // Wait 0.5s after scroll before typing starts
          }
        });
      },
      { threshold: 0.3 },
    );

    if (terminalRef) observer.observe(terminalRef);

    onCleanup(() => observer.disconnect());
  });

  const startTyping = () => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullCommand.length) {
        setTypedCommand((prev) => prev + fullCommand.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setIsFormVisible(true);
        }, 500);
      }
    }, 100);
  };
  const [formData, setFormData] = createSignal({
    name: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = createSignal<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [activeField, setActiveField] = createSignal<string | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!formData().name || !formData().message) return;

    setStatus("sending");
    // Simulate API delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="contact"
      class="w-full py-12 sm:py-16 md:py-20 px-4 md:px-8 relative z-10"
    >
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column: Context & Info */}
        <div class="space-y-6 md:space-y-8 order-2 lg:order-1">
          <div class="relative">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Let's <span class="text-emerald-400">Connect</span>
            </h2>
            <div class="w-16 h-1 bg-emerald-500 rounded-full"></div>
          </div>

          <p class="text-slate-300 text-base md:text-lg leading-relaxed">
            Have a project in mind or just want to chat about tech? Initialize a
            connection protocol below. I'm always open to discussing new ideas,
            collaborations, or opportunities.
          </p>

          <div class="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-12">
            {/* Email */}
            <div class="group relative">
              <a
                href="mailto:contact@alvin.dev"
                class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/20"
              >
                <Mail size={20} class="sm:w-6 sm:h-6" />
              </a>
              {/* Tooltip */}
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
                <div class="bg-[#0d1117] border border-slate-700/50 rounded-xl p-4 shadow-2xl backdrop-blur-md flex flex-col items-center gap-2 relative">
                  <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    Email Address
                  </span>
                  <span class="text-white font-mono hover:text-emerald-400 transition-colors">
                    contact@alvin.dev
                  </span>
                  {/* Arrow */}
                  <div class="w-3 h-3 bg-[#0d1117] border-r border-b border-slate-700/50 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </div>

            {/* GitHub */}
            <div class="group relative">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/50 group-hover:bg-white/5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-white/10">
                <Github size={20} class="sm:w-6 sm:h-6" />
              </div>
              {/* Tooltip */}
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
                <div class="bg-[#0d1117] border border-slate-700/50 rounded-xl p-4 shadow-2xl backdrop-blur-md flex flex-col items-center gap-2 relative">
                  <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    GitHub Profiles
                  </span>
                  <div class="flex flex-col gap-1 text-center">
                    <a
                      href="https://github.com/tsubametaa"
                      target="_blank"
                      class="text-white font-mono hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      <span>@tsubametaa</span>
                    </a>
                    <div class="h-px w-full bg-slate-800"></div>
                    <a
                      href="https://github.com/tsubametaa2nd"
                      target="_blank"
                      class="text-white font-mono hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      <span>@tsubametaa2nd</span>
                    </a>
                  </div>
                  {/* Arrow */}
                  <div class="w-3 h-3 bg-[#0d1117] border-r border-b border-slate-700/50 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div class="group relative">
              <a
                href="https://linkedin.com/in/alvinputra"
                target="_blank"
                class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/20"
              >
                <Linkedin size={20} class="sm:w-6 sm:h-6" />
              </a>
              {/* Tooltip */}
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
                <div class="bg-[#0d1117] border border-slate-700/50 rounded-xl p-4 shadow-2xl backdrop-blur-md flex flex-col items-center gap-2 relative">
                  <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    LinkedIn Profile
                  </span>
                  <span class="text-white font-mono hover:text-blue-400 transition-colors">
                    Alvin Putra
                  </span>
                  {/* Arrow */}
                  <div class="w-3 h-3 bg-[#0d1117] border-r border-b border-slate-700/50 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Form */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          inView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          class="order-1 lg:order-2"
        >
          <div
            ref={terminalRef}
            class="w-full bg-[#0d1117] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 flex flex-col font-mono text-xs sm:text-sm relative group min-h-[350px] sm:min-h-[380px] md:min-h-[400px]"
          >
            {/* Glow Effect */}
            <div class="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur transition duration-1000 pointer-events-none"></div>

            {/* macOS-style Header */}
            <div class="bg-slate-800/50 border-b border-white/5 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between relative z-10 backdrop-blur-sm">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div class="flex items-center gap-1.5 sm:gap-2 text-slate-400 text-[10px] sm:text-xs">
                <Terminal size={10} class="sm:w-3 sm:h-3" />
                <span class="hidden xs:inline">bash — contact-form</span>
                <span class="xs:hidden">terminal</span>
              </div>
              <div class="w-8 sm:w-10"></div> {/* Spacer for alignment */}
            </div>

            {/* Terminal Body */}
            <div class="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 relative z-10 bg-[#0d1117]/95 flex-1 flex flex-col">
              {/* Command Line Prompt */}
              <div class="flex items-center gap-2 sm:gap-3 text-slate-300 mb-1 sm:mb-2 flex-wrap">
                <span class="text-emerald-400 font-bold text-xs sm:text-sm">
                  visitor@uta.dev:~$
                </span>
                <span class="typing-effect text-xs sm:text-sm">
                  {typedCommand()}
                  <span class="animate-pulse inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-slate-500 ml-1 align-middle"></span>
                </span>
              </div>

              <Show when={isFormVisible()}>
                <form
                  onSubmit={handleSubmit}
                  class="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500"
                >
                  {/* Name Field */}
                  <div
                    class={`transition-all duration-300 ${activeField() === "name" ? "opacity-100" : "opacity-80"}`}
                  >
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-blue-400 font-bold">{">"}</span>
                      <label class="text-slate-200 font-bold">
                        Input Name:
                      </label>
                    </div>
                    <input
                      type="text"
                      value={formData().name}
                      onInput={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.currentTarget.value,
                        }))
                      }
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      placeholder="_"
                      class="w-full bg-transparent border-b border-slate-700 focus:border-emerald-500 outline-none py-1 text-emerald-300 placeholder:text-slate-600 transition-colors"
                    />
                  </div>

                  {/* Subject Field */}
                  <div
                    class={`transition-all duration-300 ${activeField() === "subject" ? "opacity-100" : "opacity-80"}`}
                  >
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-blue-400 font-bold">{">"}</span>
                      <label class="text-slate-200 font-bold">
                        Subject (Optional):
                      </label>
                    </div>
                    <input
                      type="text"
                      value={formData().subject}
                      onInput={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.currentTarget.value,
                        }))
                      }
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      placeholder="_"
                      class="w-full bg-transparent border-b border-slate-700 focus:border-emerald-500 outline-none py-1 text-emerald-300 placeholder:text-slate-600 transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div
                    class={`transition-all duration-300 ${activeField() === "message" ? "opacity-100" : "opacity-80"}`}
                  >
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-blue-400 font-bold">{">"}</span>
                      <label class="text-slate-200 font-bold">
                        Message Packet:
                      </label>
                    </div>
                    <textarea
                      value={formData().message}
                      onInput={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.currentTarget.value,
                        }))
                      }
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      rows={4}
                      placeholder="Write your message stream here..."
                      class="w-full bg-slate-800/30 border border-slate-700 rounded-md focus:border-emerald-500 outline-none p-3 text-emerald-300 placeholder:text-slate-600 transition-all resize-none mt-1"
                    />
                  </div>

                  {/* Submit Button Area */}
                  <div class="pt-4  border-t border-slate-800/50 mt-4">
                    <button
                      type="submit"
                      disabled={
                        status() === "sending" || status() === "success"
                      }
                      class="w-full group relative flex items-center justify-center gap-3 py-3 px-4 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 rounded transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Show when={status() === "idle"}>
                        <span class="font-bold tracking-widest uppercase text-xs">
                          [ EXECUTE_SEND ]
                        </span>
                        <Send
                          size={16}
                          class="group-hover:translate-x-1 transition-transform"
                        />
                      </Show>

                      <Show when={status() === "sending"}>
                        <Loader2 size={18} class="animate-spin" />
                        <span class="text-xs font-mono">
                          UPLOADING_PACKET...
                        </span>
                      </Show>

                      <Show when={status() === "success"}>
                        <CheckCircle2 size={18} />
                        <span class="text-xs font-mono">
                          TRANSMISSION_COMPLETE
                        </span>
                      </Show>
                    </button>

                    {/* Validation / Status Output */}
                    <div class="mt-3 min-h-[20px] text-xs font-mono">
                      <Show when={status() === "success"}>
                        <p class="text-green-400 flex items-center gap-2">
                          <span class="font-bold">{">"}</span> System: Message
                          received. Acknowledgment sent to outbox.
                        </p>
                      </Show>
                      <Show when={status() === "sending"}>
                        <p class="text-yellow-400 flex items-center gap-2">
                          <span class="font-bold">{">"}</span> System:
                          Establishing secure connection...
                        </p>
                      </Show>
                      <Show when={status() === "idle"}>
                        <p class="text-slate-500 flex items-center gap-2 animate-pulse">
                          <span class="font-bold text-blue-500">{">"}</span>{" "}
                          Awaiting user input...{" "}
                          <span class="w-2 h-4 bg-blue-500 block"></span>
                        </p>
                      </Show>
                    </div>
                  </div>
                </form>
              </Show>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
