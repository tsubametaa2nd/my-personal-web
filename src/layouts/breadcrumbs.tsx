import { Component, For, Show } from "solid-js";
import { useLocation, A } from "@solidjs/router";

const Breadcrumbs: Component = () => {
  const location = useLocation();

  const pathnames = () => location.pathname.split("/").filter((x) => x);

  return (
    <nav
      class="flex items-center text-sm font-mono py-2"
      aria-label="Breadcrumb"
    >
      <div class="text-emerald-500/50 mr-2 select-none">$</div>
      <div class="flex items-center">
        <div class="flex items-center group">
          <A
            href="/"
            class="text-slate-500 hover:text-emerald-400 transition-colors"
          >
            root
          </A>
        </div>

        <For each={pathnames()}>
          {(value, index) => {
            const isLast = index() === pathnames().length - 1;
            const to = `/${pathnames()
              .slice(0, index() + 1)
              .join("/")}`;

            return (
              <div class="flex items-center">
                <span class="text-slate-600 mx-1">/</span>
                <Show
                  when={!isLast}
                  fallback={
                    <span class="text-emerald-400 font-bold">{value}</span>
                  }
                >
                  <A
                    href={to}
                    class="text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {value}
                  </A>
                </Show>
              </div>
            );
          }}
        </For>

        {/* Blinking block cursor */}
        <div class="ml-2 w-2.5 h-5 bg-emerald-500/50 animate-pulse" />
      </div>
    </nav>
  );
};

export default Breadcrumbs;
