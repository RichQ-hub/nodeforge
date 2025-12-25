import CanvasSidebarIcon from './CanvasSidebarIcon';

import sidebarExpandIcon from '@/assets/sidebar-expand.svg';
import guideIcon from '@/assets/guide.svg';
import darkModeIcon from '@/assets/dark-mode.svg';
import React from 'react';

const CanvasSidebar = ({
  interfaceTabs,
  selectedTab,
  setSelectedTab,
  openSidebar,
  setOpenSidebar,
}: {
  interfaceTabs: {
    name: string;
    icon: any;
    node: React.ReactNode;
  }[];
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <aside className='bg-nodeforge-light-denim w-14 h-full flex flex-col z-20'>
      {/* Toggle Sidebar Section */}
      <div
        className='h-16 flex flex-col justify-center'
      >
        <CanvasSidebarIcon
          src={sidebarExpandIcon}
          name={'Sidebar Toggle'}
          tooltipContent={openSidebar ? 'Collapse Sidebar' : 'Expand Sidebar'}
          handleClick={() => setOpenSidebar(!openSidebar)}
          idx={0}
          flip={openSidebar}
        />
      </div>

      {/* Canvas Tabs Section */}
      <div className='py-3 border-t border-b border-white/20 grow'>
        {interfaceTabs.map((tab, idx) => {
          return (
            <CanvasSidebarIcon
              key={tab.name}
              name={tab.name}
              tooltipContent={tab.name}
              selectedTab={selectedTab}
              idx={idx}
              src={tab.icon}
              handleClick={() => {
                setSelectedTab(idx);
                setOpenSidebar(true);
              }}
            />
          )
        })}
      </div>

      {/* Settings Section */}
      <div className='py-3 mt-auto'>
        <CanvasSidebarIcon
          name='Lecture Mode'
          tooltipContent='Lecture Mode'
          src={guideIcon}
          idx={0}
        />
        <CanvasSidebarIcon
          name='Dark Mode'
          tooltipContent='Dark Mode'
          src={darkModeIcon}
          idx={0}
        />
      </div>
    </aside>
  )
}

export default CanvasSidebar;