import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !BACKEND_URL) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or BACKEND_URL in .env"
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/auth/callback/google`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0].value || "",
          picture: profile.photos?.[0].value,
          accessToken,
          refreshToken,
        };
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize & Deserialize User
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

export default passport;
