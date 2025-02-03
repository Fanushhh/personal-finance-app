
import '../../globals.css'
export const metadata = {
  title: "Login | Personal finance",
  description: "Login to your app",
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