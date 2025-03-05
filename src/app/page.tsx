"use client";
import ChatLayout from "@/components/chat-layout";
import { useAuth } from "@/hooks/useAuth";
import useHttp from "@/hooks/useHttp";
import { useEffect, useState } from "react";

export interface User {
  email: string;
  user_name: string;
  photo_url: string;
}

export interface UserContacts {
  id: string;
  contact_name: string;
  contact_email: string;
  user1_id: string;
  user2_id: string;
  created_at: Date;
  photo_url: string;
}

export interface FullUserData {
  currentUser: User;
  contacts: UserContacts[];
}

export default function Home() {
  const { userId, setUserId } = useAuth();
  const { request } = useHttp();
  const [initialData, setInitialdata] = useState<FullUserData | null>(null);

  async function fetchUserDataWithCookie() {
    try {
      const res = await request(
        `http://localhost:3001/api/user/userData/`,
        "GET",
        "include"
      );

      if (res) {
        setUserId(res.userData.id);
        setInitialdata({
          currentUser: res.userData,
          contacts: res.userContacts,
        });
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Cookie error:", error);
    }
  }

  useEffect(() => {
    console.log(initialData);
  }, [initialData]);

  //getting user data
  useEffect(() => {
    // console.log(document.cookie);
    fetchUserDataWithCookie();
  }, []);

  return <ChatLayout initialData={initialData} />;
}
