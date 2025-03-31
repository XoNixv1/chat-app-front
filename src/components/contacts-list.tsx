import { FullUserData } from "@/app/page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { OpenedChat } from "./chat-layout";

export default function ContactsList({
  contacts,
  setOpenedChat,
  curUserId,
  setPage,
  setHasMessages,
  setOpenedForMobile,
  isMobile,
}: {
  contacts: FullUserData["contacts"];
  setOpenedChat: React.Dispatch<OpenedChat | undefined>;
  curUserId: string | null;
  setPage: React.Dispatch<number>;
  setHasMessages: React.Dispatch<boolean>;
  setOpenedForMobile: React.Dispatch<boolean>;
  isMobile: boolean;
}) {
  if (!curUserId) {
    return null;
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
              if (isMobile) setOpenedForMobile(true);
              setOpenedChat({
                opened: true,
                contactData: {
                  ...contact,
                },
              });
            }}
            key={id}
            className="flex items-center pr-20 pl-5 ml-6 p-4 hover:bg-zinc-700 rounded-md cursor-pointer mb-1"
          >
            <Avatar className="h-10 w-10 mr-5">
              <AvatarImage
                src={curUserId === user1_id ? user2_photo_url : user1_photo_url}
                alt={curUserId === user1_id ? user2_name : user1_name}
              />
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
