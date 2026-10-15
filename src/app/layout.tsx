import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yanis Harrat",
  description: "Portfolio de Yanis Harrat, étudiant en BTS SIO SISR.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
