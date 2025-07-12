"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bot, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { MessageType } from "@/types/ai";
import { useMessage } from "@/hooks/use-message";
import Message from "./Message";

const AiChatDialog = () => {
  const [history, setHistory] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentMessage, setCurrentMessage] = useState<
    MessageType | undefined
  >();
  const [processedAiMessageId, setProcessedAiMessageId] = useState<
    string | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { aiMessage, loading, error } = useMessage(
    "/api/ai",
    currentMessage,
    history
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update history to keep last 5 messages (excluding current typing/loading states)
    const validMessages = messages.filter(
      (msg) => msg.content && msg.content.trim() !== ""
    );
    setHistory(validMessages.slice(-10));
  }, [messages]);

  useEffect(() => {
    if (aiMessage && currentMessage && aiMessage.id !== processedAiMessageId) {
      // Add AI response to messages
      const newAiMessage = {
        id: aiMessage.id,
        content: aiMessage.content,
        isUserMessage: false,
      };

      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      setProcessedAiMessageId(aiMessage.id);
      setCurrentMessage(undefined);
    }
  }, [aiMessage, currentMessage, processedAiMessageId]);

  function HandleSendMessage() {
    if (!inputValue.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      isUserMessage: true,
    };

    // Add user message to messages
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Set current message to trigger API call
    setCurrentMessage(userMessage);

    setInputValue("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="right-3 lg:right-5 bottom-3 lg:bottom-5 fixed flex justify-center items-center bg-primary hover:opacity-90 rounded-full w-14 h-14 text-white text-4xl transition-all duration-200 cursor-pointer">
          <Bot />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">Chat with AI</DialogTitle>
          <DialogDescription className="text-center">
            Ask questions and get answers from the AI.
          </DialogDescription>
        </DialogHeader>
        {/* MESSAGES FROM AI */}
        <div className="relative flex flex-col gap-2 p-2 border rounded-md h-[400px] overflow-y-auto">
          {messages.map((msg, index) => (
            <Message
              key={index}
              content={msg.content}
              isUserMessage={msg.isUserMessage}
            />
          ))}
          {loading && (
            <Message content="Thinking..." isUserMessage={false} loading />
          )}
          {error && (
            <Message content={`Error: ${error}`} isUserMessage={false} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <DialogFooter>
          <div className="flex justify-between items-center gap-2 w-full">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && HandleSendMessage()}
              disabled={loading}
            />
            <Button
              size="icon"
              onClick={HandleSendMessage}
              disabled={loading || !inputValue.trim()}
            >
              <Send />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiChatDialog;
