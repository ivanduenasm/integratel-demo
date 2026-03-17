import VoiceCall from "@/components/VoiceCall";
import CrmSimulator from "@/components/CrmSimulator";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#09090B] text-gray-100 overflow-hidden font-sans">
      
      {/* LEFT PANE: CRM Simulator */}
      <div className="w-full md:w-[400px] lg:w-[450px] shrink-0 border-r border-[#27272A] bg-[#0E0E10] flex flex-col h-screen overflow-hidden">
        {/* Branding Area */}
        <div className="flex items-center gap-3 px-8 py-6 border-b border-[#27272A]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8C52FF] to-[#5CE1E6] flex items-center justify-center shadow-[0_0_15px_rgba(140,82,255,0.4)]">
             <span className="text-white font-extrabold text-xl font-mono tracking-tighter">V</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Voiz<span className="text-gray-400">Lab</span>
          </h1>
        </div>
        
        {/* CRM Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <CrmSimulator />
        </div>
      </div>

      {/* RIGHT PANE: Voice Call Interface */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-8 lg:p-20 overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8C52FF]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#5CE1E6]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#5CE1E6] animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-gray-300">Retell AI Integration Active</span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-500">
            Integratel <br /> AI Platform
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 max-w-xl leading-relaxed">
            Experimenta nuestro asistente de voz de ultra-baja latencia impulsado por IA. Usa la ventana de chat abajo a la derecha, o inicia una llamada de voz.
          </p>
          
          {/* Main Interactive Widget */}
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8C52FF] to-[#5CE1E6] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#18181B] ring-1 ring-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-12 backdrop-blur-xl">
              <VoiceCall />
            </div>
          </div>
        </div>
        
        <footer className="absolute bottom-8 text-xs text-gray-600 tracking-wider">
          &#169; 2026 VOIZLAB AGENTS. CONFIDENTIAL.
        </footer>
      </div>

    </main>
  );
}
