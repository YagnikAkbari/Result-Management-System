import Image from "next/image";
import React from "react";
import styles from "../styles/pages/table.module.scss";

const ResultNotFound = () => {
  return (
    <div
      className={`flex flex-col items-center ${styles["no-result-container"]}`}
    >
      <Image
        src="/icons/not_found.svg"
        alt="No result found"
        width="280"
        height="280"
      />
      <p className={styles["no-result-text"]}>Result not found.</p>
    </div>
  );
};

export default ResultNotFound;
