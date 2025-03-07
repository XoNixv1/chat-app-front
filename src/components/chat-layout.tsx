"use client";

import { SetStateAction, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import ChatWindow from "./chat-window";
import UserProfile from "./user-profile";
import ContactsList from "./contacts-list";
import AddUserForm from "./add-user-form";
import { FullUserData, UserContacts } from "@/app/page";
import ChatSkeleton from "./ui/chatSkeleton";
import { useAuth } from "@/hooks/useAuth";

export interface OpenedChat {
  opened: boolean;
  contactData: UserContacts;
}

export default function ChatLayout({
  initialData,
  setInitialdata,
}: {
  initialData: FullUserData | null;
  setInitialdata: React.Dispatch<SetStateAction<FullUserData | null>>;
}) {
  if (!initialData) {
    return <ChatSkeleton></ChatSkeleton>;
  }
  const { userId } = useAuth();
  const { contacts } = initialData;
  const [openedChat, setOpenedChat] = useState<OpenedChat>();
  const [hasMessages, setHasMessages] = useState(true);
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-zinc-100">
      {/*header*/}
      <header className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="uppercase font-bold text-xl text-teal-500 px-4 py-1">
            LOGO
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-700 hover:bg-zinc-600 text-teal-500"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="search message"
            className="pl-8 bg-zinc-700 border-zinc-600 text-zinc-200 w-64 focus-visible:ring-teal-500"
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* left contacts */}
        <div className="w-80 border-r border-zinc-700 overflow-y-auto bg-zinc-900">
          <AddUserForm initialData={initialData} />

          <Suspense fallback={<div className="p-4">Loading contacts...</div>}>
            <ContactsList
              setHasMessages={setHasMessages}
              setPage={setPage}
              setOpenedChat={setOpenedChat}
              contacts={contacts}
              curUserId={userId}
            />
          </Suspense>
        </div>

        {/* main chat */}
        {openedChat?.opened && (
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center">
                Loading chat...
              </div>
            }
          >
            <ChatWindow
              hasMessages={hasMessages}
              setHasMessages={setHasMessages}
              page={page}
              setPage={setPage}
              openedChat={openedChat}
            />
          </Suspense>
        )}

        {/* right user info */}
        {openedChat?.opened && (
          <Suspense
            fallback={<div className="w-80 p-4">Loading profile...</div>}
          >
            <UserProfile curUserId={userId} openedChat={openedChat} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
