"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OpenedChat } from "./chat-layout";
import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";

export default function UserProfile({
  openedChat,
  curUserId,
}: {
  openedChat: OpenedChat;
  curUserId: string | null;
}) {
  const {
    user1_id,
    user1_name,
    user2_name,
    user1_email,
    user2_email,
    user1_photo_url,
    user2_photo_url,
  } = openedChat.contactData;
  const [isOpen, setIsOpen] = useState(true);

  if (!curUserId) {
    return;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-20 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-full shadow-md"
      >
        <ChevronLeft className="h-8 w-8 p-1" />
      </button>
    );
  }
  return (
    <div className="w-100 border-l border-zinc-700 overflow-y-auto bg-zinc-900">
      <div className="p-4">
        <div className="flex mb-4 justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200"
          >
            <X className="h-8 w-8 p-1" />
          </button>
        </div>
        <div className="aspect-video rounded-md mb-4 flex items-center justify-center">
          <img
            src={curUserId === user1_id ? user2_photo_url : user1_photo_url}
            alt={curUserId === user1_id ? user2_name : user1_name}
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <span className="text-teal-500">
              {curUserId === user1_id ? user2_name : user1_name}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Email"
              />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
            <span className="text-teal-500">
              {curUserId === user1_id ? user2_email : user1_email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

("af36ac5e-f7b1-4b7a-90b4-36116318fe5d");
("f056a49e-b879-4a43-9383-7bd9c4407653");
