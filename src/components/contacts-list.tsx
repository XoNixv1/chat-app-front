import { FullUserData } from "@/app/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OpenedChat } from "./chat-layout";

export default function ContactsList({
  contacts,
  setOpenedChat,
}: {
  contacts: FullUserData["contacts"];
  setOpenedChat: React.Dispatch<OpenedChat>;
}) {
  return (
    <div className="p-2">
      {contacts.map((contact) => (
        <div
          onClick={() =>
            setOpenedChat({
              opened: true,
              contactData: {
                contact_email: contact.contact_email,
                contact_name: contact.contact_name,
                contact_photo: contact.photo_url,
              },
            })
          }
          key={contact.id}
          className="flex items-center pr-20 pl-5 justify-around p-4 hover:bg-zinc-700 rounded-md cursor-pointer mb-1"
        >
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={contact.photo_url} alt={contact.contact_name} />
            <AvatarFallback>U{contact.id}</AvatarFallback>
          </Avatar>
          <span className="text-zinc-200">{contact.contact_name}</span>
        </div>
      ))}
    </div>
  );
}
