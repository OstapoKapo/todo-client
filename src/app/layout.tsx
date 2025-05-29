import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./styles/reset.css"
import Header from "@/app/components/layout/header/header";
import Footer from "@/app/components/layout/footer/footer";
import {ReduxProvider} from "@/app/components/layout/provider/provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A todo project for codding challenge",
  authors: [{ name: "OstapoKapo", url: "https://github.com/OstapoKapo" }],
  icons:{
    icon: "/icon/todo-favicon.png",
    apple: "/icon/apple-todo-favicon.png",
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable}`}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
