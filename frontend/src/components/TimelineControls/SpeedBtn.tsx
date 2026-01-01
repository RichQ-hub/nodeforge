'use client';

import VisualiserContext from '@/context/VisualiserContext';
import { barlow } from '@/lib/fonts';
import { useCallback, useContext, useState } from 'react';

const SPEED_OPTIONS = [
  0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2
]

const SpeedBtn = () => {
  const { controller } = useContext(VisualiserContext);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSpeed, setSelectedSpeed] = useState<number>(1);

  const handleSetSelectedSpeed = useCallback((speed: number) => {
    setSelectedSpeed(speed);
    controller.setTimelineSpeed(speed);
  }, [controller]);

  return (
    <div className={`${barlow.className} font-semibold flex items-center text-white`}>
      <div
        className='relative w-8 ml-2 group stroke-white cursor-pointer'
        onClick={() => {
          setOpen(prev => !prev);
        }}
      >
        {/* Icon */}
        <svg
          className='opacity-50 group-hover:opacity-100'
          viewBox="0 0 24 24"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M20.1691 10.2177C20.7024 11.3675 21 12.649 21 13.9999C21 15.4684 20.6483 16.8547 20.0245 18.0793C19.7216 18.674 19.0839 18.9999 18.4165 18.9999H5.58351C4.91613 18.9999 4.27839 18.674 3.97547 18.0793C3.3517 16.8547 3 15.4684 3 13.9999C3 9.02931 7.02944 4.99988 12 4.99988C13.3231 4.99988 14.5795 5.28539 15.711 5.79817M12.7071 13.2929C12.3166 12.9024 11.6834 12.9024 11.2929 13.2929C10.9024 13.6834 10.9024 14.3166 11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071C13.0976 14.3166 13.0976 13.6834 12.7071 13.2929ZM12.7071 13.2929L19.0711 6.92893"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>

        {/* Menu */}
        {open && 
          <ul className='opacity-100 absolute bottom-full right-0 w-max bg-[#242526] z-20 border border-white/15'>
            {SPEED_OPTIONS.map((opt, idx) => {
              return (
                <li key={idx}>
                  <button
                    className='flex justify-start w-full px-4 py-2 hover:bg-[#525357] cursor-pointer'
                    type='button'
                    onClick={() => handleSetSelectedSpeed(opt)}
                  >
                    {opt}
                  </button>
                </li>
              )
            })}
          </ul>
        }
      </div>
      <p className='w-10 ml-2'>{selectedSpeed}x</p>
    </div>
  )
}

export default SpeedBtn;