import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Settings } from "lucide-react";
import ChatWindow from "./chat-window";
import UserProfile from "./user-profile";
import ContactsList from "./contacts-list";

export default function ChatLayout({
  initialData,
}: {
  initialData: {
    currentUser: { id: string; name: string; avatar: string };
    contacts: Array<{ id: string; name: string; avatar: string }>;
  };
}) {
  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-zinc-100">
      {/* Header - Static */}
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
        {/* Left sidebar - Contacts */}
        <div className="w-80 border-r border-zinc-700 overflow-y-auto bg-zinc-900">
          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 p-4 text-teal-500 hover:bg-zinc-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add new user</span>
          </Button>

          <Suspense fallback={<div className="p-4">Loading contacts...</div>}>
            <ContactsList contacts={initialData.contacts} />
          </Suspense>
        </div>

        {/* Main chat area */}
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              Loading chat...
            </div>
          }
        >
          <ChatWindow currentUser={initialData.currentUser} />
        </Suspense>

        {/* Right sidebar - User info */}
        <Suspense fallback={<div className="w-80 p-4">Loading profile...</div>}>
          <UserProfile />
        </Suspense>
      </div>
    </div>
  );
}
