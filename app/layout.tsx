import type { Metadata } from "next";
import "./globals.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wellform MD",
  description: "Weight loss and wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        {/*  <Head>
			<meta name="description" content="Health and Wellnes" />
			<meta
			  name="keywords"
			  content="wellness, health, rehabilitation, Florida"
			/>
  
			<link
			  rel="stylesheet"
			  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
			/>
		  </Head> */}

        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
