"use client";

import { tokens } from "@/common/locals";
import { RootState } from "@/redux";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();

  const { userData } = useSelector((state: RootState) => state.user);

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
  }, [userData]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      Redirecting...
    </div>
  );
}
