import React from 'react';
import style from './ListNavigation.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

interface Props {
  name: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ListNavigation = ({
  name,
  icon,
  isActive,
  to,
  onClick,
}: Props): React.ReactNode => {
  const linkContainerClasses = classNames(style.linkContainer, {
    [style.unactiveList]: !isActive,
    [style.activeList]: isActive,
  });
  return (
    <li className="relative flex pl-[15px]">
      {isActive && (
        <div
          data-testid="active-list"
          className="absolute left-0 h-full w-[3px] rounded-r-[10px]"
        />
      )}
      <Link
        onClick={onClick && onClick}
        className={`${linkContainerClasses}`}
        href={to}
      >
        <div className="text-xl">{icon}</div>
        <p className="">{name}</p>
      </Link>
    </li>
  );
};

export default ListNavigation;
