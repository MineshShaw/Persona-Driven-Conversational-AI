# Persona-Based AI Chatbot

A persona-driven AI chatbot built for an academic assignment on prompt engineering and LLM integration.

---

## Overview

The **Persona-Based AI Chatbot** is a web application that enables users to chat with an AI assistant through distinct persona styles.

This project exists as an academic exercise to practice:
- Prompt engineering strategies
- LLM API integration in a modern web stack
- Conversational UI/UX design

The key idea is to simulate persona-based conversations by injecting persona-specific system prompts into the LLM request pipeline.

---

## Features

- Multi-persona chatbot with three predefined personas
- Persona switching with automatic conversation reset
- Message history handling for context-aware replies
- Suggestion chips for quick prompt starters
- Typing indicator for better user feedback
- Responsive UI for desktop and mobile
- Error handling for API and runtime failures

---

## Personas

- **Anshuman Singh**  
  Problem-solving, intense, and challenges your thinking.

- **Abhimanyu Saxena**  
  Practical, product-minded, and execution-focused.

- **Kshitij Mishra**  
  Structured teacher focused on concept clarity.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **LLM:** Gemini API

---

## Project Structure

```text
/app
  /api/chat
  /components
  /lib
  page.tsx
```

- **`/app/api/chat`**: API endpoint to receive chat input, build context, and call the LLM provider.
- **`/app/components`**: Reusable UI components such as chat window, messages, selector, and suggestion chips.
- **`/app/lib`**: Shared utilities for personas, prompt templates, adapters, and helper logic.
- **`/app/page.tsx`**: Main page that manages chatbot UI state and interaction flow.

---

## How It Works

1. User selects one of the three personas.
2. A persona-specific system prompt is injected.
3. Message history is maintained in chronological order.
4. Full conversation context is sent to the LLM API.
5. Assistant response is appended to the chat history and rendered in UI.
6. Switching persona resets the conversation to keep persona context clean.

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/MineshShaw/Persona-Driven-Conversational-AI
   cd Persona-Driven-Conversational-AI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root.

4. Add API key (placeholder only):

   ```env
   LLM_API_KEY=your_key_here
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

