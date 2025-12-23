import { monomaniac } from '@/lib/fonts';
import Image from 'next/image';
import React from 'react';

import bstIcon from '@/assets/bst-icon.svg';

const CanvasInterface = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className='h-full flex flex-col bg-nodeforge-dark-denim text-white'
    >
      <div className='flex items-center h-16 px-5'>
        <h1 className={`${monomaniac.className} text-2xl mr-3`}>Binary search Tree</h1>
        <Image className='w-7' src={bstIcon} alt='' />
      </div>

      {/* Main Section */}
      <div className='h-full px-5 mr-3 overflow-y-auto scrollbar pt-2'>
        {children}
      </div>
    </div>
  )
}

export default CanvasInterface;