import clsx from 'clsx';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

const CanvasSidebarIcon = ({
  name,
  tooltipContent,
  src,
  selectedTab,
  idx,
  flip,
  handleClick,
}: {
  name: string;
  tooltipContent: string;
  src: any;
  selectedTab?: number;
  idx: number;
  flip?: boolean;
  handleClick?: () => void;
}) => {
  return (
    <a
      data-tooltip-id={`tooltip-sidebar-${name}`}
      className={clsx(
        `relative py-3 w-full flex justify-center hover:cursor-pointer after:absolute after:right-0 after:top-0 after:bottom-0
        after:w-0.5 after:bg-white after:scale-y-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-y-100 opacity-50 hover:opacity-100`,
        {
          'after:scale-y-100 opacity-100': idx === selectedTab,
        }
      )}
      onClick={handleClick}
    >
      <Image
        className={clsx(
          'w-6',
          {
            'rotate-180': flip
          }
        )}
        src={src}
        alt=''
      />

      <Tooltip
        id={`tooltip-sidebar-${name}`}
        place='right'
        content={tooltipContent}
      />
    </a>
  )
}

export default CanvasSidebarIcon;