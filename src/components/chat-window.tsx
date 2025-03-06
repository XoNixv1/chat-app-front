"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { OpenedChat } from "./chat-layout";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import io from "socket.io-client";

interface Message {
  chat_id: string;
  created_at: Date;
  id: string;
  message_text: string;
  sender_id: string;
}

export default function ChatWindow({ openedChat }: { openedChat: OpenedChat }) {
  const { userId } = useAuth();
  const { chat_id, contact_name, contact_photo } = openedChat.contactData;
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  async function getMessages() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/chat/messages",
        {
          params: {
            chat_id,
            // page,
          },
        }
      );
      const newMessages = response.data.reverse();

      console.log(newMessages); //

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    } catch (error) {
      throw new Error(`issue with message fetching ${error}`);
    }
  }

  useEffect(() => {
    setMessages([]);
    //first fecth
    getMessages();

    // socket connection
    const socket = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    });

    socket.emit("joinRoom", chat_id);

    socket.on("connect", () => {
      console.log("Socket connected: " + socket.id);
    });

    socket.on("connect_failed", () => {
      console.error("Connection failed");
    });

    //listening new messages in this room
    socket.on("newMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(socket);
    // clearing socket
    return () => {
      socket.disconnect();
    };
  }, [chat_id]);

  //scroll to the bottom on first fetch
  useEffect(() => {
    if (page === 1 && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
      });
    }
  }, [getMessages]);

  // const handleSendMessage = async () => {
  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("sendMessage", {
        chat_id,
        messageText: message,
        senderId: userId,
      });
      setMessages((prev) => [...prev]);
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-800">
      {/* chat header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={contact_photo} alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="font-medium text-teal-500">{contact_name}</span>
        </div>
      </div>

      {/* messages block */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        <div className="flex-1 w-8/12 m-0 mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                userId === msg.sender_id ? "justify-end" : "justify-start"
              }`}
            >
              {!(userId === msg.sender_id) && (
                <Avatar className="h-10 w-10 mr-2 mt-1">
                  <AvatarImage src={contact_photo} alt={contact_name} />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md p-3 rounded-lg ${
                  userId === msg.sender_id
                    ? "bg-teal-600 text-white ml-2"
                    : "bg-zinc-700 text-zinc-100"
                }`}
              >
                {msg.message_text}
              </div>
              {userId === msg.sender_id && (
                <Avatar className="h-10 w-10 ml-2 mt-1">
                  <AvatarImage src={contact_photo} alt={contact_name} />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* message input */}
      <div className="p-4 border-t border-zinc-700 bg-zinc-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
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
