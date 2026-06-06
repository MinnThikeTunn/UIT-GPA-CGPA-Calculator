"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { sendChatMessage } from "@/app/actions";

export type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  sources?: { source: string; score: number }[];
};

export default function ChatbotPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const { output, sources } = await sendChatMessage(trimmed, messages);

      const botMsg: Message = {
        id: `${Date.now()}-bot`,
        role: "bot",
        content: output,
        timestamp: new Date(),
        sources,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          role: "bot",
          content: "Sorry, an error occurred while processing your request.",
          timestamp: new Date(),
          sources: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isMounted) return null;

  return (
    <main className="chatbot-page">
      <header className="chatbot-header">
        <Link href="/" className="back-link">
          &larr; Back
        </Link>
        <span className="kicker">AI Study Assistant</span>
      </header>

      <div className="chatbot-stage">
        <div className="chat-stream">
          <div className="chat-stream-inner">
            {messages.length === 0 && (
              <div className="chat-empty-state">
                <h1>Ask Me Anything</h1>
                <p className="muted">
                  I can answer questions about GPA, CGPA, attendance, and more.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-group ${msg.role}`}
              >
                <div className="chat-sender-label">
                  {msg.role === "user" ? "You" : "Assistant"}
                </div>
                <div className={`chat-bubble ${msg.role}`}>
                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="chat-sources">
                      {msg.sources.map((src, i) => (
                        <span key={i} className="chat-source-tag">
                          {src.source}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message-group bot">
                <div className="chat-sender-label">Assistant</div>
                <div className="chat-bubble bot">
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="chat-input-zone">
          <div className="chat-input-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="chat-input-special"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="chat-send-special"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
