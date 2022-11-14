const passport = require("passport");

// @desc check if a user is logged in
// @route GET /auth
// @access Private
const isLoggedIn =  (req, res) => { 
    if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
});
    } else {
    res.status(401).json({
      success: false,
      message: "unauthorized",
    });
    }

}





const loginFail = (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
      });
    }

const logout = (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
}


const googleAuth = passport.authenticate("google", {scope: ["profile"] })

const googleCallback =  passport.authenticate("google", {
    successRedirect:  process.env.CLIENT_URL ,
    failureRedirect: "/login/failed",
  })

  const githubAuth = passport.authenticate("github", {scope: ["profile"] })

  const githubCallback =  passport.authenticate("github", {
      successRedirect:  process.env.CLIENT_URL ,
      failureRedirect: "/login/failed",
    })

    const facebookAuth = passport.authenticate("facebook", {scope: ["profile"] })

    const facebookCallback =  passport.authenticate("facebook", {
        successRedirect:  process.env.CLIENT_URL ,
        failureRedirect: "/login/failed",
      })

module.exports = {
    isLoggedIn,
    loginFail,
    logout,
    googleAuth,
    googleCallback,
    githubAuth,
    githubCallback,
    facebookAuth,
    facebookCallback,

  };
  