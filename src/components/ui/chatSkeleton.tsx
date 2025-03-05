import { Search, Settings } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

export default function ChatSkeleton() {
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
        <div className="w-80 border-r border-zinc-700 overflow-y-auto bg-zinc-900"></div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-zinc-800">
          <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>
        </div>
      </div>
    </div>
  );
}
