"use client";
import Button from "@/components/shared/Buttons/Button";
import DynamicTable from "@/components/shared/DynamicTable/DynamicTable";
import styles from "../../styles/pages/table.module.scss";
import Image from "next/image";
import React from "react";
import ResultNotFound from "@/components/ResultNotFound";

const Faculty = () => {
  const columns = [
    {
      header: "enrollment no",
      fieldName: "enrollment_no",
      thClassName: "text-start",
      tdClassName: "text-start",
    },
    {
      header: "student name",
      fieldName: "student_name",
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
      customRender: (column: any, rowValue: any) => {
        return (
          <div className={styles["status-container"]}>
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
  const data = [
    {
      enrollment_no: "20BECE30003",
      student_name: "Yagnik Akbari",
      subject_name: "Compiler Design",
      subject_marks: "65",
    },
    {
      enrollment_no: "20BECE30002",
      student_name: "Raj Akbari",
      subject_name: "Compiler Design",
      subject_marks: "65",
    },
    {
      enrollment_no: "20BECE30001",
      student_name: "Kishan Akbari",
      subject_name: "Compiler Design",
      subject_marks: "65",
    },
    {
      enrollment_no: "20BECE30006",
      student_name: "Krunal Akbari",
      subject_name: "Compiler Design",
      subject_marks: "65",
    },
  ];
  const batches = [
    { _id: "152", batchName: "2022-2024" },
    { _id: "151", batchName: "2023-2025" },
    { _id: "149", batchName: "2024-2026" },
  ];
  const branches = [
    { _id: "1563", branchFullName: "Computer Engg." },
    { _id: "1561", branchFullName: "Infor Engg." },
  ];
  const semesters = [
    { _id: "1563we", Name: "sem 1" },
    { _id: "1561as", Name: "sem 2" },
  ];
  const divisions = [
    { _id: "asdc", Name: "B" },
    { _id: "asdcjh", Name: "D" },
    { _id: "asa", Name: "J" },
  ];
  const subjects = [
    { subject: { _id: "asdc", subjectFullName: "Sub1" } },
    { subject: { _id: "asdcsds", subjectFullName: "Sub2" } },
    { subject: { _id: "asdazc", subjectFullName: "Sub2" } },
  ];
  const onChangeBranch = () => {
    // fetch(`/semesters?branch=${branch}&semester=${semester}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("datatatat", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };
  const onChangeSemester = () => {
    // fetch(`/semesters?branch=${branch}&semester=${semester}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("datatatat", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };
  const exportFailedResultsToExcel = () => {};
  const resultFound = true;
  const remidStudentCount = 5;
  return (
    <>
      <div className="flex gap-8 p-8">
        <select id="batch" name="batch" className="text-uppercase">
          <option value="default">Batch</option>
          {batches?.map((batch) => {
            return (
              <option key={batch?._id} value={batch?._id}>
                {batch?.batchName}
              </option>
            );
          })}
        </select>

        <select
          id="branch"
          onChange={onChangeBranch}
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

        <select
          id="semester"
          name="semester"
          onChange={onChangeSemester}
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

        <select id="division" name="division" className="text-uppercase">
          <option value="default">Division</option>
          {divisions?.map((division) => {
            return (
              <option value={division?._id} key={division?._id}>
                {division?.Name}
              </option>
            );
          })}
        </select>

        <select id="subject" name="subject" className="text-uppercase">
          <option value="default">Subject</option>
          {subjects?.map((subject) => {
            return (
              <option value={subject?.subject?._id} key={subject?.subject?._id}>
                {subject?.subject?.subjectFullName}
              </option>
            );
          })}
        </select>
        <Button type="submit" className="btn-search mt-0">
          Search
        </Button>
      </div>
      {resultFound ? (
        <DynamicTable columns={columns} data={data} />
      ) : (
        <ResultNotFound />
      )}
      {resultFound && (
        <Button
          type="submit"
          className="block mx-auto"
          varient="danger"
          onClick={() => exportFailedResultsToExcel()}
          disabled={remidStudentCount <= 0}
        >
          List of remid students ({remidStudentCount})
        </Button>
      )}
    </>
  );
};

export default Faculty;
