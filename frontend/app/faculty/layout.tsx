import NavbarLayout from "@/components/shared/layouts/NavbarLayout";
import React from "react";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <NavbarLayout role="faculty">{children}</NavbarLayout>;
};

export default RootLayout;