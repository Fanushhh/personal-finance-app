
import "./globals.css";



export const metadata = {
  title: "Personal finance app",
  description: "Created using a base template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-public-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
