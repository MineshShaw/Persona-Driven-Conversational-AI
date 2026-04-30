"use client";

import { FormEvent, useState } from "react";
import { Message } from "./lib/chat";
import { personaMap, PersonaId } from "./lib/personas";
import ChatWindow from "./components/ChatWindow";
import PersonaSwitcher from "./components/PersonaSwitcher";
import SuggestionChips from "./components/SuggestionChips";

const initialPersona: PersonaId = "anshuman";
const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";
const messageSuggestions = [
  "How should I start learning DSA effectively?",
  "Can you explain recursion with a simple example?",
  "How can I prepare better for coding interviews?",
];

export default function HomePage() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>(initialPersona);
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: personaMap[initialPersona] },
  ]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handlePersonaChange = (nextPersona: PersonaId) => {
    if (nextPersona === selectedPersona) return;
  
    setSelectedPersona(nextPersona);
  
    setMessages(() => {
        return [{ role: "system", content: personaMap[nextPersona] }]
    });
  
    setInput("");
    setLoading(false);
  };

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || loading) return;

    const nextMessages = [...messages, { role: "user", content: message } as const];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const data = (await response.json()) as { message?: Message; error?: string };

      if (!response.ok || !data.message || data.message.role !== "assistant") {
        throw new Error(data.error || FALLBACK_ERROR_MESSAGE);
      }

      setMessages((prev) => [...prev, data.message!]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: FALLBACK_ERROR_MESSAGE },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-4 p-4 md:p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold md:text-3xl">Persona-Based AI Chatbot</h1>
        <p className="text-sm text-zinc-600">Chat with selectable system personas.</p>
      </header>

      <PersonaSwitcher
        selectedPersona={selectedPersona}
        onChangePersona={handlePersonaChange}
      />

      <ChatWindow messages={messages} loading={loading} />

      <SuggestionChips
        suggestions={messageSuggestions}
        disabled={loading}
        onSelectSuggestion={(suggestion) => setInput(suggestion)}
      />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white p-2 shadow-sm"
      >
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message..."
          className="h-11 flex-1 rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 disabled:bg-zinc-100"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="h-11 rounded-xl bg-zinc-900 px-5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </main>
  );
}
