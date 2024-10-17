import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';



export const metadata: Metadata = {
  title: "Salix AI | Salim",
  description: "Salim Rutaganda' personal AI - ask about Salim Rutaganda ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={GeistSans.className}
      >
        {children}
      </body>
    </html>
  );
}
