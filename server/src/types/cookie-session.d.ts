import 'cookie-session';

declare module 'cookie-session' {
  interface Session {
    passport: {
      user: string;
    };
  }
}
