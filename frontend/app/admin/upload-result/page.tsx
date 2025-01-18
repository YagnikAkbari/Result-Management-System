"use client";
import Button from "@/components/shared/Buttons/Button";
import Image from "next/image";
import React from "react";
import uploadStyles from "../../../styles/pages/upload.module.scss";

const uploadStudentData = () => {
  const successMessage = "";
  const errorMessage = "";
  const semesters = [
    { _id: "1563we", Name: "sem 1" },
    { _id: "1561as", Name: "sem 2" },
  ];
  const branches = [
    { _id: "1563", branchFullName: "Computer Engg." },
    { _id: "1561", branchFullName: "Infor Engg." },
  ];
  const onChangeSelect = () => {};
  return (
    <>
      <div
        className={`px-8 py-6 flex flex-col gap-6 bg-white w-fit mx-auto mt-14 relative rounded-2xl ${uploadStyles['main-box']}`}
      >
        <p className={`font-extrabold ${uploadStyles.title}`}>Upload Result:</p>
        <div className="flex items-center gap-8">
          <select
            id="semester"
            name="semester"
            onChange={onChangeSelect}
            className="text-uppercase"
          >
            <option value="default">Semester</option>
            {semesters?.map((semester) => {
              return (
                <option value={semester?._id} key={semester?._id}>
                  {semester?.Name}
                </option>
              );
            })}
          </select>
          <select
            id="branch"
            onChange={onChangeSelect}
            name="branch"
            className="text-uppercase"
          >
            <option value="default">Branch</option>
            {branches?.map((branch) => {
              return (
                <option value={branch?._id} key={branch?._id}>
                  {branch?.branchFullName}
                </option>
              );
            })}
          </select>
        </div>
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
            <i className="fa-regular fa-circle-down font-extrabold cursor-pointer" aria-hidden="true">
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
