const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Login = require("../model/login");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "yagnik58ppsv@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.CLIENT_REFRESH_TOKEN,
    logger: true,
    debug: true,
  },
});

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  let successMessage = req.flash("success");
  if (successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  res.render("auth/login", {
    pageTitle: "Login | Result Management System",
    errorMessage: message,
    successMessage,
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Login.findOne({ username: username });

    if (!user) {
      req.flash(
        "error",
        "😡Looks like you are not registered with us. Please Contact Admin."
      );
      return res.status(401).redirect("/login");
    }

    if (user.password !== password) {
      req.flash(
        "error",
        "😡Looks like your email address doesn't match with the password. Wanna try again ?"
      );
      return res.redirect("/login");
    }

    req.session.isLoggedIn = true;
    req.session.login = user;
    req.session.save((err) => {
      if (err) {
        return res.redirect("/login");
      }

      if (user.firstLogin) {
        user.firstLogin = false;
        user.save();
        return res.redirect("/reset-first-time");
      }

      if (user.userType === "STUDENT") {
        return res.redirect("/student");
      } else if (user.userType === "FACULTY") {
        return res.redirect("/faculty");
      } else if (user.userType === "ADMIN") {
        return res.redirect("/admin");
      } else {
        return;
      }
    });
  } catch (err) {
    err.httpStatusCode = 500;
    next(err);
  }
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

exports.postResetFirstTime = async (req, res, next) => {
  try {
    const pass = req.body.pass;
    const confirmPass = req.body.confirmPass;

    const username = req.session.login.username;
    const email = req.session.login.Email;

    const user = await Login.findOne({ username: username });

    if (!user) {
      req.flash("error", "Some error occurred!!");
      return res.redirect("/login");
    }
    if (pass !== confirmPass) {
      req.flash(
        "error",
        "😡 Confirm password dosen't match with the password!"
      );
      return res.redirect("/reset-first-time");
    }
    user.password = pass;
    await user.save();

    transporter.sendMail({
      to: email,
      from: "yagnik58ppsv@gmail.com",
      subject: "Password reset",
      html: `<p>Your password has been updated successfully!</p>`,
    });

    req.flash(
      "success",
      "Your Password is Changed Succefully. Please Login with new Password now onwards."
    );
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: false,
    });

    req.session.destroy();
    res.redirect("/login");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
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
      .then((user) => {
        if (!user) {
          req.flash("error", "😡Looks like your email address doesn't exist.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
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
      .then((res) => {
        return;
      })
      .catch((err) => {
        // const error = new Error(err);
        err.httpStatusCode = 500;
        return next(err);
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
    .then((user) => {
      res.render("auth/new-password", {
        userId: user._id.toString(),
        passwordToken: token,
        pageTitle: "Reset Password",
        errorMessage: message,
      });
    })
    .catch((err) => {
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
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Option!!");
        return res.redirect("/login");
      }
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      return user.save();
    })
    .then((result) => {
      req.flash("error1", "✌️ Your password has been changed!");
      return res.redirect("/login");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: false,
    });

    res.redirect("/login");
  });
};
