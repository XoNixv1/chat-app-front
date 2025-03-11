"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { OpenedChat } from "./chat-layout";
import { SetStateAction, useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { AtSign, User } from "lucide-react";
import { Button } from "./ui/button";
import { deleteContact } from "@/app/actions/delete-contact";
import { FullUserData } from "@/app/page";

export default function UserProfile({
  openedChat,
  curUserId,
  setOpenedChat,
  setInitialdata,
  isMobile,
}: {
  openedChat: OpenedChat;
  setOpenedChat: React.Dispatch<OpenedChat | null>;
  setInitialdata: React.Dispatch<SetStateAction<FullUserData | null>>;
  curUserId: string | null;
  isMobile: boolean;
}) {
  const {
    id,
    user1_id,
    user1_name,
    user2_name,
    user1_email,
    user2_email,
    user1_photo_url,
    user2_photo_url,
  } = openedChat.contactData;
  const [isOpen, setIsOpen] = useState(true);

  if (isMobile) {
    return (
      <Button
        variant="destructive"
        className="absolute w-25 bg-red-600 hover:bg-red-700 text-white top-19.5 right-5"
        onClick={() => {
          deleteContact(id);
          setOpenedChat(null);
          setInitialdata((prev) => {
            if (prev === null) {
              return prev;
            } else {
              const newContacts = prev.contacts.filter(
                (contact) => contact.id !== id
              );
              return { ...prev, contacts: newContacts };
            }
          });
        }}
      >
        Unfriend
      </Button>
    );
  }

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
        <div className="aspect-video rounded-md mb-4 flex items-center justify-center max-w-8/12 m-auto">
          <img
            src={curUserId === user1_id ? user2_photo_url : user1_photo_url}
            alt={curUserId === user1_id ? user2_name : user1_name}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage alt="User" />
              <User className="m-auto" />
            </Avatar>
            <span className="text-teal-500">
              {curUserId === user1_id ? user2_name : user1_name}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage alt="Email" />
              <AtSign className="m-auto" />
            </Avatar>
            <span className="text-teal-500">
              {curUserId === user1_id ? user2_email : user1_email}
            </span>
          </div>
          {user2_email !== "@chatgpt.com" && user1_email !== "@chatgpt.com" && (
            <Button
              variant="destructive"
              className="w-[50%] bg-red-600 hover:bg-red-700 text-white self-center "
              onClick={() => {
                deleteContact(id);
                setOpenedChat(null);
                setInitialdata((prev) => {
                  if (prev === null) {
                    return prev;
                  } else {
                    const newContacts = prev.contacts.filter(
                      (contact) => contact.id !== id
                    );
                    return { ...prev, contacts: newContacts };
                  }
                });
              }}
            >
              Unfriend
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
