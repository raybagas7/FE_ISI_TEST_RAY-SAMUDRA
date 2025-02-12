'use client';
import React from 'react';
import ListNavigation from './ListNavigation/ListNavigation';
import MobileSideBar from './MobileSideBar';
import { Grid2x2, Grid2x2Plus, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/configureStore';

const MainNavigation = (): React.ReactNode => {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <MobileSideBar />
      <div
        className={`fixed left-0 top-0 z-20 hidden h-[100vh] flex-col justify-between md:block`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          id="aside-navigation"
          className={`relative h-full w-[200px] border-r-[1px] border-border bg-background px-[3px] pt-[48px]`}
        >
          <div className="relative">
            <nav className="mt-[24px]">
              <ul className=" space-y-[24px]">
                <ListNavigation
                  name="Home"
                  to="/home"
                  icon={<Grid2x2 />}
                  isActive={pathname === '/home'}
                />
                {user?.role === 'LEAD' && (
                  <ListNavigation
                    name="Create Project"
                    to="/project/create"
                    icon={<Grid2x2Plus />}
                    isActive={pathname === '/project/create'}
                  />
                )}
                <ListNavigation
                  name="Logout"
                  to="/"
                  icon={<LogOut />}
                  onClick={() => {
                    signOut();
                  }}
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
