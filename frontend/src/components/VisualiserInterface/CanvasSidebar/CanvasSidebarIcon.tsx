import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const CanvasSidebarIcon = ({
  src,
  selectedTab,
  idx,
  handleClick,
}: {
  src: any;
  selectedTab?: number;
  idx?: number;
  handleClick?: () => void;
}) => {
  return (
    <button
      type='button'
      className={clsx(
        `relative py-3 w-full flex justify-center hover:cursor-pointer after:absolute after:right-0 after:top-0 after:bottom-0
        after:w-0.5 after:bg-white after:scale-y-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-y-100 opacity-50 hover:opacity-100`,
        {
          'after:scale-y-100 opacity-100': idx === selectedTab
        }
      )}
      onClick={handleClick}
    >
      <Image
        className='w-7'
        src={src}
        alt=''
      />
    </button>
  )
}

export default CanvasSidebarIcon;