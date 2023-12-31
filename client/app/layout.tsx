import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realtime Canvas - WS",
  description: "Realtime Canvas - WS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
