import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
// Import other providers as needed

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // Add more providers here
  ],
  // Use an adapter for database connection if needed
  // adapter: YourDatabaseAdapter,
}); 