const router = require("express").Router();

const {
  isLoggedIn,
  loginFail,
  logout,
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
  facebookAuth,
  facebookCallback,

} = require("../controllers/authController");

router.get("/login/success", isLoggedIn);

router.get("/login/failed", loginFail);

router.get("/logout", logout);

router.get("/google", googleAuth);

router.get("/google/callback", googleCallback);

router.get("/github", githubAuth);

router.get("/github/callback", githubCallback);

router.get("/facebook", facebookAuth);

router.get("/facebook/callback", facebookCallback);



module.exports = router;
