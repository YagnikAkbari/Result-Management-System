const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Login = require("../model/login");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "shop.db123@gmail.com",
    clientId:
      process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken:
      process.env.CLIENT_REFRESH_TOKEN,
  },
});

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  let successMessage = req.flash("error1");
  if (successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  res.render("auth/login", {
    pageTitle: "Login",
    errorMessage: message,
    successMessage: successMessage,
  });
};

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;
  Login.findOne({ username: username, password: password })
    .then(user => {
      if (user) {
        if (user.password === password) {
          req.session.isLoggedIn = true;
          req.session.login = user;
          req.session.save(err => {
            if (err) {
              return res.redirect("/login");
            }

            if (user.firstLogin) {
              user.firstLogin = false;
              user.save();
              return res.redirect("/reset-first-time");
            }

            if (user.flag === 0) {
              return res.redirect("/student");
            } else if (user.flag === 1) {
              return res.redirect("/faculty");
            } else if (user.flag === 2) {
              return res.redirect("/admin");
            } else {
              return;
            }
          });
        } else {
          req.flash(
            "error",
            "😡Looks like your email address doesn't match with the password. Wanna try again ?"
          );
          return res.redirect("/login");
        }
      } else {
        req.flash(
          "error",
          "😡Looks like your email address doesn't match with the password. Wanna try again ?"
        );
        return res.redirect("/login");
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getResetFirstTime = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/reset-first-time", {
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postResetFirstTime = (req, res, next) => {
  const pass = req.body.pass;
  const confirmPass = req.body.confirmPass;

  const username = req.session.login.username;
  const email = req.session.login.Email;

  Login.findOne({ username: username })
    .then(user => {
      if (!user) {
        req.flash("error", "Some error occurred!!");
        return res.redirect("/login");
      }
      if (pass === confirmPass) {
        user.password = pass;
        user.save().then(result => {
          transporter.sendMail({
            to: email,
            from: "shop@node-gmail.com",
            subject: "Password reset",
            html: `
            <p>Your password has been updated successfully!</p>
            `,
          });
        });
        return req.session.destroy(err => {
          res.redirect("/login");
        });
      } else {
        req.flash(
          "error",
          "😡 Confirm password dosen't match with the password!"
        );
        return res.redirect("/reset-first-time");
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  const email = req.body.email;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    Login.findOne({ Email: email })
      .then(user => {
        if (!user) {
          req.flash("error", "😡Looks like your email address doesn't exist.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        transporter.sendMail({
          to: email,
          from: "shop@node-gmail.com",
          subject: "Password reset",
          html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `,
        });
        if (result) {
          req.flash("error1", "✌️ Email is send");
          return res.redirect("/login");
        }
      })
      .then(res => {
        return;
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  const token = req.params.token;
  Login.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then(user => {
      res.render("auth/new-password", {
        userId: user._id.toString(),
        passwordToken: token,
        pageTitle: "Reset Password",
        errorMessage: message,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  Login.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid Option!!");
        return res.redirect("/login");
      }
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      return user.save();
    })
    .then(result => {
      req.flash("error1", "✌️ Your password has been changed!");
      return res.redirect("/login");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/login");
  });
};
