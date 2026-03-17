"use client";

import { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { Mic, PhoneOff, Phone, Loader2, Sparkles } from "lucide-react";

export default function VoiceCall() {
  const [retellWebClient, setRetellWebClient] = useState<RetellWebClient | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);

  useEffect(() => {
    const client = new RetellWebClient();

    client.on("call_started", () => {
      console.log("Call started");
      setIsCalling(true);
      setIsStarting(false);
    });

    client.on("call_ended", () => {
      console.log("Call ended");
      setIsCalling(false);
      setIsStarting(false);
      setIsAgentTalking(false);
    });

    client.on("agent_start_talking", () => {
      console.log("Agent speaking");
      setIsAgentTalking(true);
    });

    client.on("agent_stop_talking", () => {
      console.log("Agent stopped speaking");
      setIsAgentTalking(false);
    });

    client.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false);
      setIsStarting(false);
      setIsAgentTalking(false);
    });

    setRetellWebClient(client);

    return () => {
      client.stopCall();
      client.removeAllListeners();
    };
  }, []);

  const handleStartCall = async () => {
    if (!retellWebClient) return;
    
    setIsStarting(true);
    
    try {
      const res = await fetch("/api/create-web-call", {
        method: "POST"
      });
      
      if (!res.ok) {
        throw new Error("Failed to get access token");
      }
      
      const { access_token } = await res.json();
      
      await retellWebClient.startCall({
        accessToken: access_token,
        sampleRate: 24000,
      });

    } catch (e) {
      console.error(e);
      setIsStarting(false);
    }
  };

  const handleStopCall = () => {
    if (retellWebClient) {
      retellWebClient.stopCall();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-2xl w-full">
      
      {/* Dynamic Avatar / Status */}
      <div className={`relative w-28 h-28 rounded-full mb-8 flex items-center justify-center transition-all duration-700 ${
        isCalling ? 'bg-gradient-to-tr from-[#5CE1E6] to-[#8C52FF] shadow-[0_0_40px_rgba(140,82,255,0.6)]' : 'bg-white/5 border border-white/10 shadow-lg'
      }`}>
        {isCalling && (
          <div className="absolute inset-0 rounded-full bg-[#8C52FF] animate-ping opacity-20"></div>
        )}
        
        {isCalling ? (
          <div className={`transition-all duration-300 ${isAgentTalking ? 'scale-110' : 'scale-100'}`}>
            <Sparkles className={`w-12 h-12 text-white ${isAgentTalking ? 'animate-pulse' : ''}`} />
          </div>
        ) : (
          <Phone className="w-10 h-10 text-gray-500" />
        )}
      </div>
      
      <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">
        {isCalling ? (isAgentTalking ? 'Agente Hablando...' : 'Agente Escuchando...') : 'Llamada Integratel'}
      </h3>
      
      <p className="text-center text-gray-400 mb-10 text-base max-w-[280px]">
        {isCalling 
          ? "La inteligencia artificial está lista para ayudarte. Puedes hablar ahora."
          : "Toca el botón mágico para comenzar una conversación en vivo."}
      </p>

      {/* Action Button */}
      {isCalling ? (
        <button 
          onClick={handleStopCall}
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-rose-500/10 text-rose-500 font-semibold tracking-wide border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-rose-500/25 w-full justify-center"
        >
          <PhoneOff className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
          Finalizar Llamada
        </button>
      ) : (
        <button 
          onClick={handleStartCall}
          disabled={isStarting}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#8C52FF] to-[#5CE1E6] text-white font-bold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(92,225,230,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] w-full justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10 flex items-center gap-3">
             {isStarting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Phone className="w-6 h-6" />}
             {isStarting ? "Conectando al agente..." : "Iniciar Llamada"}
          </span>
        </button>
      )}
    </div>
  );
}
