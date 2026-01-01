'use client';

import VisualiserContext from '@/context/VisualiserContext';
import Image from 'next/image';
import React, { SetStateAction, useContext, useState } from 'react';
import listIcon from '@/assets/list.svg';

const SelectOperationBtn = ({
  setSelectedOperation,
}: {
  setSelectedOperation: React.Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { controller } = useContext(VisualiserContext);
  return (
    <div
      className='relative p-2 w-10 ml-auto hover:bg-white/50 cursor-pointer shrink-0 bg-nodeforge-box-bg rounded-br-2xl rounded-tr-2xl border border-l-0 border-white/15'
      onClick={() => {
        setOpen(prev => !prev);
      }}
    >
      <Image className='' src={listIcon} alt='' />

      {open &&
        <ul className='absolute top-full right-0 w-max bg-[#242526] z-20 border border-white/15'>
          {controller.dataStructure.getOperations().map((operation, idx) => {
            return (
              <li key={idx}>
                <button
                  className='flex justify-start w-full px-4 py-2 hover:bg-[#525357] cursor-pointer'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedOperation(operation);
                    setOpen(false);
                  }}
                >
                  {operation}
                </button>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default SelectOperationBtn