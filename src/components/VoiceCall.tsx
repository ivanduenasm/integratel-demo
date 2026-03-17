"use client";

import { useEffect, useState, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { Mic, PhoneOff, Phone, Loader2 } from "lucide-react";

export default function VoiceCall() {
  const [retellWebClient, setRetellWebClient] = useState<RetellWebClient | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    // Initialize the SDK once on mount
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
    });

    client.on("agent_start_talking", () => {
      console.log("Agent speaking");
    });

    client.on("agent_stop_talking", () => {
      console.log("Agent stopped speaking");
    });

    client.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false);
      setIsStarting(false);
    });

    setRetellWebClient(client);

    return () => {
      // Clean up the call when the component unmounts
      client.stopCall();
      client.removeAllListeners();
    };
  }, []);

  const handleStartCall = async () => {
    if (!retellWebClient) return;
    
    setIsStarting(true);
    
    try {
      // 1. Get access token from backend
      const res = await fetch("/api/create-web-call", {
        method: "POST"
      });
      
      if (!res.ok) {
        throw new Error("Failed to get access token");
      }
      
      const { access_token } = await res.json();
      
      // 2. Start the call using the access token
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
    <div className="flex flex-col items-center justify-center p-6 border rounded-2xl bg-white shadow-xl max-w-sm mx-auto">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
         {isCalling ? <Mic className="w-8 h-8 text-blue-600 animate-pulse" /> : <Phone className="w-8 h-8 text-blue-600" />}
      </div>
      
      <h3 className="text-xl font-bold mb-2">
        {isCalling ? 'Agent is Listening...' : 'Talk to AI Agent'}
      </h3>
      
      <p className="text-center text-gray-500 mb-6 text-sm">
        {isCalling 
          ? "The AI agent is ready to assist you. Start talking."
          : "Click the button below to start a live voice conversation with our AI agent."}
      </p>

      {isCalling ? (
        <button 
          onClick={handleStopCall}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
        >
          <PhoneOff className="w-5 h-5" />
          End Call
        </button>
      ) : (
        <button 
          onClick={handleStartCall}
          disabled={isStarting}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400"
        >
          {isStarting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Phone className="w-5 h-5" />}
          {isStarting ? "Connecting..." : "Start Voice Call"}
        </button>
      )}
    </div>
  );
}
