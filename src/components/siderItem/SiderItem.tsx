import clsx from 'clsx';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SiderItem.scss';

/** interface to describe SiderItem props */
interface SiderItemProps {
  location: string;
  count: string;
  title: string;
}

const SiderItem: React.FC<SiderItemProps> = (props: SiderItemProps) => {
  const { location, count, title } = props;

  const routeLocation = useLocation();

  return (
    <Link to={location}>
      <div
        className={clsx({
          'SiderItem-container': true,
          'SiderItem-active': routeLocation.pathname === location,
        })}
      >
        <div className="SiderItem-title">{title}</div>
        <div className="SiderItem-count">{count}</div>
      </div>
    </Link>
  );
};

export default SiderItem;
