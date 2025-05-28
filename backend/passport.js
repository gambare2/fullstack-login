// passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

// Serialize/Deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'http://localhost:5000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));
