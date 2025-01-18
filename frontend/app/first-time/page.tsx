'use client'
import Button from "@/components/shared/Buttons/Button";
import styles from "../../styles/pages/newPassword.module.scss";
import Input from "@/components/shared/Input/Input";
import React from "react";

const FirstTimeReset = () => {
  const errorMessage = "";
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${styles.main}`}
    >
      <div className={`${styles.wrapper}`}>
        <form
          className="flex flex-col gap-6 relative"
          id="frameForm"
          action="/new-password"
          method="POST"
        >
          <p className="text-center">You are logging in for the first time, kindly update your password.</p>
          <Input
            className="frame-item"
            type="password"
            name="password"
            placeholder="Enter new password"
            id="password"
          />
          <Input
            className="frame-item"
            type="password"
            name="confirmPass"
            placeholder="Confirm new password"
            id="password"
          />
          <Button className="" type="submit">
            Update Password
          </Button>
          {errorMessage && (
            <div className="user-message error absolute -bottom-24">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FirstTimeReset;
