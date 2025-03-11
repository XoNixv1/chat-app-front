"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Search, Settings, User } from "lucide-react";
import ChatWindow from "./chat-window";
import UserProfile from "./user-profile";
import ContactsList from "./contacts-list";
import AddUserForm from "./add-user-form";
import { FullUserData, UserContacts } from "@/app/page";
import ChatSkeleton from "./ui/chat-skeleton";
import { useAuth } from "@/hooks/useAuth";
import SettingModal from "./setting-modal";

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
  const { userId } = useAuth();
  const contacts = initialData?.contacts || [];
  const [openedChat, setOpenedChat] = useState<OpenedChat | null>();
  const [hasMessages, setHasMessages] = useState(true);
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [openedForMobile, setOpenedForMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  //scaling for mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setOpenedForMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (!initialData) {
    return <ChatSkeleton></ChatSkeleton>;
  }

  return (
    // settings modal
    <div className="flex flex-col h-screen bg-zinc-800 text-zinc-100 ">
      {showSettings && (
        <SettingModal
          initialData={initialData}
          setShowSettings={setShowSettings}
          setInitialdata={setInitialdata}
        />
      )}

      {/*header*/}
      <header className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="uppercase font-bold text-xl text-teal-500 px-2 py-1">
            XCHAP
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
            className="rounded-full bg-zinc-700 hover:bg-zinc-600 text-teal-500"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="search message"
            className="pl-8 bg-zinc-700 border-zinc-600 text-zinc-200 max-w-64 focus-visible:ring-teal-500"
          />
        </div> */}
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
        {openedChat?.opened && (
          <UserProfile
            isMobile={isMobile}
            curUserId={userId}
            openedChat={openedChat}
            setOpenedChat={setOpenedChat}
            setInitialdata={setInitialdata}
          />
        )}
      </div>
    </div>
  );
}
