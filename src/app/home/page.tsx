import { auth } from '@/lib/auth';
import React from 'react';

const Home = async () => {
  const session = await auth();
  console.log(session);

  return <div className="bg-primary">Home</div>;
};

export default Home;
