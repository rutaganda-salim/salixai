"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { MoveUpRight, Plus, RabbitIcon } from "lucide-react";
import StyledChatbotResponse from "./StyledChatbot";
import SparklesText from "@/components/ui/sparkles-text";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Chatbot() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    setMessages,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsTyping(true);
      handleSubmit(e).then(() => {
        setIsTyping(false);
      });
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-gray-100">
      <BorderBeam className="absolute inset-0 z-0" />
      <div className="flex-1 bg-[#0A0A0A] flex flex-col overflow-hidden max-w-[900px] mx-auto px-4">
        <div className="relative">
          <header className="p-4 flex justify-between items-center relative z-10">
            <div className="flex items-center">
              <SparklesText text="Salix AI" className="text-2xl font-bold text-white italic" />
            </div>
            <button
              onClick={startNewChat}
              className="bg-white flex text-black p-2 rounded-md hover:bg-gray-100 duration-300 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" /> New chat
            </button>
          </header>
        </div>
        
        <main className="flex-1 bg-[#0A0A0A] flex flex-col relative overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <h1 className="text-4xl font-bold mb-4 text-center">
                Salim &apos;s AI: Learn, Chat, and Explore My World
              </h1>
              <p className="text-xl text-[#A3A3A3] text-[15px] mb-4 text-center">
                Ask me anything—I&apos;m here to share my story!
              </p>
              <div className="w-full max-w-2xl bg-[#141414] border border-[#262626] rounded-lg mb-8 relative">
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Curious about me? Start typing!"
                    className="w-full bg-transparent text-white placeholder-white placeholder-opacity-50 outline-none h-32 px-4 py-4 resize-none custom-scrollbar"
                  />
                  {input && (
                    <button
                      type="submit"
                      className="absolute right-4 bottom-4 bg-white text-black p-2 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                        />
                      </svg>
                    </button>
                  )}
                </form>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "What's your favorite programming language?",
                  "What project are you currently working on?",
                  "Are you available to work",
                ].map((text, index) => (
                  <button
                    key={index}
                    className={`bg-black hover:bg-[#121212] text-[#A3A3A3] hover:text-white transition-colors duration-300 border border-[#242424] px-2 py-1 rounded-full text-[11px]`}
                    onClick={() =>
                      handleInputChange({ target: { value: text } } as any)
                    }
                  >
                    {text}
                    <MoveUpRight className="w-4 h-3 inline-block ml-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 m-8 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "user" ? (
                    <div className="py-2 px-4 rounded-lg max-w-[70%] bg-[#2f2f2f] text-white">
                      {message.content}
                    </div>
                  ) : (
                    <div className="flex items-start space-x-2">
                      <RabbitIcon className="w-8 h-8 rounded-full shrink-0" />
                      <div className="flex-1">
                        <StyledChatbotResponse content={message.content} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <RabbitIcon className="w-8 h-8 rounded-full shrink-0" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>
        {messages.length > 0 && (
          <div className="bg-[#141414] rounded-lg ml-10 mr-10 mb-4 border-t border-[#262626] p-4">
            <form onSubmit={handleSubmit} className="flex items-center">
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Curious about me? Start typing!"
                className="flex-1 ml-6 mr-6 bg-transparent text-white placeholder-white placeholder-opacity-50 outline-none resize-none h-16 custom-scrollbar"
                rows={2}
              />
              {input && (
                <button
                  type="submit"
                  className="ml-2 bg-white text-black p-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                  </svg>
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
        /* For Chrome, Safari, and Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        /* For Firefox */
        body {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
