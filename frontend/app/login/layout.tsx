import LoginLayout from "@/components/shared/layouts/LoginLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoginLayout>{children}</LoginLayout>;
}
