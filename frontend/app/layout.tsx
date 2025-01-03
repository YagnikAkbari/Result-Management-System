import NavbarLayout from "@/components/shared/layouts/NavbarLayout";
import LoginLayout from "@/components/shared/layouts/LoginLayout";
import "../styles/main.scss";

export default function RootLayout({
  children,
  layoutType,
}: Readonly<{
  children: React.ReactNode;
  layoutType: string;
}>) {
  console.log("layoutType", layoutType);

  if (layoutType === "login") {
    return (
      <html lang="en">
        <body className={"antialiased bg-primary"}>
          <LoginLayout>{children}</LoginLayout>
        </body>
      </html>
    );
  } else if (layoutType === "dashboard") {
    return (
      <html lang="en">
        <body className={"antialiased bg-primary"}>{children}</body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={"antialiased bg-primary"}>
          <NavbarLayout>{children}</NavbarLayout>
        </body>
      </html>
    );
  }
}
