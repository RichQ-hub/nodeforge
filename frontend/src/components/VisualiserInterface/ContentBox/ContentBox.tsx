import { barlow } from '@/lib/fonts';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { listItemVariants } from '@/lib/framerVariants';

const ContentBox = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className={`${barlow.className} flex flex-col mb-6 overflow-y-hidden bg-nodeforge-box-bg rounded-2xl border border-white/15`}
      variants={listItemVariants}
    >
      <div className='h-10 bg-nodeforge-light-denim flex items-center border-b border-white/15 shrink-0'>
        {/* Icon */}
        <div className='p-2 bg-nodeforge-amber w-10 rounded-br-2xl'>
          <Image src={icon} alt='' />
        </div>
        {/* Title */}
        <h2 className='text-nodeforge-amber ml-4 font-bold text-lg'>{title}</h2>
      </div>
      
      {/* Main Content */}
      <div className='font-semibold p-4'>
        {children}
      </div>
    </motion.div>
  )
}

export default ContentBox;