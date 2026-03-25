import type { Metadata } from "next";
import { Roboto, Source_Sans_3 } from "next/font/google";
import ScrollToTop from "../components/ScrollToTop";
import { FormProvider } from "../context/FormContext";
import "./globals.css";

// Import Source Sans 3
const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Import Roboto
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Starsight Employee Form Potal",
  description: "Starsight Employee Form Potal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans3.variable} ${roboto.variable} antialiased`}
      >
        <ScrollToTop />
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
