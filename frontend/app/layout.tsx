import type { Metadata } from "next";
import "./globals.css";
import MetadataHead from "./MetadataHead";

export const metadata: Metadata = {
  title: "Madras Modern Tourism",
  description: "Travel and tour booking website for curated modern tourism experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <MetadataHead />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
