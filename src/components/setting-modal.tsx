"use client";

import { Button } from "@/components/ui/button";
import { X, LogOut, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { FullUserData } from "@/app/protected/page";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "./ui/input";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SettingModal({
  setShowSettings,
  initialData,
  setInitialdata,
}: {
  setInitialdata: React.Dispatch<SetStateAction<FullUserData | null>>;
  initialData: FullUserData | null;
  setShowSettings: React.Dispatch<boolean>;
}) {
  const router = useRouter();
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const { userId } = useAuth();
  const [changingImage, setChangingImage] = useState(false);
  const [imageURL, setImageURL] = useState<string>("");
  const [error, setError] = useState<null | string>();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const closeSettings = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mouseup", closeSettings);
    return () => {
      document.removeEventListener("mouseup", closeSettings);
    };
  }, [setShowSettings]);

  function validateImageUrl(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function changeImage() {
    const trueImage = await validateImageUrl(imageURL);

    if (!trueImage) {
      setError("wrong image address");
    } else if (userId) {
      setLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/api/user/changeImage`, {
          userId,
          imageURL,
        });
        if (response.status === 201) {
          setInitialdata((prev) => {
            if (prev) {
              return {
                ...prev,
                currentUser: { ...prev.currentUser, photo_url: imageURL },
                contacts: prev.contacts || [],
              };
            }
            return prev;
          });
          setLoading(false);
          setSuccess(response.data.message);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("An unexpected error occurred");
        setLoading(false);
      }
    }
  }

  const handleSignOut = () => {
    if (userId) document.cookie = `chat_token=; Max-Age=0; path=/; secure;`;
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        ref={settingsRef}
        className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h2 className="text-xl font-semibold text-teal-500">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(false)}
            className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* user Info */}
          <div className="flex flex-col items-center">
            <Avatar
              className="h-24 w-24 mb-4 group cursor-pointer"
              onClick={() => setChangingImage((prev) => !prev)}
            >
              <AvatarImage
                className="transition-opacity duration-300 group-hover:opacity-50 "
                src={initialData?.currentUser.photo_url}
                alt={initialData?.currentUser.user_name}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-opacity-50">
                <span className="text-gray-100 text-sm select-none">
                  Change?
                </span>
              </div>
              {loading && (
                <img
                  className="absolute inset-0 flex items-center justify-center"
                  src="/loadingSvg.svg"
                  alt="loading"
                />
              )}
            </Avatar>
            {changingImage && (
              <div className="flex w-10/12 ">
                <Input
                  onChange={(e) => {
                    setImageURL(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  value={imageURL}
                  placeholder="Image URL https://example.com/photo.png"
                  className="bg-zinc-700 border-zinc-600 text-zinc-200 max-w-80 focus-visible:ring-teal-500 mb-0 mr-2"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
                  onClick={() => changeImage()}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
            {(error || success) && (
              <div
                className={`${success ? "text-green-500" : "text-red-500"} `}
              >
                {success ? success : error}
              </div>
            )}
            <h3 className="text-lg font-medium text-zinc-200 mt-1">
              Name: {initialData?.currentUser.user_name}
            </h3>
            <p className="text-zinc-400">
              Email: {initialData?.currentUser.email}
            </p>
          </div>

          {/* sign Out */}
          <div className="pt-4 border-t border-zinc-700">
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
