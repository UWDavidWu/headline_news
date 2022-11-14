const passport = require("passport");


const GOOGLE_CLIENT_ID =
  "842104153835-tghe41msdg6aqbtp9e600ogv7sc1b3p2.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "1148d7200b928531ccf3"
const GITHUB_CLIENT_SECRET = "d0ca2f0226c18851bc60503e7e9176860cb1890c"

const FACEBOOK_APP_ID = "702324771464445"
const FACEBOOK_APP_SECRET = "a812378e92f2f2ded82875c4effda37d"

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;



passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );


passport.serializeUser((user, done) => done(null, user)),
  passport.deserializeUser((user, done) => done(null, user));
