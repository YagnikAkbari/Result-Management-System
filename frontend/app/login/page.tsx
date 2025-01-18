"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../styles/pages/login.module.scss";
import Link from "next/link";
import Input from "@/components/shared/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/redux/actions/user";

import { tokens } from "@/common/locals";
import { RootState } from "@/redux";
import { redirect, usePathname, useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState({ state: "", message: "" });
  const { userData } = useSelector((state: RootState) => state.user);
  const { errors, errorMessage } = useSelector(
    (state: RootState) => state.error
  );

  const [loginData, setLoginData] = useState({ username: "", password: "" });

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

  const checkAuth = async () => {
    const token = await tokens.get();

    if (token && pathname === "/login") {
      redirect("/");
    }
  };
  useEffect(() => {
    checkAuth();
  }, [userData]);
  useEffect(() => {
    setMessage({
      state: "error",
      message: `${errors
        ?.flatMap((field: { [key: string]: string }) =>
          Object?.keys(field ?? {})
        )
        ?.join(", ")}${errors?.length ? " is Required" : ""}`,
    });
  }, [errors]);
  useEffect(() => {
    if (errorMessage) {
      setMessage({ state: "error", message: errorMessage });
    }
  }, [errorMessage]);
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
            {message?.state && message?.message && (
              <div
                className={`user-message ${
                  message?.state === "error"
                    ? "error"
                    : message?.state === "success"
                    ? "success"
                    : ""
                } absolute bottom-3`}
              >
                {message?.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
