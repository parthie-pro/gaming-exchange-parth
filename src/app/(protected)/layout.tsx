"use server"

import { redirect } from 'next/navigation';
import { currentUser } from "@clerk/nextjs/server";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Check if the user is authenticated
  const user = await currentUser();
  
  // If not authenticated, redirect to login
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="protected-layout">
      {children}
    </div>
  );
} 