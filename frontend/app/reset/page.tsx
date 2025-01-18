import React from "react";
import Input from "@/components/shared/Input/Input";
import styles from "../../styles/pages/reset.module.scss";
import Button from "@/components/shared/Buttons/Button";

const ResetEmail = () => {
  const errorMessage = "";
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${styles.main}`}
    >
      <div className={`${styles.wrapper}`}>
        <form
          className="flex flex-col gap-6 relative"
          id="frameForm"
          action="/reset"
          method="POST"
        >
          <p>Enter your Email Address to get a reset password link.</p>
          <Input
            className="frame-item"
            type="email"
            name="email"
            id="email"
            required={true}
            placeholder="Enter your Email"
          />
          <Button type="submit">Send Mail</Button>
          {errorMessage && (
            <div className="user-message success absolute -bottom-14">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetEmail;
