'use client';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { Item } from './item';

export default function SimpleList() {
  const [countList, setCountList] = React.useState([1, 2, 3, 4, 5]);

  return (
    <main>
      <section className="bg-neutral-50">
        <div className="layout max-w-lg min-h-screen py-20">
          <h1>Simple List</h1>

          <button
            className="mt-8 w-full justify-center"
            onClick={() =>
              setCountList((prev) => [
                ...prev,
                (prev[prev.length - 1] ?? 0) + 1,
              ])
            }
          >
            Add Item
          </button>
          <div className="mt-2">
            <AnimatePresence initial={false}>
              {countList.map((count, index) => (
                <Item
                  key={count}
                  index={index}
                  count={count}
                  countList={countList}
                  setCountList={setCountList}
                />
              ))}
            </AnimatePresence>
          </div>
          <div
            className={clsx([
              'pt-4 bg-neutral-50 flex items-center justify-between',
            ])}
          >
            <p className="text-neutral-500 text-sm">
              Total count: {countList.length}
            </p>

            <button className="justify-center" onClick={() => setCountList([])}>
              Delete all
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
