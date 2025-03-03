"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Settings, Send, Smile, Phone, Video } from "lucide-react"

export default function ChatInterface() {
  const [message, setMessage] = useState("")

  const contacts = [
    { id: 1, name: "chat with user1", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "chat with user2", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "chat with user3", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "chat with user4", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "chat with user5", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const messages = [
    {
      id: 1,
      text: "Hey, how are you doing?",
      sender: "User Name",
      isMe: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      text: "I'm good, thanks for asking! How about you?",
      sender: "Me",
      isMe: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      text: "I'm doing well. Just working on this new project.",
      sender: "User Name",
      isMe: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-zinc-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="uppercase font-bold text-xl text-teal-500 px-4 py-1">LOGO</div>
          <Button variant="ghost" size="icon" className="rounded-full bg-zinc-700 hover:bg-zinc-600 text-teal-500">
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
        <div className="w-64 border-r border-zinc-700 overflow-y-auto bg-zinc-900">
          <Button variant="ghost" className="w-full flex items-center gap-2 p-4 text-teal-500 hover:bg-zinc-700">
            <Plus className="h-4 w-4" />
            <span>Add new user</span>
          </Button>

          <div className="p-2">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center p-3 hover:bg-zinc-700 rounded-md cursor-pointer mb-1">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>U{contact.id}</AvatarFallback>
                </Avatar>
                <span className="text-zinc-200">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-zinc-800">
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-700 bg-zinc-900">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <span className="font-medium text-teal-500">User Name</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-300">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-300">
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex mb-4 ${msg.isMe ? "justify-end" : "justify-start"}`}>
                {!msg.isMe && (
                  <Avatar className="h-10 w-10 mr-2 mt-1">
                    <AvatarImage src={msg.avatar} alt={msg.sender} />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-md p-3 rounded-lg ${
                    msg.isMe ? "bg-teal-600 text-white ml-2" : "bg-zinc-700 text-zinc-100"
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
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="text-zinc-300 bg-zinc-700 hover:bg-zinc-600 mr-2">
                <Smile className="h-6 w-6" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="msg input"
                className="bg-zinc-700 border-zinc-600 text-zinc-200 focus-visible:ring-teal-500"
              />
              <Button variant="ghost" size="icon" className="text-zinc-300 bg-zinc-700 hover:bg-zinc-600 ml-2">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right sidebar - User info */}
        <div className="w-80 border-l border-zinc-700 overflow-y-auto bg-zinc-900">
          <div className="p-4">
            <div className="aspect-video bg-zinc-700 rounded-md mb-4 flex items-center justify-center">
              <span className="text-zinc-400">Img full scale</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-3">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <span className="text-teal-500">userName</span>
              </div>

              <div className="flex items-center mb-3">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Email" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <span className="text-teal-500">email</span>
              </div>
            </div>

            <div className="bg-zinc-700 rounded-md p-4 h-64 flex items-center justify-center">
              <span className="text-5xl text-zinc-500">?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

