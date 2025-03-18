import { getSession } from 'next-auth/react';

export async function getUserSession() {
  return await getSession();
} 