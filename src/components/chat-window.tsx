"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { sendMessage } from "@/app/actions/sendMessage";
import { OpenedChat } from "./chat-layout";

export default function ChatWindow({ openedChat }: { openedChat: OpenedChat }) {
  const { contact_name, contact_email, contact_photo } = openedChat.contactData;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "test test",
      sender: "User Name",
      isMe: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      text: "test test test test test test",
      sender: "Me",
      isMe: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      text: "test test test test test test test test",
      sender: "User Name",
      isMe: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Optimistic update
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "Me",
      isMe: true,
      avatar: contact_photo,
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Send to server
    try {
      await sendMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
      // You might want to show an error toast here
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-800">
      {/* Chat header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="font-medium text-teal-500">{contact_name}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${
              msg.isMe ? "justify-end" : "justify-start"
            }`}
          >
            {!msg.isMe && (
              <Avatar className="h-10 w-10 mr-2 mt-1">
                <AvatarImage src={msg.avatar} alt={msg.sender} />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-md p-3 rounded-lg ${
                msg.isMe
                  ? "bg-teal-600 text-white ml-2"
                  : "bg-zinc-700 text-zinc-100"
              }`}
            >
              {msg.text}
            </div>
            {msg.isMe && (
              <Avatar className="h-10 w-10 ml-2 mt-1">
                <AvatarImage src={msg.avatar} alt={msg.sender} />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-zinc-700 bg-zinc-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-zinc-300 bg-zinc-700 hover:bg-zinc-600 mr-2"
          >
            <Smile className="h-6 w-6" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="msg input"
            className="bg-zinc-700 border-zinc-600 text-zinc-200 focus-visible:ring-teal-500"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="text-zinc-300 bg-zinc-700 hover:bg-zinc-600 ml-2"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
