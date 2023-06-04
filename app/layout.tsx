import Provider from "@/components/Provider";
import "./globals.css";

export const metadata = {
  title: "Chat-A-Lot",
  description: "A modern chat app for the modern world. Built with Next.js!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[url('/back3.svg')] bg-cover bg-center bg-no-repeat">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
