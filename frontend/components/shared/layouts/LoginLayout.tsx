import React from "react";
import Navbar from "../Navbar/Navbar";

const NavbarLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      {children}
    </>
  );
};

export default NavbarLayout;
