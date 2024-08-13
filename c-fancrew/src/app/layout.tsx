import { HeaderProvider } from "@/contexts/HeaderContext/HeaderContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeaderProvider>
        <body>{children}</body>
      </HeaderProvider>
    </html>
  );
}
