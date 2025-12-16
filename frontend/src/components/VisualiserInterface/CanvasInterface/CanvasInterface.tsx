import { monomaniac } from '@/fonts';
import Image from 'next/image';
import React from 'react';

import bstIcon from '@/assets/bst-icon.svg';
import { Panel } from 'react-resizable-panels';

const CanvasInterface = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Panel
      className='h-full flex flex-col px-5 bg-nodeforge-dark-denim text-white'
      order={1}
      minSize={25}
      maxSize={30}
      defaultSize={30}
    >
      <div className='flex items-center h-16'>
        <h1 className={`${monomaniac.className} text-2xl mr-3`}>Binary search Tree</h1>
        <Image className='w-7' src={bstIcon} alt='' />
      </div>

      {/* Main Section */}
      {children}
    </Panel>
  )
}

export default CanvasInterface;