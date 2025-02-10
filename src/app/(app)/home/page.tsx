import React from 'react';
import SimpleList from '.';

const Home = async () => {
  return (
    <div className="grid grid-cols-2 divide-x-2 min-h-screen">
      <SimpleList />
    </div>
  );
};

export default Home;
