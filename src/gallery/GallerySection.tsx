import { Component, For } from "solid-js";
import { Motion } from "solid-motionone";
import { useGallery } from "../hook/galleryHook";
import { CategorySelector } from "./ui/category";
import Breadcrumbs from "../layouts/breadcrumbs";

const GallerySection: Component = () => {
  const { filteredItems, categories, selectedCategory, setSelectedCategory } =
    useGallery();

  return (
    <div class="min-h-screen w-full bg-[#0a0a0a] text-slate-200 p-4 md:p-8 font-mono relative overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div class="max-w-7xl mx-auto relative z-10">
        <Motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          class="mb-12 pt-8"
        >
          <div class="mb-4">
            <Breadcrumbs />
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Process_Gallery<span class="animate-pulse text-emerald-500">_</span>
          </h1>
          <p class="text-slate-500 max-w-2xl text-lg">
            Executing visual dump of recent activities.
            <span class="text-emerald-500/70 block mt-2 text-sm">
              // Click on files to inspect metadata.
            </span>
          </p>
        </Motion.header>

        {/* Category Filter */}
        <CategorySelector
          categories={categories}
          selected={selectedCategory()}
          onSelect={setSelectedCategory}
        />

        {/* Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          <For
            each={filteredItems()}
            fallback={
              <div class="col-span-full text-center py-20 text-slate-600 border border-dashed border-slate-800 rounded-lg">
                Directory is empty.
              </div>
            }
          >
            {(item) => (
              <Motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                class="group relative bg-[#111] border border-slate-800 rounded-lg overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1"
              >
                {/* Card Header (Terminal Style) */}
                <div class="flex items-center justify-between px-3 py-2 bg-[#1a1a1a] border-b border-slate-800 group-hover:bg-emerald-950/20 transition-colors">
                  <div class="flex items-center gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div class="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span class="text-xs text-slate-500 group-hover:text-emerald-400/80 transition-colors font-mono">
                    {item.id}.jpg
                  </span>
                </div>

                {/* Image Container */}
                <div class="aspect-video relative overflow-hidden bg-slate-900 group">
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="lazy"
                    class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
                  />

                  {/* Scanned Line Effect */}
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {/* Overlay Info */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span class="text-emerald-400 text-xs mb-1 opacity-70">
                      &lt;caption&gt;
                    </span>
                    <p class="text-white text-sm font-medium leading-relaxed font-sans">
                      {item.caption}
                    </p>
                    <span class="text-emerald-400 text-xs mt-1 opacity-70">
                      &lt;/caption&gt;
                    </span>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div class="p-3 bg-[#0d0d0d] border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-mono">
                  <div class="flex gap-3">
                    <span
                      class="hover:text-slate-300 transition-colors cursor-help"
                      title="File Size"
                    >
                      SIZE: {item.size}
                    </span>
                    <span class="hover:text-slate-300 transition-colors">
                      DATE: {item.date}
                    </span>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-slate-800/50 text-slate-400 border border-slate-700/50 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors uppercase text-[10px] tracking-wider">
                    {item.category}
                  </span>
                </div>
              </Motion.div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
