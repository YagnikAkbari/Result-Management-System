import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({ role }: { role: string }) => {
  return (
    <div className="flex items-center justify-between nav-container">
      <Link href={`/${role}`}>
        <Image src="/logo.svg" alt="ldrp_logo" width="83" height="83" />
      </Link>
      <div className="flex item-center nav-menus gap-6">
        {role === "student" ? (
          <Link href="/student/profile" className="flex item-center">
            <Image
              src="/icons/user.svg"
              alt="user"
              width="22"
              height="22"
              className="me-2 fa-icon"
            />
            <span>Profile</span>
          </Link>
        ) : role === "admin" ? (
          <>
            <Link
              href="/admin/upload-student-data"
              className="flex item-center"
            >
              <i
                className="fa-solid fa-file-arrow-up fa-icon me-2"
                aria-hidden="true"
              ></i>
              <span>Upload Student Data</span>
            </Link>
            <Link href="/admin/upload-result" className="flex item-center">
              <i
                className="fa-solid fa-file-arrow-up fa-icon me-2"
                aria-hidden="true"
              ></i>
              <span>Upload Result</span>
            </Link>
          </>
        ) : (
          <Link href="/faculty/grade-history" className="flex item-center">
            <Image
              src="/icons/history.svg"
              alt="user"
              width="22"
              height="22"
              className="me-2 fa-icon"
            />
            <span>Grade Histroy</span>
          </Link>
        )}
        <button className="flex item-center">
          <Image
            src="/icons/logout.svg"
            alt="user"
            width="24"
            height="24"
            className="me-2 fa-icon"
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
