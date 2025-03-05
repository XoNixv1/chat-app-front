import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OpenedChat } from "./chat-layout";

export default function UserProfile({
  openedChat,
}: {
  openedChat: OpenedChat;
}) {
  const { contact_name, contact_email, contact_photo } = openedChat.contactData;
  return (
    <div className="w-100 border-l border-zinc-700 overflow-y-auto bg-zinc-900">
      <div className="p-4">
        <div className="aspect-video bg-zinc-700 rounded-md mb-4 flex items-center justify-center">
          <span className="text-zinc-400">
            <img src={contact_photo} alt={contact_name} />
          </span>
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
            <span className="text-teal-500">{contact_name}</span>
          </div>

          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Email"
              />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
            <span className="text-teal-500">{contact_email}</span>
          </div>
        </div>

        {/* <div className="bg-zinc-700 rounded-md p-4 h-64 flex items-center justify-center"> */}
        {/* <span className="text-5xl text-zinc-500">?</span> */}
        {/* </div> */}
      </div>
    </div>
  );
}
