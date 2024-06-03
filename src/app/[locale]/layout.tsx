import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import DropzoneProvider from "@/providers/dropzone-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DropzoneProvider>
            <div className="mx-auto flex min-h-screen max-w-4xl flex-col">
              <Header />
              <div className="mt-20 flex-grow">{children}</div>
              <Footer />
            </div>
          </DropzoneProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
