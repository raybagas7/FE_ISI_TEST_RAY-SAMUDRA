'use client';
import React, { useEffect, useState } from 'react';
import MobileNavigation from './MobileNavigation';
import ListNavigation from './ListNavigation/ListNavigation';
import { motion, useAnimationControls } from 'framer-motion';
import { Grid2x2, Grid2x2Plus, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/configureStore';
const MobileSideBar = (): React.ReactNode => {
  const user = useSelector((state: RootState) => state.user.user);
  const pathname = usePathname();
  const [asideHide, setAsideHide] = useState<boolean | undefined>();
  const onChangeNav = async () => {
    setAsideHide(!asideHide);
  };

  const toggleAside = () => {
    setAsideHide((prev) => !prev);
  };

  const containerVariants = {
    close: {
      opacity: 0,
      transitionEnd: {
        display: 'none',
      },
    },
    open: {
      opacity: 1,
      display: 'block',
    },
  };

  const sideBar = {
    close: {
      x: '-300%',
    },
    open: {
      x: '0%',
    },
  };

  const containerAnimationControls = useAnimationControls();

  useEffect(() => {
    if (asideHide) {
      containerAnimationControls.start('open');
    } else {
      containerAnimationControls.start('close');
    }
  }, [asideHide]);

  return (
    <>
      <MobileNavigation toggleAside={toggleAside} />
      <motion.div
        variants={containerVariants}
        animate={containerAnimationControls}
        initial="close"
        data-testid="aside-backdrop"
        onClick={toggleAside}
        className={`fixed left-0 top-0 z-20 hidden h-[100vh] w-[100vw] flex-col justify-between bg-black/20 md:block md:w-[200px] 
      md:animate-none
      `}
      >
        <motion.div
          variants={sideBar}
          transition={{ type: 'just' }}
          animate={containerAnimationControls}
          initial="close"
          onClick={(e) => e.stopPropagation()}
          id="aside-navigation"
          className={`relative h-full w-[200px] border-r-[1px] border-border bg-background px-[3px] pt-[48px] md:block md:animate-none
          
          `}
        >
          <div className="relative">
            <nav className="mt-[24px]">
              <ul className=" space-y-[24px]">
                <ListNavigation
                  name="Home"
                  to="/"
                  icon={<Grid2x2 />}
                  onClick={() => onChangeNav()}
                  isActive={pathname === '/home'}
                />
                {user?.role === 'LEAD' && (
                  <ListNavigation
                    name="Create Project"
                    to="/project/create"
                    onClick={() => onChangeNav()}
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
        </motion.div>
      </motion.div>
    </>
  );
};

export default MobileSideBar;
