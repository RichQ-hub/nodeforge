'use client';

import VisualiserContext from '@/context/VisualiserContext';
import { useCallback, useContext, useEffect, useState } from 'react';

const TimelineControls = () => {
  const { controller } = useContext(VisualiserContext);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timelinePercent, setTimelinePercent] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const newPercent = (controller.timeline.time() / controller.timelineDuration) * 100;
      setTimelinePercent(newPercent);
      if (newPercent >= 100) {
        setIsPlaying(false);
      }
    }

    controller.timeline.on('time', update);

    return () => {
      controller.timeline.off('time', update);
    }

    // IMPORTANT: Everytime we run a new operation, it creates a new timeline. So we have to
    // reattach a new update() handler everytime that happens.
  }, [controller.timeline]);

  const handleTimelineUpdate = useCallback((percent: number) => {
    controller.seekPercent(percent);
    setTimelinePercent(percent);
  }, []);

  const handleReplay = useCallback(() => {
    controller.seekPercent(0);
    handlePlay();
  }, [controller]);

  const handlePlay = useCallback(() => {
    controller.playTimeline();
    setIsPlaying(true);
  }, [controller]);

  const handlePause = useCallback(() => {
    controller.pauseTimeline();
    setIsPlaying(false);
  }, [controller]);

  const handleStepForward = useCallback(() => {
    handlePause();
    controller.stepForward();
  }, [controller]);

  const handleStepBackward = useCallback(() => {
    handlePause();
    controller.stepBackward();
  }, [controller]);

  return (
    <div className='w-full h-11 bg-nodeforge-box px-4 py-1 flex items-center gap-2 justify-between border-l border-l-white/15'>
      {/* Step back button. */}
      <button
        className='w-7 rotate-180 opacity-50 hover:opacity-100 cursor-pointer fill-none'
        type='button'
        onClick={handleStepBackward}
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
      {timelinePercent >= 100 ? (
        <button
          className='w-7 h-7 cursor-pointer hover:fill-green-400 fill-white opacity-50 hover:opacity-100'
          type='button'
          onClick={handleReplay}
        >
          <svg
            viewBox="0 0 300.003 300.003" 
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g> <g>
              <path d="M150.005,0C67.164,0,0.001,67.159,0.001,150c0,82.838,67.162,150.003,150.003,150.003S300.002,232.838,300.002,150 C300.002,67.159,232.844,0,150.005,0z M230.091,172.444c-9.921,37.083-43.801,64.477-83.969,64.477 c-47.93,0-86.923-38.99-86.923-86.923s38.99-86.92,86.923-86.92c21.906,0,41.931,8.157,57.228,21.579l-13.637,23.623 c-11-11.487-26.468-18.664-43.594-18.664c-33.294,0-60.38,27.088-60.38,60.38c0,33.294,27.085,60.38,60.38,60.38 c25.363,0,47.113-15.728,56.038-37.937h-20.765l36.168-62.636l36.166,62.641H230.091z">
              </path>
            </g> </g> </g>
          </svg>
        </button>
      ) : isPlaying ? (
        <button
          className='w-7 h-7 cursor-pointer hover:fill-green-400 fill-white opacity-50 hover:opacity-100'
          type='button'
          onClick={handlePause}
        >
          <svg
            viewBox="0 0 300.003 300.003"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M150.001,0c-82.838,0-150,67.159-150,150c0,82.838,67.162,150.003,150,150.003c82.843,0,150-67.165,150-150.003 C300.001,67.159,232.846,0,150.001,0z M134.41,194.538c0,9.498-7.7,17.198-17.198,17.198s-17.198-7.7-17.198-17.198V105.46 c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z M198.955,194.538c0,9.498-7.701,17.198-17.198,17.198 c-9.498,0-17.198-7.7-17.198-17.198V105.46c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z"></path> </g> </g> </g>
          </svg>
          
        </button>
      ) : (
        <button
          className='w-7 h-7 cursor-pointer hover:fill-green-400 fill-white opacity-50 hover:opacity-100'
          type='button'
          onClick={handlePlay}
        >
          <svg
            viewBox="0 0 300 300" 
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M150,0C67.157,0,0,67.162,0,150c0,82.841,67.157,150,150,150s150-67.159,150-150C300,67.162,232.843,0,150,0z M205.846,158.266l-86.557,49.971c-1.32,0.765-2.799,1.144-4.272,1.144c-1.473,0-2.949-0.379-4.274-1.144 c-2.64-1.525-4.269-4.347-4.269-7.402V100.89c0-3.053,1.631-5.88,4.269-7.402c2.648-1.528,5.906-1.528,8.551,0l86.557,49.974 c2.645,1.53,4.274,4.352,4.269,7.402C210.12,153.916,208.494,156.741,205.846,158.266z"></path> </g> </g> 
              </g>
          </svg>
        </button>
      )}

      {/* Step forward button. */}
      <button
        className='w-7 opacity-50 hover:opacity-100 cursor-pointer fill-none'
        type='button'
        onClick={handleStepForward}
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
        name='timeline-slider'
        key='timeline-slider'
        min='0'
        max='100'
        step='0.01'
        value={timelinePercent}
        onChange={(e) => {
          e.preventDefault();
          handlePause();
          handleTimelineUpdate(Number(e.target.value));
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