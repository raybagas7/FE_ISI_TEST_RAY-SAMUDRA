'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';

interface Props {
  toggleAside: () => void;
}

const MobileNavigation = ({ toggleAside }: Props): React.ReactNode => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed top-0 z-10 flex h-[72px] w-full items-center justify-between bg-background px-5 
        border-b border-border
        ${
          pathname === '/'
            ? 'md:justify-end'
            : 'md:justify-between md:pl-[232px]'
        }
    `}
    >
      <GiHamburgerMenu
        className="size-6 cursor-pointer md:hidden"
        onClick={toggleAside}
      />

      {pathname !== '/home' && (
        <Link
          href={'/home'}
          className="hidden md:flex md:items-center md:justify-center "
        >
          <IoArrowBack className="size-6" onClick={toggleAside} />
        </Link>
      )}
    </div>
  );
};

export default MobileNavigation;
