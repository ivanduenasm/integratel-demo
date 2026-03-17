import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RETELL_API_KEY}`
      },
      body: JSON.stringify({
        agent_id: process.env.NEXT_PUBLIC_VOICE_AGENT_ID
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to create web call:", errorText);
        return NextResponse.json({ error: "Failed to create web call" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error creating web call:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
