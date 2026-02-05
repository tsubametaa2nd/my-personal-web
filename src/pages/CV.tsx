import { Component } from "solid-js";
import { FileDown, ArrowLeft } from "lucide-solid";
import { A } from "@solidjs/router";
import Navbar from "../layouts/navbar";
import Footer from "../layouts/footer";
import Background from "../home/introduction/bg/background";

const CV: Component = () => {
  const cvPath = "/Alvin_Ferina_Putra_CV.pdf";

  return (
    <>
      <Background />
      <Navbar />
      <div class="min-h-screen pt-24 pb-12 px-4 md:px-8">
        <div class="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="space-y-2">
              <h1 class="text-3xl md:text-4xl font-bold text-white">
                Curriculum <span class="text-cyan-400">Vitae</span>
              </h1>
            </div>

            <a
              href={cvPath}
              download="Alvin_Ferina_Putra_CV.pdf"
              class="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl font-medium hover:bg-cyan-500/20 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FileDown size={18} />
              <span>Download PDF</span>
            </a>
          </div>

          {/* PDF Viewer */}
          <div class="w-full h-[80vh] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <object data={cvPath} type="application/pdf" class="w-full h-full">
              <div class="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-slate-900">
                <p class="text-lg mb-4">
                  Unable to display PDF directly in your browser.
                </p>
                <a
                  href={cvPath}
                  download="Alvin_Ferina_Putra_CV.pdf"
                  class="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  Download to View
                </a>
              </div>
            </object>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CV;
