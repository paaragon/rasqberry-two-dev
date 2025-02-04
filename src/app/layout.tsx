import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

import "@/styles/globals.scss";

const plex = IBM_Plex_Sans({ weight: ['100', '200', '300', '400', '500', '600', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children
}: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={plex.className}>
        {children}
      </body>
    </html>
  );
}
