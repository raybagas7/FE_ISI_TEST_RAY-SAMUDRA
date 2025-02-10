'use client';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Item } from './item';
import { useProjectList } from '@/hooks/useProjectList';

export default function SimpleList() {
  const searchRef = useRef('');
  const [filter, setFilter] = useState({
    pageParam: 1,
    search: '',
    sort: 'createdAt',
    order: 'asc',
    limit: 3,
  });

  const {
    isPending,
    isError,
    data: projectData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useProjectList(filter);
  console.log(projectData);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isError) {
    return (
      <div>
        <h2>Error Happen to Our Server</h2>
        <p>Please comeback later</p>
      </div>
    );
  }

  return (
    <main>
      <section className="bg-neutral-50">
        <div className="layout bg-black/20 max-w-lg min-h-screen py-20">
          <h2 className="text-center">Project List</h2>
          <div className="mt-2">
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <>
                {projectData.pages[0].data.projects.length > 0 ? (
                  <AnimatePresence initial={false}>
                    {projectData.pages.map((page, index) => (
                      <>
                        {page.data.projects.map((project) => (
                          <Item
                            key={project.id}
                            project={project}
                            index={index}
                          />
                        ))}
                      </>
                    ))}
                  </AnimatePresence>
                ) : (
                  <p>No data</p>
                )}
              </>
            )}
          </div>
          <div className={clsx(['mt-4 flex justify-center'])}>
            <button onClick={handleLoadMore} type="button">
              Load more
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
