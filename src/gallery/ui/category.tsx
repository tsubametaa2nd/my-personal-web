import { Component, For, Show } from "solid-js";
import { Category } from "../../hook/galleryHook";

interface CategorySelectorProps {
  categories: Category[];
  selected: Category;
  onSelect: (category: Category) => void;
}

export const CategorySelector: Component<CategorySelectorProps> = (props) => {
  return (
    <div class="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 overflow-x-auto no-scrollbar border-b border-slate-800/50 mb-8">
      <div class="flex items-center gap-2 font-mono text-emerald-500 shrink-0 select-none">
        <span class="animate-pulse">❯</span>
        <span class="text-slate-400">ls -la ./gallery/</span>
      </div>

      <div class="flex flex-wrap gap-2">
        <For each={props.categories}>
          {(cat) => (
            <button
              onClick={() => props.onSelect(cat)}
              class={`
                group relative px-4 py-1.5 font-mono text-sm transition-all duration-200 rounded cursor-pointer
                ${
                  props.selected === cat
                    ? "text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                    : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                }
              `}
            >
              <span
                class={`mr-2 text-emerald-600 transition-opacity ${props.selected === cat ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
              >
                ./
              </span>
              {cat}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
