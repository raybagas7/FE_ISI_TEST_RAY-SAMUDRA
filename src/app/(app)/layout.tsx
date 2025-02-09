import type { Metadata } from 'next';
import MainNavigation from '@/components/navigation/MainNavigation';

export const metadata: Metadata = {
  title: 'Create New Project',
  description: 'Create New Project Here',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <MainNavigation />
        <div className="min-h-screen md:pl-[200px]">{children}</div>
      </main>
    </div>
  );
}
