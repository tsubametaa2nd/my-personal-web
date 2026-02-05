import { Component, JSX, Show, createSignal } from "solid-js";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: string | JSX.Element;
  children: JSX.Element;
  position?: TooltipPosition;
  delay?: number;
}

const Tooltip: Component<TooltipProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false);
  let timeoutId: number;

  const showTooltip = () => {
    timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, props.delay || 200);
  };

  const hideTooltip = () => {
    window.clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // Animation classes based on position
  const animationClasses = {
    top: isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
    bottom: isVisible()
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-2",
    left: isVisible() ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
    right: isVisible()
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-2",
  };

  const pos = props.position || "top";

  return (
    <div
      class="relative inline-block group z-50"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {props.children}

      <div
        class={`
          absolute z-[100] w-max max-w-xs pointer-events-none
          ${positionClasses[pos]}
          trasition-all duration-300 ease-out
          ${animationClasses[pos]}
        `}
      >
        <div class="relative bg-[#0a0a0a] border border-emerald-500/30 text-slate-300 text-xs px-3 py-1.5 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.15)] font-mono backdrop-blur-md">
          <span class="absolute -top-px -left-px w-2 h-2 border-t border-l border-emerald-500 rounded-tl-sm opacity-50"></span>
          <span class="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-emerald-500 rounded-br-sm opacity-50"></span>

          <div class="flex items-center gap-2">
            <span class="text-emerald-500 font-bold">$</span>
            <span class="whitespace-pre-wrap">{props.content}</span>
          </div>

          <Show when={pos === "top"}>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a0a] border-b border-r border-emerald-500/30 rotate-45 transform"></div>
          </Show>
          <Show when={pos === "bottom"}>
            <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a0a] border-t border-l border-emerald-500/30 rotate-45 transform"></div>
          </Show>
          <Show when={pos === "left"}>
            <div class="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#0a0a0a] border-t border-r border-emerald-500/30 rotate-45 transform"></div>
          </Show>
          <Show when={pos === "right"}>
            <div class="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0a0a0a] border-b border-l border-emerald-500/30 rotate-45 transform"></div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
