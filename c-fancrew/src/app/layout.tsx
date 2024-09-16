import { HeaderProvider } from "@/contexts/HeaderContext/HeaderContext";
import "./globals.css";
import { BarRightHeader } from "@/contexts/BarRightContext/BarRightContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeaderProvider>
        <BarRightHeader>
          <body>{children}</body>
        </BarRightHeader>
      </HeaderProvider>
    </html>
  );
}
