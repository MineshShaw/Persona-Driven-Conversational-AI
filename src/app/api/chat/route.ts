export const runtime = "nodejs";

import OpenAI from "openai";
import { Message } from "@/app/lib/chat";

const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

type ChatRequestBody = {
  messages: Message[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ChatRequestBody>;
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages
  });

    const content = response.choices[0]?.message?.content?.trim();

    if (!content) {
      return Response.json({ error: "Empty response from model." }, { status: 502 });
    }

    return Response.json({
      message: {
        role: "assistant",
        content,
      },
    });
  } catch (err: any) {
    console.error("LLM error:", err);

    return Response.json(
      { error: err.message || "Unable to process the request." },
      { status: 500 }
    );
  }
}