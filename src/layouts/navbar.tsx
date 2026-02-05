import {
  Component,
  createSignal,
  For,
  Show,
  onMount,
  onCleanup,
} from "solid-js";
import { Motion } from "solid-motionone";
import { Menu, X, Terminal, Code2 } from "lucide-solid";
import { useLocation, useNavigate } from "@solidjs/router";

const Navbar: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal("Home");
  const [isScrolled, setIsScrolled] = createSignal(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Stack", href: "#stack" },
    { name: "Projects", href: "#projects" },
  ];

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  const scrollToSection = (e: Event, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const isHomePage = location.pathname === "/";

    if (href === "/" || href === "#home") {
      if (!isHomePage) {
        navigate("/");
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveTab("Home");
      return;
    }

    if (href.startsWith("#")) {
      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveTab(navItems.find((i) => i.href === href)?.name || "");
        }
      } else {
        navigate("/" + href);
      }
    }
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      class={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-mono ${
        isScrolled() ? "py-4" : "py-6"
      }`}
    >
      <div class="max-w-6xl mx-auto px-4">
        <div
          class={`transition-all duration-300 rounded-xl px-2 md:px-6 py-2 md:py-3 flex items-center justify-between relative overflow-hidden group
            ${
              isScrolled()
                ? "bg-[#0d1117]/80 backdrop-blur-md border border-slate-800 shadow-xl"
                : "bg-transparent border-transparent"
            }`}
        >
          <a
            href="/"
            onClick={(e) => scrollToSection(e, "/")}
            class="flex items-center gap-3 z-10 cursor-pointer group/logo pl-2"
          >
            <span class="text-lg font-bold tracking-tight text-slate-200">
              <span class="text-blue-500">&lt;</span>
              <span class="group-hover/logo:text-green-400 transition-colors duration-300">
                UTA
              </span>
              .DEV
              <span class="text-blue-500">/&gt;</span>
            </span>
          </a>

          <div class="hidden md:flex items-center gap-1">
            <For each={navItems}>
              {(item) => (
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  class={`relative px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 z-10 
                    ${
                      activeTab() === item.name
                        ? "text-blue-400"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                >
                  {activeTab() === item.name && (
                    <Motion.div
                      class="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-md"
                      transition={{
                        duration: 0.2,
                        easing: "ease-in-out",
                      }}
                    >
                      <div class="absolute bottom-1 right-2 w-1.5 h-3 bg-blue-500/50 animate-pulse hidden" />
                    </Motion.div>
                  )}
                  <span class="relative z-10 flex items-center gap-1">
                    {item.name}
                  </span>
                </a>
              )}
            </For>
          </div>

          <div class="hidden md:block z-10">
            <button
              onClick={(e) =>
                scrollToSection(e as unknown as Event, "#contact")
              }
              class="cursor-pointer px-5 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg font-semibold text-sm hover:border-blue-500/50 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all flex items-center gap-2 group/btn"
            >
              <Terminal size={14} class="text-emerald-500" />
              <span>
                <span class="text-emerald-500 mr-1">~/</span>
                let's talk
              </span>
              <div class="w-1.5 h-3 bg-emerald-500 animate-pulse opacity-0 group-hover/btn:opacity-100" />
            </button>
          </div>

          <button
            class="md:hidden p-2 text-slate-300 hover:text-white bg-slate-800/50 rounded-lg border border-slate-700"
            onClick={() => setIsOpen(!isOpen())}
          >
            <Show when={isOpen()} fallback={<Menu size={20} />}>
              <X size={20} />
            </Show>
          </button>
        </div>

        <Show when={isOpen()}>
          <div class="md:hidden mt-2 p-2 bg-[#0d1117] border border-slate-800 rounded-xl shadow-xl flex flex-col gap-1">
            <div class="px-4 py-2 border-b border-slate-800 mb-1">
              <span class="text-xs text-slate-500 font-mono">
                // Navigation
              </span>
            </div>
            <For each={navItems}>
              {(item) => (
                <a
                  href={item.href}
                  class={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-mono
                     ${
                       activeTab() === item.name
                         ? "bg-blue-500/10 text-blue-400 border border-blue-500/10"
                         : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                     }`}
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  <span class="font-medium">{item.name}</span>
                </a>
              )}
            </For>
            <button
              onClick={(e) =>
                scrollToSection(e as unknown as Event, "#contact")
              }
              class="cursor-pointer mt-2 w-full py-3 bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg font-bold shadow-lg font-mono flex items-center justify-center gap-2"
            >
              <Terminal size={16} />
              <span>$ sh contact_me.sh</span>
            </button>
          </div>
        </Show>
      </div>
    </nav>
  );
};

export default Navbar;
