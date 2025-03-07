export type SessionProps = {
  isLoggedIn: boolean;
  user:
    | {
        googleId: string;
        name: string;
        email: string;
      }
    | undefined;
};
