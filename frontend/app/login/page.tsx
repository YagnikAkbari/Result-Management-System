"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../styles/pages/login.module.scss";
import Link from "next/link";
import Input from "@/components/shared/Input/Input";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/actions/user";

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const errorMessage = "Error Message";
  const successMessage = "Success Message";
  const handleLogin = useCallback(() => {
    dispatch(userLogin(loginData));
  }, [loginData]);

  useEffect(() => {
    const handleKeyDown = (e: any): void => {
      if (e?.key === "Enter") {
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogin]);
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${styles?.main}`}
    >
      <div className={styles.wrapper}>
        <div
          className={`flex flex-col items-center justify-center relative ${styles.container}`}
        >
          <div className={styles["login-label"]}>
            <b className={styles.login}>Login</b>
          </div>
          <div className={`flex flex-col ${styles["form-container"]}`}>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              className={styles.input}
              required={true}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  [e?.target?.name]: e?.target?.value,
                })
              }
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className={styles.input}
              required={true}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  [e?.target?.name]: e?.target?.value,
                })
              }
            />
            <button
              className={styles.button}
              id="login-btn"
              type="submit"
              onClick={handleLogin}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
