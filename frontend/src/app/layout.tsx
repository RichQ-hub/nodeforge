import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: 'NodeForge',
  description: 'An algorithm visualiser.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='antialiased box-border'>
        <Navbar />
        <div className='mt-14 min-h-[calc(100vh-56px)] text-black'>
          {children}
        </div>
      </body>
    </html>
  );
}
