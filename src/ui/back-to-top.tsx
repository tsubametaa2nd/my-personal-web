import { createSignal, onMount, onCleanup } from "solid-js";
import { Plane, Cloud } from "lucide-solid";

export default function BackToTop() {
  const [progress, setProgress] = createSignal(0);
  const [isVisible, setIsVisible] = createSignal(false);
  const [isFlying, setIsFlying] = createSignal(false);

  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    const newProgress = Math.min(Math.max(scrollPercent, 0), 1) * 100;
    setProgress(newProgress);

    if (scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    setIsFlying(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsFlying(false);
    }, 1500);
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return (
    <button
      onClick={scrollToTop}
      class={`fixed bottom-8 right-8 z-50 rounded-full 
        transition-all duration-500 ease-out group
        ${isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"}
      `}
      aria-label="Back to top"
    >
      <div class="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          class="-rotate-90 transform drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="currentColor"
            class="text-slate-900/90 backdrop-blur-xl"
            stroke="none"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
            class="text-white/10"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
            stroke-linecap="round"
            class="text-blue-500 transition-all duration-150 ease-linear"
            style={{
              "stroke-dasharray": `${circumference}`,
              "stroke-dashoffset": `${circumference - (progress() / 100) * circumference}`,
            }}
          />
        </svg>

        <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-full z-30">
          <div
            class={`absolute inset-0 transition-opacity duration-300 ${isFlying() ? "opacity-100" : "opacity-0"}`}
          >
            <Cloud
              class={`absolute w-4 h-4 text-white/80 left-2 top-1/2 
                  transition-all duration-[1000ms] ease-out
                  ${isFlying() ? "translate-y-8 opacity-0 scale-50" : "-translate-y-4 opacity-0 scale-50"}
                `}
            />
            <Cloud
              class={`absolute w-3 h-3 text-white/60 right-3 top-1/3 
                  transition-all duration-[1200ms] ease-out delay-75
                  ${isFlying() ? "translate-y-10 opacity-0 scale-50" : "-translate-y-4 opacity-0 scale-50"}
                `}
            />
            <Cloud
              class={`absolute w-5 h-5 text-blue-200/50 left-1/2 bottom-2 
                  transition-all duration-[800ms] ease-out delay-150
                  ${isFlying() ? "translate-y-12 opacity-0 scale-150" : "translate-y-0 opacity-0 scale-50"}
                `}
            />
          </div>

          <div
            class={`relative flex items-center justify-center transition-all duration-700 ease-in-out z-40
              ${isFlying() ? "-translate-y-12 opacity-0 scale-75" : "translate-y-0 opacity-100 scale-100"}
           `}
          >
            <Plane
              class={`w-6 h-6 text-white transition-all duration-300 
                  ${!isFlying() ? "group-hover:-translate-y-1 group-hover:text-blue-400" : "text-blue-400"}
                `}
            />

            <div
              class={`absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-t from-transparent to-blue-500 rounded-full blur-[1px]
                transition-opacity duration-300 ${isFlying() ? "opacity-100" : "opacity-0"}
             `}
            />
          </div>
        </div>

        <div class="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      </div>
    </button>
  );
}
