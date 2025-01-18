import NavbarLayout from "@/components/shared/layouts/NavbarLayout";
import React from "react";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <NavbarLayout role="admin">{children}</NavbarLayout>;
};

export default RootLayout;
