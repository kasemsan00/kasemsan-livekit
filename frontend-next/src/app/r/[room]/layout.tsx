export const metadata = {
  title: "Kasemsan Video",
  description: "By Kasemsan Chompuwised",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
