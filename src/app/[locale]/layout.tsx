import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AnimeStoreProvider } from "@/providers/store-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const MiSans = localFont({
  src: "../../styles/font/MiSans VF.ttf",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();

  return (
    <html
      className={MiSans.className}
      lang={locale}
      suppressHydrationWarning={true}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <AnimeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="mx-auto flex max-w-5xl flex-col">
                <Header />
                <div className="mt-20">{children}</div>
                {/* <Footer /> */}
              </div>
              <Toaster />
            </ThemeProvider>
          </AnimeStoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
