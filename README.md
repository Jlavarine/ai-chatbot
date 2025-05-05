# AI Chat App

A lightweight Next.js “chat” interface powered by Together AI’s streaming API, built with React and Tailwind CSS.  
Allows the user to pick between multiple LLMs, send messages, and see streaming responses—complete with model selector, chat copying, and clear conversation functionality.

---

## Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Jlavarine/ai-chatbot.git
   cd ai-chatbot
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env.local` in the project root with:  
   ```bash
   TOGETHER_API_KEY=your_together_ai_key
   ```

4. **Run in development**  
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 to view.

5. **Build for production**  
   ```bash
   npm run build
   npm run start
   ```

---

## Deployed Site

The AI Chatbot application is live and accessible [here](https://ai-chatbot-amber-nu.vercel.app/).


## Models / APIs Used

- **Models**  
  - `mistralai/Mistral-7B-Instruct-v0.2`: Instruction-following, reasoning-focused model.  
  - `Llama-3.2-11B-Vision-Instruct-Turbo`: General-purpose conversational language model that uses an optimized transformer architecture.  

- **API / Streaming**  
  - **Together AI Streaming API**:  
    - Endpoint: `/api/chat` acts as a proxy to Together AI’s streaming chat completion endpoint.  
    - Implements real-time streaming via `ChatCompletionStream` from the `together-ai` client library.

---

## 🛠️ Features

- **Streaming Chat**: Real-time assistant replies via stream.  
- **Multi-Model Selector**: Custom dropdown to switch LLMs.  
- **Clear Conversation**: Reset chat and errors.
- **Copy Entire Chat or Individual responses**:   Instantly copy the full conversation as Markdown with the “Copy Chat” button, or click the clipboard icon under any reply to copy just that response.
- **Error Handling**: Inline banner for network or API failures.  
- **Accessibility**: Focus management and ARIA attributes.  

---

## 🚂 Time Spent & Trade-offs / Limitations

- **Time Spent**:  
  - Total development time: ~10.5 hours.  
  - Key tasks: initial setup, streaming integration (3.5h), UI/UX refinements (4h), accessibility & error handling (1.5h), theming & toggles (1.5h).

- **Trade-offs & Limitations**:  
  - **Basic styling**: Tailwind-only, minimal custom design system.  
  - **Single-page focus**: No routing or state persistence beyond session.  
  - **Environment dependency**: Assumes a Together AI API key and endpoint.  
  - **Performance**: Chat history grows unbounded in memory; no pagination or lazy loading for long sessions.

---

## 📂 Project Structure

```
├── components/
│   ├── ChatControls.tsx     # Model selector
│   ├── ChatInput.tsx        # Bottom form/input + send button + clear chat UI
│   ├── ModelSelector.tsx    # Custom dropdown for models
│   └── MessageList.tsx      # Renders messages array
│
├── pages/
│   └── api/
│       └── chat.ts          # POST handler that proxies to Together AI
│
├── public/
│   └── (static assets)
│
├── styles/
│   └── globals.css          # Tailwind base imports
│
├── next.config.js           # Next.js configuration
├── package.json
└── README.md
```
## ➕ Future Improvements

- **Response Rating**: Add thumbs up/down buttons on each AI reply so users can rate the usefulness of individual responses.  
- **Chat Persistence & History**: Hook up a backend database to store complete conversation histories, enabling users to revisit past chats across sessions.

---

## ⚙️ Available Scripts

- `npm run dev` — Start Next.js in development mode  
- `npm run build` — Create a production build  
- `npm run start` — Run the production build locally  

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Together AI Streaming API](https://together.ai/)  
- Inspired by modern messaging UIs and the ChatGPT interface.
