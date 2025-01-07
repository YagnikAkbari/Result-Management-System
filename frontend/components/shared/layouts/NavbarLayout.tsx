import React from "react";
import Navbar from "../Navbar/Navbar";
type roleTypes = "student" | "faculty" | "admin";

const NavbarLayout = ({
  children,
  role = "student",
}: Readonly<{ children: React.ReactNode; role: roleTypes }>) => {
  return (
    <div className="body-container">
      <nav>
        <Navbar role={role} />
      </nav>
      {children}
    </div>
  );
};

export default NavbarLayout;
