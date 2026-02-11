import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto grid max-w-7xl gap-4 p-4 lg:grid-cols-[16rem,1fr]">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
