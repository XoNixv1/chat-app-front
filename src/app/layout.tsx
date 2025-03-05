"use client";
import type React from "react";
import { createContext, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

type AuthContextType = {
  userId: string | null;
  setUserId: (id: string) => void;
};

//id context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{ userId, setUserId }}>
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
