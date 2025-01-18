"use client";
import { tokens } from "@/common/locals";
import { userLogout } from "@/redux/actions/user";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Navbar = ({ role }: { role: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    redirect("/login");
  };
  const checkAuth = async () => {
    const token = await tokens.get();
    const userType = await tokens.getUserType();

    if (token && userType) {
      redirect(`/${userType ? userType?.toLocaleLowerCase() : ""}`);
    } else {
      tokens.remove();
      tokens.removeUserType();
      redirect("/login");
      
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
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
        <button className="flex item-center" onClick={handleLogout}>
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
