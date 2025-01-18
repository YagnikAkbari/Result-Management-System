"use client";
import Button from "@/components/shared/Buttons/Button";
import Image from "next/image";
import React from "react";
import uploadStyles from "../../../styles/pages/upload.module.scss";

const uploadStudentData = () => {
  const successMessage = "";
  const errorMessage = "";
  return (
    <>
      <div
        className={`px-8 py-6 flex flex-col gap-6 bg-white w-fit mx-auto mt-14 relative rounded-2xl ${uploadStyles['main-box']}`}
      >
        <p className={`font-extrabold ${uploadStyles.title}`}>
          Upload Student Data:
        </p>
        <div className="card-body">
          <div className="flex flex-col gap-4">
            <input
              type="file"
              className="form-control"
              name="excel"
              required
              id="input-file"
            />
            <Button type="submit" className="w-fit">
              Submit
            </Button>
          </div>
        </div>
        <div
          className={`flex item-center gap-2 mt-4 ${uploadStyles["correct-format-guide"]}`}
        >
          <span>
            <Image
              src="/icons/question_mark.svg"
              alt="Question mark"
              width="20"
              height="20"
            />
          </span>
          <span className="uppercase font-extrabold"> note:</span> Make sure
          that your file is in
          <span className={`cursor-pointer ${uploadStyles["correct-text"]}`}>
            correct format.
          </span>
          <span>
            <i className="fa-regular fa-circle-down bold" aria-hidden="true">
              <a
                href="/files/StudentDataSampleFile.xlsx"
                download
                className="download-hidden-link"
              ></a>
            </i>
          </span>
          {/* <div className="correct-format-image">
            <Image
              src="/icons/correct_student_format.png"
              alt="correct-format"
              width="20"
              height="20"
            />
          </div> */}
        </div>
        {successMessage && (
          <div className="user-message success absolute -bottom-16">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="user-message error absolute -bottom-16">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default uploadStudentData;
