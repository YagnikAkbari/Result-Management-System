import React from "react";
import styles from "../../styles/pages/newPassword.module.scss";
import Input from "@/components/shared/Input/Input";
import Button from "@/components/shared/Buttons/Button";

const NewPassword = () => {
  const errorMessage = "errorm ensag sl lapo";
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
          <p className="text-center">Enter new password</p>
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

export default NewPassword;
