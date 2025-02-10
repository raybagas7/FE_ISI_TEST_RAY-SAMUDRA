'use client';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import React, { Fragment, useRef, useState } from 'react';
import { Item } from './item';
import { useProjectList } from '@/hooks/useProjectList';
import Button from '@/components/ui/Button';

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
    <div className="grid grid-cols-2 divide-x-2">
      <section className="py-20 px-4">
        <div className="min-h-screen ">
          <h2 className="text-center text-xl">Project List</h2>
          <div className="mt-2">
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <div>
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
                <div className={clsx(['mt-4 flex justify-center'])}>
                  <Button type="button">Load More</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">tes</section>
    </div>
  );
}
