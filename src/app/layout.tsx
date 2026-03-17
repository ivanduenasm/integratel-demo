import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Integratel AI Demo",
  description: "Experience the Integratel AI agent. (Powered by VoizLab & Retell AI)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          id="retell-widget"
          src="https://dashboard.retellai.com/retell-widget.js"
          type="module"
          data-public-key={process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY}
          data-agent-id={process.env.NEXT_PUBLIC_CHAT_AGENT_ID}
          data-title="Integratel Support"
          data-logo-url="https://integratel-demo.vercel.app/logo_only%20V.PNG"
          data-color="#1F2937"
          data-bot-name="Camila - Integratel IA"
          data-popup-message="¡Hola! Soy Camila, tu asistente de Integratel. ¿En qué te puedo ayudar?"
          data-show-ai-popup="true"
          data-show-ai-popup-time="2"
          data-auto-open="false"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

