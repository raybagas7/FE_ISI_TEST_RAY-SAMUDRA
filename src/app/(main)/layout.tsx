import type { Metadata } from 'next';
import MainNavigation from '@/components/navigation/MainNavigation';
import ReduxProvider from '@/components/provider/ReduxProvider';
import { auth } from '@/lib/auth';
import AuthInitializer from '@/components/auth/AuthInitializer';

export const metadata: Metadata = {
  title: 'Create New Project',
  description: 'Create New Project Here',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <ReduxProvider>
      <AuthInitializer session={session} />
      <div>
        <main>
          <MainNavigation />
          <div className="min-h-screen md:pl-[200px]">{children}</div>
        </main>
      </div>
    </ReduxProvider>
  );
}
