const Session = require("../model/session");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Login = require("../model/login");
const { getJWT } = require("../config/random");
const AppError = require("../config/error");

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

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("usename-----", req.body);

    const user = await Login.findOne({ username: username });

    if (!user) {
      throw new AppError(
        "😡Looks like you are not registered with us. Please Contact Admin.",
        400
      );
    }

    if (user.password !== password) {
      throw new AppError(
        "😡Looks like your email address doesn't match with the password. Wanna try again ?",
        400
      );
    }

    const existToken = await Session.findOne({ username });
    console.log("existToken", existToken);

    const token = getJWT(user);
    if (existToken) {
      await Session.deleteOne({ username });
    }
    await Session.create({ token, username });
    return res.status(200).json({ data: { user, token } });

    // if (user.firstLogin) {
    //   user.firstLogin = false;
    //   user.save();
    //   return res.redirect("/reset-first-time");
    // }
  } catch (err) {
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

exports.postLogout = async (req, res, next) => {
  try {
    const token = req.token;
    console.log("---:reqbodytoken:---", req.body, token);

    const { deletedCount } = await Session.deleteOne({ token });
    console.log("reqbody:---", deletedCount);
    if (deletedCount === 1) {
      return res.status(200).json({ message: "Logout Successfuly." });
    } else {
      console.log("req.body:--- else");
      return res.status(403).json({ message: "Token not Found." });
    }
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
  }
};
