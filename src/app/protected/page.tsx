"use client";
import ChatLayout from "@/components/chat-layout";
import { useAuth } from "@/hooks/useAuth";
import useHttp from "@/hooks/useHttp";
import { useEffect, useState } from "react";

interface ApiResponse {
  userId?: string;
  message: string;
}

export interface User {
  email: string;
  user_name: string;
  photo_url: string;
}

export interface UserContacts {
  id: string;
  user1_name: string;
  user2_name: string;
  user1_email: string;
  user2_email: string;
  user1_id: string;
  user2_id: string;
  created_at: Date;
  user1_photo_url: string;
  user2_photo_url: string;
}

export interface FullUserData {
  currentUser: User;
  contacts: UserContacts[];
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { userId, setUserId } = useAuth();
  const { request } = useHttp();
  const [initialData, setInitialdata] = useState<FullUserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/protected", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        if (result.userId) {
          setUserId(result.userId);
        } else {
          throw new Error("User ID not found in response");
        }
      } catch (err) {
        console.log(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    };

    fetchData();
  }, []);

  //getting user data
  useEffect(() => {
    if (!userId) return;

    async function fetchUserData() {
      try {
        const res = await request(`${apiUrl}/api/user/userData/${userId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.statusText}`);
        }

        setInitialdata({
          currentUser: res.userData,
          contacts: res.userContacts,
        });
      } catch (error) {
        console.error("Failed to fetch user data, error:", error);
      }
    }
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <ChatLayout setInitialdata={setInitialdata} initialData={initialData} />
    </div>
  );
}
