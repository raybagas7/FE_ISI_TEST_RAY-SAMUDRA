import { auth } from '@/lib/auth';
import React from 'react';
import SimpleList from '.';

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <SimpleList />
    </div>
  );
};

export default Home;
