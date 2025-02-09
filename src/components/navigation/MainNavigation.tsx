'use client';
import React, { useState } from 'react';
import ListNavigation from './ListNavigation/ListNavigation';
import MobileSideBar from './MobileSideBar';
import { GrProjects } from 'react-icons/gr';
import { RiApps2AddFill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import path from 'path';

const MainNavigation = (): React.ReactNode => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      <MobileSideBar />
      <div
        className={`fixed left-0 top-0 z-20 hidden h-[100vh] flex-col justify-between md:block`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          id="aside-navigation"
          className={`relative h-full w-[200px] border-r-[1px] border-border bg-primary px-[3px] pt-[48px]`}
        >
          <div className="relative">
            <nav className="mt-[24px]">
              <ul className=" space-y-[24px]">
                <ListNavigation
                  name="Home"
                  to="/home"
                  icon={<GrProjects />}
                  isActive={pathname === '/home'}
                />
                <ListNavigation
                  name="Create Project"
                  to="/project/create"
                  icon={<RiApps2AddFill />}
                  isActive={pathname === '/project/create'}
                />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
