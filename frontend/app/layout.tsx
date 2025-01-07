import React from "react";
import "../styles/main.scss";
import Provider from "./Provider";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={"antialiased bg-primary"}>
        <Provider>{children}</Provider>
        <script
          src="https://kit.fontawesome.com/d19926abb5.js"
          crossOrigin="anonymous"
          async
        ></script>
      </body>
    </html>
  );
};

export default RootLayout;
