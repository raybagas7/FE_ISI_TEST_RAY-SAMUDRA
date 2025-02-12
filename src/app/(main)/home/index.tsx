'use client';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import React, { Fragment, useState } from 'react';
import { Item } from './item';
import { useProjectList } from '@/hooks/useProjectList';
import Button from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

export const SimpleList = () => {
  const [filter, setFilter] = useState({
    pageParam: 1,
    search: '',
    sort: 'createdAt',
    order: 'desc',
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
    <>
      <section className="pt-[88px] px-4 min-w-[50vw]">
        {isPending ? (
          <Spinner />
        ) : (
          <div>
            <h2 className="text-center text-xl font-bold">Project List</h2>
            <div className="mt-2">
              <div>
                {projectData.pages[0].data.projects.length > 0 ? (
                  <AnimatePresence initial={false}>
                    {projectData.pages.map((page, index) => (
                      <Fragment key={`page-${index}`}>
                        {page.data.projects.map((project) => (
                          <Item key={project.id} project={project} />
                        ))}
                      </Fragment>
                    ))}
                  </AnimatePresence>
                ) : (
                  <p>No data</p>
                )}
                <div className={clsx(['my-4 flex justify-center'])}>
                  {hasNextPage ? (
                    <Button
                      type="button"
                      variant="primary"
                      isloading={isFetching}
                      onClick={handleLoadMore}
                    >
                      Load More
                    </Button>
                  ) : (
                    <p>No More Project</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default SimpleList;
