"use client";

import { SetStateAction, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, Settings, User } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [openedForMobile, setOpenedForMobile] = useState(false);

  //scaling for mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setOpenedForMobile(window.innerWidth < 768);
    };

    checkIfMobile(); // Устанавливаем начальное значение
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-zinc-100 ">
      {/*header*/}
      <header className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="uppercase font-bold text-xl text-teal-500 px-2 py-1">
            XCHAP
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
            className="pl-8 bg-zinc-700 border-zinc-600 text-zinc-200 max-w-64 focus-visible:ring-teal-500"
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* left contacts */}
        {isMobile && openedForMobile && (
          <button
            onClick={() => setOpenedForMobile(false)}
            className="absolute top-20 left-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200"
          >
            <ChevronLeft className="h-8 w-8 p-1" />
          </button>
        )}
        {/*  */}
        {!openedForMobile && (
          <div
            className={`${
              isMobile ? "w-full" : "w-80"
            }  border-r border-zinc-700 overflow-y-auto bg-zinc-900`}
          >
            <AddUserForm setInitialdata={setInitialdata} />

            <ContactsList
              isMobile={isMobile}
              setOpenedForMobile={setOpenedForMobile}
              setHasMessages={setHasMessages}
              setPage={setPage}
              setOpenedChat={setOpenedChat}
              contacts={contacts}
              curUserId={userId}
            />
          </div>
        )}
        {/* main chat */}
        {openedChat?.opened ? (
          <ChatWindow
            hasMessages={hasMessages}
            setHasMessages={setHasMessages}
            page={page}
            setPage={setPage}
            openedChat={openedChat}
            isMobile={isMobile}
            openedForMobile={openedForMobile}
          />
        ) : (
          <div
            className={`${
              isMobile && !openedForMobile ? "hidden" : "flex flex-1"
            }  items-center justify-center bg-zinc-800`}
          >
            <div className="text-center p-6 max-w-md">
              <div className="bg-zinc-700 rounded-full p-6 mx-auto w-20 h-20 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-medium text-zinc-300 mb-2">
                Select a conversation
              </h3>
              <p className="text-zinc-400">
                Choose a contact from the list or add a new contact to start
                chatting
              </p>
            </div>
          </div>
        )}
        {/* right user info */}
        {openedChat?.opened && !isMobile && (
          <UserProfile curUserId={userId} openedChat={openedChat} />
        )}
      </div>
    </div>
  );
}
