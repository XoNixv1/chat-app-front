import { FullUserData } from "@/app/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OpenedChat } from "./chat-layout";

export default function ContactsList({
  contacts,
  setOpenedChat,
  curUserId,
  setPage,
  setHasMessages,
}: {
  contacts: FullUserData["contacts"];
  setOpenedChat: React.Dispatch<OpenedChat>;
  curUserId: string | null;
  setPage: React.Dispatch<number>;
  setHasMessages: React.Dispatch<boolean>;
}) {
  if (!curUserId) {
    return;
  }
  return (
    <div className="p-2">
      {contacts.map((contact) => {
        const {
          id,
          user1_name,
          user2_name,
          user1_id,
          user1_photo_url,
          user2_photo_url,
        } = contact;
        return (
          <div
            onClick={() => {
              setPage(1);
              setHasMessages(true);
              setOpenedChat({
                opened: true,
                contactData: {
                  ...contact,
                },
              });
            }}
            key={id}
            className="flex items-center pr-20 pl-5 justify-around p-4 hover:bg-zinc-700 rounded-md cursor-pointer mb-1"
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={curUserId === user1_id ? user2_photo_url : user1_photo_url}
                alt={curUserId === user1_id ? user2_name : user1_name}
              />
              <AvatarFallback>U{id}</AvatarFallback>
            </Avatar>
            <span className="text-zinc-200">
              {curUserId === user1_id ? user2_name : user1_name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
