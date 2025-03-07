"use client";

import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Loader2 } from "lucide-react";
import { addContact } from "@/app/actions/addContacts";
import { useAuth } from "@/hooks/useAuth";
import { FullUserData, UserContacts } from "@/app/page";

export default function AddUserForm({
  setInitialdata,
}: {
  setInitialdata: React.Dispatch<SetStateAction<FullUserData | null>>;
}) {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await addContact(userId, email);

      if (result.success) {
        setSuccess(true);
        setEmail("");

        const newUser = result as unknown as UserContacts;

        setInitialdata((prev) => {
          if (!prev) return null;

          return {
            ...prev,
            contacts: [...(prev.contacts || []), newUser],
            currentUser: prev.currentUser,
          };
        });
        // close after 1.5 seconds
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
        }, 1500);
      } else {
        setError(result.error || "Failed to add user");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="w-full flex items-center gap-2 p-4 text-teal-500 hover:bg-zinc-700"
        onClick={() => setOpen(true)}
      >
        <Mail className="h-4 w-4" />
        <span>Add new user</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-zinc-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-teal-500">
              Add New Contact
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter the email address of the user you want to add to your
              contacts.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-zinc-200">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-teal-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mt-1">
                  User added successfully!
                </p>
              )}
            </div>

            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !email}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Contact"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
