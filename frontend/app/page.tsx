"use client";
import { RootState } from "@/redux";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  console.log("userstae", user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
      <footer>
        <Link href="/login">Login</Link>
      </footer>
    </div>
  );
}
