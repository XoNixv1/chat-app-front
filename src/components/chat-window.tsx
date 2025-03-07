"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { OpenedChat } from "./chat-layout";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import io from "socket.io-client";

interface Message {
  chat_id: string;
  created_at: Date;
  id: string;
  message_text: string;
  sender_id: string;
}

export default function ChatWindow({
  page,
  setPage,
  openedChat,
  hasMessages,
  setHasMessages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  openedChat: OpenedChat;
  hasMessages: boolean;
  setHasMessages: React.Dispatch<boolean>;
}) {
  const { userId } = useAuth();
  const {
    id,
    user1_name,
    user2_name,
    user1_photo_url,
    user2_photo_url,
    user1_id,
  } = openedChat.contactData;
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  async function getMessages() {
    if (loading || !hasMessages) return;

    setLoading(true);

    const chatElement = chatContainerRef.current;
    const prevScrollHeight = chatElement ? chatElement.scrollHeight : 0;

    try {
      const response = await axios.get(
        "http://localhost:3001/api/chat/messages",
        {
          params: {
            chat_id: id,
            page,
          },
        }
      );
      if (response.data.length === 0) {
        setHasMessages(false);
      } else {
        const newMessages = response.data.reverse();

        console.log(newMessages); //
        setMessages((prevMessages) => [...newMessages, ...prevMessages]);
      }
    } catch (error) {
      throw new Error(`issue with message fetching ${error}`);
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (chatContainerRef.current) {
          const newScrollHeight = chatContainerRef.current.scrollHeight;
          chatContainerRef.current.scrollTop =
            newScrollHeight - prevScrollHeight;
        }
      }, 0);
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

    socket.emit("joinRoom", id);

    //listening new messages in this room
    socket.on("newMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(socket);
    // clearing socket
    return () => {
      socket.disconnect();
    };
  }, [id]);

  // puting event listener - fetching on scroll
  useEffect(() => {
    const chatElement = chatContainerRef.current;
    chatElement?.addEventListener("scroll", onScroll);

    return () => {
      chatElement?.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (id && messages.length > 0 && page === 1) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("sendMessage", {
        id,
        messageText: message,
        senderId: userId,
      });
      setMessages((prev) => [...prev]);
      setMessage("");
    }
  };

  const onScroll = () => {
    const container = chatContainerRef.current;
    if (container && container.scrollTop === 0) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      getMessages();
    }
  }, [page]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-zinc-800">
      {/* chat header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={userId === user1_id ? user2_photo_url : user1_photo_url}
              alt="User"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="font-medium text-teal-500">
            {userId === user1_id ? user2_name : user1_name}
          </span>
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
                  <AvatarImage
                    src={
                      userId === user1_id ? user2_photo_url : user1_photo_url
                    }
                    alt={userId === user1_id ? user2_name : user1_name}
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md p-3 rounded-lg ${
                  userId === msg.sender_id
                    ? "bg-teal-600 text-white ml-2 text-right"
                    : "bg-zinc-700 text-zinc-100"
                }`}
              >
                <div className="text-xs text-opacity-10 text-gray-200 mb-1">
                  {format(msg.created_at, "yyyy-MM-dd HH:mm")}
                </div>
                {msg.message_text}
              </div>
              {userId === msg.sender_id && (
                <Avatar className="h-10 w-10 ml-2 mt-1">
                  <AvatarImage
                    src={
                      userId === user1_id ? user2_photo_url : user1_photo_url
                    }
                    alt={userId === user1_id ? user2_name : user1_name}
                  />
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
