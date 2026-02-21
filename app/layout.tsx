import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import TanstackProvider from "@/src/providers/TanstackProvider";
import AuthProvider from "@/src/providers/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PerkUp - Exclusive Member Perks",
  description: "The ultimate platform for exclusive rewards and discounts for members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${poppins.variable} ${roboto.variable} font-roboto antialiased`}
      >
        <Toaster position="top-right" />
        <TanstackProvider>
          <AuthProvider>
            {/* <GLobalLoader /> */}
            {children}
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
