import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPA / CGPA Calculator",
  description: "Calculate GPA and CGPA for 10 semesters"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
