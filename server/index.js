const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();
// creates a new instance of Google Strategy
// inside the GoogleStrategy we pass in configuration
// passport.use is a register for authentication
// callbackURL servers for redirection
// access token allows us to reach back to google and have permission with google
// refresh token this allows to refresh access token since it expires
// profile has all identifying information
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('accessToken ', accessToken);
        console.log('refreshToken ', refreshToken);
        console.log('profile ', profile);
    })
);
// create a route handler
// this is a get handler
// '/' is the route portion of the handler
// req is the incoming request
// when user comes into this route it should use 
// 'google' strategy. The google strategy has an internal identifier
// of 'google' so that is how it knows to use it.
// here we just gain access to 'profile' and 'email'
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
// this takes the request and resoves to a profile
app.get('/auth/google/callback', passport.authenticate('google'));

// sets this application to be accisible through
// port 5000
// dynamic port binding
// process.env.PORT injects port from Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);

