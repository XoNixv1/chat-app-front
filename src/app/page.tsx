import ChatLayout from "@/components/chat-layout";

export default async function Home() {
  // This would typically come from your database or API
  const initialData = {
    currentUser: {
      id: "1",
      name: "Current User",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    contacts: [
      {
        id: "1",
        name: "chat with user1",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        name: "chat with user2",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "3",
        name: "chat with user3",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "4",
        name: "chat with user4",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "5",
        name: "chat with user5",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  };

  return <ChatLayout initialData={initialData} />;
}
