// index.js
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import './passport.js'; // Import configured strategies

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // frontend
  credentials: true,
}));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Server Running'));

// ---- Google ----
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/profile'); // redirect to frontend
  }
);

// ---- GitHub ----
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/profile'); // redirect to frontend
  }
);

// ---- User Info ----
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not Authenticated' });
  }
});

// ---- Logout ----
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
