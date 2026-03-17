import VoiceCall from "@/components/VoiceCall";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-gray-50 text-gray-800">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-white pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4 lg:bg-white/50">
          <span className="font-bold">Integratel</span>&nbsp;Demo AI (Retell)
        </p>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center py-20 w-full text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-8">
          Welcome to Integratel AI
        </h1>
        <p className="text-xl max-w-2xl text-gray-600 mb-12">
          Experience our ultra-low latency voice assistant built with Retell AI. 
          Use the chat widget on the bottom right or start a voice call directly from the browser.
        </p>
        
        {/* Our Voice Component here */}
        <VoiceCall />

      </div>

      <footer className="mt-8 text-sm text-gray-500 text-center">
        <p>© 2026 Integratel & VoizLab</p>
      </footer>
    </main>
  );
}
