import { barlow } from '@/fonts';
import React from 'react';

const PanelBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`${barlow.className} flex flex-col bg-nodeforge-box rounded-2xl border border-nodeforge-white-10 min-h-64 overflow-y-hidden`}>
      <h2 className='text-nodeforge-subheading font-bold text-lg px-4 py-2 border-b border-b-nodeforge-white-10'>{title}</h2>
      <div className='px-4 py-3 overflow-y-scroll scrollbar'>
        {children}
      </div>
    </div>
  )
}

export default PanelBox;