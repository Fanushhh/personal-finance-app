import '../globals.css'
import Navigation from "../components/Navigation/Navigation";
import QueryProvider from '../components/QueryProvider/QueryProvider';

export const metadata = {
  title: "Dashboard | Personal finance",
  description: "Dashboard for your personal finance app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`font-public-sans antialiased`}
      >
        <QueryProvider>
        
        <Navigation />
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}