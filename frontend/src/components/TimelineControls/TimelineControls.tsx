'use client';

import VisualiserContext from '@/context/VisualiserContext';
import { useContext, useEffect, useState } from 'react';

const TimelineControls = () => {
  const { controller } = useContext(VisualiserContext);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDraggingTimeline, setIsDraggingTimeline] = useState<boolean>(false);
  const [timelinePercent, setTimelinePercent] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      setTimelinePercent((controller.timeline.time() / controller.timelineDuration) * 100);
    }

    controller.timeline.on('time', update);

    return () => {
      controller.timeline.off('time', update);
    }
  }, []);

  const handleTimelineUpdate = (percent: number) => {
    if (isDraggingTimeline) {
      // controller.seekPercent(percent);
      setTimelinePercent(percent);
    }
  };

  return (
    <div className='w-full h-11 bg-nodeforge-box px-4 py-1 flex items-center gap-2 justify-between border-l border-l-white/15'>
      {/* Step back button. */}
      <button
        className='w-7 rotate-180 opacity-50 hover:opacity-100 cursor-pointer fill-none'
        type='button'
      >
        <svg
          viewBox="0 0 24 24"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Media / Skip_Forward">
              <path id="Vector" d="M17 5V19M6 10.5713V13.4287C6 15.2557 6 16.1693 6.38355 16.6958C6.71806 17.1549 7.23174 17.4496 7.79688 17.5073C8.44484 17.5733 9.23434 17.113 10.8125 16.1924L13.2617 14.7637L13.2701 14.7588C14.8216 13.8537 15.5979 13.4009 15.8595 12.8105C16.0881 12.2946 16.0881 11.7062 15.8595 11.1902C15.5974 10.5988 14.8188 10.1446 13.2617 9.2363L10.8125 7.80762C9.23434 6.88702 8.44484 6.42651 7.79688 6.49256C7.23174 6.55017 6.71806 6.84556 6.38355 7.30469C6 7.83111 6 8.74424 6 10.5713Z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </g>
        </svg>
      </button>

      {/* Play button. */}
      {isPlaying ? (
        <button
          type='button'
          onClick={() => setIsPlaying(false)}
        >
          <svg
            className='w-7 cursor-pointer hover:fill-green-400 fill-white opacity-50 hover:opacity-100'
            viewBox="0 0 24 24"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.07612 8.61732C8 8.80109 8 9.03406 8 9.5V14.5C8 14.9659 8 15.1989 8.07612 15.3827C8.17761 15.6277 8.37229 15.8224 8.61732 15.9239C8.80109 16 9.03406 16 9.5 16C9.96594 16 10.1989 16 10.3827 15.9239C10.6277 15.8224 10.8224 15.6277 10.9239 15.3827C11 15.1989 11 14.9659 11 14.5V9.5C11 9.03406 11 8.80109 10.9239 8.61732C10.8224 8.37229 10.6277 8.17761 10.3827 8.07612C10.1989 8 9.96594 8 9.5 8C9.03406 8 8.80109 8 8.61732 8.07612C8.37229 8.17761 8.17761 8.37229 8.07612 8.61732ZM13.0761 8.61732C13 8.80109 13 9.03406 13 9.5V14.5C13 14.9659 13 15.1989 13.0761 15.3827C13.1776 15.6277 13.3723 15.8224 13.6173 15.9239C13.8011 16 14.0341 16 14.5 16C14.9659 16 15.1989 16 15.3827 15.9239C15.6277 15.8224 15.8224 15.6277 15.9239 15.3827C16 15.1989 16 14.9659 16 14.5V9.5C16 9.03406 16 8.80109 15.9239 8.61732C15.8224 8.37229 15.6277 8.17761 15.3827 8.07612C15.1989 8 14.9659 8 14.5 8C14.0341 8 13.8011 8 13.6173 8.07612C13.3723 8.17761 13.1776 8.37229 13.0761 8.61732Z">
              </path>
            </g>
          </svg>
        </button>
      ) : (
        <button
          type='button'
          onClick={() => setIsPlaying(true)}
        >
          <svg
            className='w-7 cursor-pointer hover:fill-green-400 fill-white opacity-50 hover:opacity-100'
            viewBox="0 0 24 24"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z">
              </path>
            </g>
          </svg>
        </button>
      )}

      {/* Step forward button. */}
      <button
        className='w-7 opacity-50 hover:opacity-100 cursor-pointer fill-none'
        type='button'
      >
        <svg
          viewBox="0 0 24 24"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Media / Skip_Forward">
              <path id="Vector" d="M17 5V19M6 10.5713V13.4287C6 15.2557 6 16.1693 6.38355 16.6958C6.71806 17.1549 7.23174 17.4496 7.79688 17.5073C8.44484 17.5733 9.23434 17.113 10.8125 16.1924L13.2617 14.7637L13.2701 14.7588C14.8216 13.8537 15.5979 13.4009 15.8595 12.8105C16.0881 12.2946 16.0881 11.7062 15.8595 11.1902C15.5974 10.5988 14.8188 10.1446 13.2617 9.2363L10.8125 7.80762C9.23434 6.88702 8.44484 6.42651 7.79688 6.49256C7.23174 6.55017 6.71806 6.84556 6.38355 7.30469C6 7.83111 6 8.74424 6 10.5713Z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </g>
        </svg>
      </button>

      {/* Timeline Slider */}
      <input
        className='w-full accent-green-400 cursor-pointer'
        type='range'
        id='timeline-slider'
        min='0'
        max='100'
        step='0.01'
        value={timelinePercent}
        onChange={(e) => {
          e.preventDefault();
          // handleTimelineUpdate(Number(e.target.value));
          setTimelinePercent(Number(e.target.value));
        }}
        onMouseDown={() => {
          setIsDraggingTimeline(true);
          controller.pauseTimeline();
        }}
        onMouseUp={(e) => {
          setIsDraggingTimeline(false);
          // setTimelinePercent(Number(e.currentTarget.value))
        }}
      />

      {/* Speed Control Button */}
      <button
        className='w-8 ml-2 opacity-50 stroke-white cursor-pointer hover:opacity-100'
      >
        <svg
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
      </button>
    </div>
  )
}

export default TimelineControls;