import { auth } from '@/lib/auth';
import React from 'react';

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="min-h-screen bg-primary pb-8 pt-[72px] md:pl-[200px]">
      Home
    </div>
  );
};

export default Home;
