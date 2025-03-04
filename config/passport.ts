import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface TokenUser {
  user: User;
  token: string;
}

const users = new Map<string, User>();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: TokenUser) => void
    ) => {
      const user: User = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || "",
        picture: profile.photos?.[0]?.value || "",
      };

      users.set(user.id, user);

      const token = jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      return done(null, { user, token });
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.user.id); // Explicitly allow any type to avoid TypeScript errors || Getting some error.. could not figure out
});

passport.deserializeUser((id: string, done) => {
  const user = users.get(id);
  done(null, user || null);
});

export default passport;
