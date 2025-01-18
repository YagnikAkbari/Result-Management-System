import React from "react";
import Image from "next/image";
import styles from "../../../../styles/pages/result.module.scss";
import DynamicTable from "@/components/shared/DynamicTable/DynamicTable";
import Link from "next/link";
import Button from "@/components/shared/Buttons/Button";
import ResultNotFound from "@/components/ResultNotFound";

const SemesterResult = () => {
  const resultFound = true;
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
  ];

  return (
    <>
      <div className="flex items-center gap-7 my-7 mx-24">
        <Link href="/student" className="">
          Back
        </Link>
        <Button>Download Result</Button>
      </div>
      {resultFound ? (
        <DynamicTable columns={columns} data={data} />
      ) : (
        <ResultNotFound />
      )}
    </>
  );
};

export default SemesterResult;
