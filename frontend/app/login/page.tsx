import React from "react";
import styles from "../../styles/pages/login.module.scss";
import Link from "next/link";

const Login = () => {
  const errorMessage = "Error Message";
  const successMessage = "Success Message";
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${styles?.main}`}
    >
      <div
        className={`flex flex-col items-center justify-center relative ${styles.container}`}
      >
        <div className={styles["login-label"]}>
          <b className={styles.login}>Login</b>
        </div>
        <form
          method="POST"
          action="/login"
          className={`flex flex-col ${styles["form-container"]}`}
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className={styles.input}
            required
          />
          <button className={styles.button} id="login-btn" type="submit">
            Login
          </button>
          <Link className={styles.reset} href="/reset">
            Forgot your password? <span>Reset Password</span>
          </Link>
          {successMessage && (
            <div className="user-message success absolute bottom-3">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="user-message error absolute bottom-3">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
