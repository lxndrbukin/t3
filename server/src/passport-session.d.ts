import 'express-session';

declare module 'express-session' {
  interface SessionData {
    passport?: { user: string }; // Add passport field with user ID
  }
}
