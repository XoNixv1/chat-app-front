import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ContactsList({
  contacts,
}: {
  contacts: Array<{ id: string; name: string; avatar: string }>;
}) {
  return (
    <div className="p-2">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center pr-20 pl-5 justify-around p-4 hover:bg-zinc-700 rounded-md cursor-pointer mb-1"
        >
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>U{contact.id}</AvatarFallback>
          </Avatar>
          <span className="text-zinc-200">{contact.name}</span>
        </div>
      ))}
    </div>
  );
}
