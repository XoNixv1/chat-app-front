"use client";
import { createContext, useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export type AuthContextType = {
  userId: string | null;
  setUserId: (id: string) => void;
};

// Create the AuthContext
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
