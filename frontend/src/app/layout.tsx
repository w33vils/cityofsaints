import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-heading", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-accent", display: "swap", weight: ["400", "500", "600", "700"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2D5A27",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"),
  title: {
    default: "City of Saints — A Protestant Church in Łódź, Poland",
    template: "%s | City of Saints",
  },
  description: "City of Saints is a Protestant evangelical church in Łódź, Poland, gathering to love God, the church, the city, and the nations.",
  keywords: ["church", "Protestant", "evangelical", "Łódź", "Poland", "City of Saints", "Miasto Świętych"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "City of Saints",
    title: "City of Saints — A Protestant Church in Łódź, Poland",
    description: "A Protestant evangelical church in Łódź, Poland, gathering to love God, the church, the city, and the nations.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "City of Saints" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dmSans.variable}`}>
      <head>
        <link rel="dns-prefetch" href="http://localhost:1337" />
      </head>
      <body className="overflow-x-hidden">
        <Header />
        <main className="pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
