"use client";
import Button from "@/components/shared/Buttons/Button";
import React from "react";

const Student = () => {
  const semesters = [
    { Name: "Sem1", semesterKey: "sem1" },
    { Name: "Sem2", semesterKey: "sem2" },
    { Name: "Sem3", semesterKey: "sem3" },
  ];

  return (
    <>
      <div className="flex gap-7 my-7 mx-24">
        <select id="semester" name="Semester" className="">
          <option value="default">Semester</option>
          {semesters?.map((sem) => {
            return (
              <option key={sem?.semesterKey} value={sem?.semesterKey}>
                {sem?.Name}
              </option>
            );
          })}
        </select>
        <Button varient="primary">Search</Button>
      </div>
    </>
  );
};

export default Student;
