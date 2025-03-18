"use server"

import { redirect } from 'next/navigation';
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Check if the user is authenticated
  const { userId } = await auth();
  
  // If not authenticated, redirect to login
  if (!userId) {
    redirect('/login');
  }

  return (
    <div className="protected-layout">
      {children}
    </div>
  );
} 