"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import styles from "../../../styles/pages/gradeHistory.module.scss";
import tableStyles from "../../../styles/pages/table.module.scss";
import Button from "@/components/shared/Buttons/Button";
import DynamicTable from "@/components/shared/DynamicTable/DynamicTable";

const gradeHistory = () => {
  const errorMessage = "";
  const student = {
    Name: "Yagnik Akbari",
    Div: {
      Name: "B",
    },
    Branch: {
      branchFullName: "Computer Engineering",
    },
    EnrollmentNo: "20BECE30003",
  };
  const results = [
    {
      semester: { Name: "sem8" },
      AcademicYear: "2020-2021",
      result: [
        {
          sr_no: 1,
          subject_code: "CE701-N",
          subject_name: "Compiler Design",
          subject_marks: "65",
        },
        {
          sr_no: 2,
          subject_code: "CT702-N",
          subject_name: "Cyber Security",
          subject_marks: "6",
        },
        {
          sr_no: 3,
          subject_code: "CE705-N",
          subject_name: "	Project-II",
          subject_marks: "25",
        },
        {
          sr_no: 4,
          subject_code: "CE703D-N",
          subject_name: "	Blockchain Technology (Category: Application)",
          subject_marks: "51",
        },
      ],
    },
    {
      semester: { Name: "sem7" },
      AcademicYear: "2020-2019",
      result: [
        {
          sr_no: 1,
          subject_code: "CE701-N",
          subject_name: "Compiler Design",
          subject_marks: "65",
        },
        {
          sr_no: 2,
          subject_code: "CT702-N",
          subject_name: "Cyber Security",
          subject_marks: "6",
        },
        {
          sr_no: 3,
          subject_code: "CE705-N",
          subject_name: "	Project-II",
          subject_marks: "25",
        },
        {
          sr_no: 4,
          subject_code: "CE703D-N",
          subject_name: "	Blockchain Technology (Category: Application)",
          subject_marks: "51",
        },
      ],
    },
    {
      semester: { Name: "sem6" },
      AcademicYear: "2019-2018",
      result: [
        {
          sr_no: 1,
          subject_code: "CE701-N",
          subject_name: "Compiler Design",
          subject_marks: "65",
        },
        {
          sr_no: 2,
          subject_code: "CT702-N",
          subject_name: "Cyber Security",
          subject_marks: "6",
        },
        {
          sr_no: 3,
          subject_code: "CE705-N",
          subject_name: "	Project-II",
          subject_marks: "25",
        },
        {
          sr_no: 4,
          subject_code: "CE703D-N",
          subject_name: "	Blockchain Technology (Category: Application)",
          subject_marks: "51",
        },
      ],
    },
  ];
  const columns = [
    { header: "sr no.", fieldName: "sr_no" },
    {
      header: "subject code",
      fieldName: "subject_code",
      thClassName: "text-start",
      tdClassName: "text-start",
    },
    {
      header: "subject name",
      fieldName: "subject_name",
      thClassName: "text-start",
      tdClassName: "text-start",
    },
    { header: "marks", fieldName: "subject_marks" },
    {
      header: "status",
      fieldName: "status",
      thClassName: "text-end",
      customRender: (column: any, rowValue: any) => {
        return (
          <div className={tableStyles["status-container"]}>
            {rowValue?.subject_marks >= 29 ? (
              <Image
                src="/icons/pass.svg"
                alt="pass"
                className="ms-auto"
                width="20"
                height="20"
              />
            ) : rowValue?.subject_marks < 28 ? (
              <Image
                src="/icons/remid.svg"
                alt="remid"
                className="ms-auto"
                width="20"
                height="20"
              />
            ) : (
              <Image
                src="/icons/absent.svg"
                alt="absent"
                className="ms-auto"
                width="20"
                height="20"
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between my-8 mx-auto max-w-[80vw]">
        <div className={`${styles["student-information"]} flex gap-5`}>
          <div>
            <label>Name:</label>
            <br />
            <p>{student.Name || "--"}</p>
          </div>
          <div>
            <label>Division:</label>
            <br />
            <p>{student.Div?.Name || "--"}</p>
          </div>
          <div>
            <label>Department:</label>
            <br />
            <p>{student.Branch?.branchFullName || "--"}</p>
          </div>
          <div>
            <label>Enrollment:</label>
            <br />
            <p>{student.EnrollmentNo || "--"}</p>
          </div>
        </div>
        <div
          className={`relative flex justify-between ${styles["search-bar"]}`}
        >
          <input
            type="text"
            className="search-text"
            placeholder="Enter Enrollment number"
            id="grade-history-searchbar"
            name="grade-history-searchbar"
          />
          <Button>
            <Image
              src="/icons/search.svg"
              alt="search"
              className="search-icon"
              width="14"
              height="14"
            />
          </Button>
          {errorMessage && (
            <p className="user-message error absolute -bottom-16 left-0">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      {results?.map((result, idx) => {
        return (
          <div key={idx} className={styles["result-container"]}>
            <p className={`uppercase ${styles["semester-info"]}`}>
              {result?.semester?.Name}
              <span> [{result?.AcademicYear}]</span>
            </p>
            <DynamicTable columns={columns} data={result?.result} />
          </div>
        );
      })}
    </>
  );
};

export default gradeHistory;
