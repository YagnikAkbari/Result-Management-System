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
  res.render("auth/login", {
    pageTitle: "Login | Result Management System",
    errorMessage: "",
    successMessage: "",
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Login.findOne({ username: username });

    if (!user) {
      return res.render("auth/login", {
        pageTitle: "Login | Result Management System",
        errorMessage:
          "😡Looks like you are not registered with us. Please Contact Admin.",
        successMessage: "",
      });
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
  let message = req.flash("success");
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

exports.postReset = async (req, res, next) => {
  try {
    const email = req.body.email;
    const token = crypto.randomBytes(32);
    const tokenHex = token.toString("hex");
    const user = await Login.findOne({ Email: email });

    res.render("auth/reset", {
      pageTitle: "Reset Password",
      errorMessage: "✌️ Please Check Your Mail Box For Reset Password.",
    });

    user.resetToken = tokenHex;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    transporter.sendMail({
      to: email,
      from: "shop@node-gmail.com",
      subject: "Password reset",
      html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:${
            process.env.PORT || 8080
          }/reset/${tokenHex}">link</a> to set a new password.</p>
          `,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    err.httpStatusCode = 500;
    return next(error);
  }
};

exports.getNewPassword = async (req, res) => {
  try {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    const token = req.params.token;
    const user = await Login.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      req.flash("error", "Token Expired.");
      return res.redirect("/login");
    }
    res.render("auth/new-password", {
      userId: user._id.toString(),
      passwordToken: token,
      pageTitle: "Reset Password",
      errorMessage: message,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postNewPassword = async (req, res, next) => {
  try {
    const {
      password: newPassword,
      confirmPass: newConfirmPassword,
      passwordToken,
      userId,
    } = req.body;

    if (newPassword.trim() !== newConfirmPassword.trim()) {
      req.flash("error", "New Password And Confirm Passowrd Is Not Matched!");
      return res.redirect(`/reset/${passwordToken}`);
    }
    const user = await Login.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId,
    });

    if (!user) {
      req.flash("error", "Invalid Option!!");
      return res.redirect("/login");
    }
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    res.render("auth/login", {
      pageTitle: "Login | Result Management System",
      successMessage: "✌️ Your password has been changed!",
    });
    return user.save();
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
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
