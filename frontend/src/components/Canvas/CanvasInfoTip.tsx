'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { barlow, jetbrains } from '@/lib/fonts';
import { mat3, vec2 } from 'gl-matrix';
import { listItemVariants, listVariants } from '@/lib/framerVariants';
import { Tooltip } from 'react-tooltip';

const containerVariant = {
  open: {
    minWidth: 330,
    display: 'block'
  },
  closed: {
    minWidth: 0,
    display: 'flex'
  }
}

const CanvasInfoTip = ({
  dimensions,
  origin,
  matrix
}: {
  dimensions: {
    height: number;
    width: number;
  };
  origin: vec2;
  matrix: mat3;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0});
  const [open, setOpen] = useState<boolean>(false);

  /**
   * Tracks mouse position in the viewport.
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      setMousePos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <>
      <motion.div
        className={`${barlow.className} group overflow-hidden text-white absolute top-3 right-3 bg-nodeforge-box border border-white/15 items-center justify-center hover:border-nodeforge-amber`}
        layout
        style={{
          ...containerVariant[open ? 'open' : 'closed'],
          borderRadius: 32,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-tooltip-id='canvas-infotip'
      >
        {!open ? (
          <motion.button
            className='w-full h-full cursor-pointer p-3'
            type='button'
            onClick={() => setOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ delay: 0.3 }}
          >
            <svg
              className='w-7 h-7 fill-nodeforge-amber group-hover:fill-white'
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M8 0l6.092 14.197l-.123.377c-.187.61-.451 1.036-.793 1.272c-.334.236-.871.353-1.612.353h-1.367v2.87h2.528c1.261 0 2.274-.306 3.039-.917c.773-.602 1.45-1.665 2.027-3.187L23.539 0h-4.37l-3.124 9.277L12.37 0H8zm24.2 0l-10 15.299h7.5v48.137H0v5h29.701V100h5V68.436h50v7.5L100 65.937l-15.299-10v7.5h-7.16v-7h-5v7h-9.28v-7h-5v7h-9.28v-7h-5v7H34.7v-9.28h7v-5h-7v-9.281h7v-5h-7v-9.28h7v-5h-7V15.3h7.5L32.2 0zM15.507 75.709c-2.4 0-4.253.823-5.555 2.467C8.651 79.812 8 82.143 8 85.17c0 3.02.651 5.35 1.953 6.994c1.302 1.636 3.154 2.455 5.555 2.455c2.392 0 4.239-.82 5.54-2.455c1.303-1.644 1.954-3.975 1.954-6.994c0-3.027-.651-5.358-1.953-6.994c-1.302-1.644-3.149-2.467-5.541-2.467zm69.367 2.62l4.932 6.677L84.63 92h4.627l3.039-4.32L95.373 92H100l-5.176-7.02l4.932-6.652h-4.627l-2.832 4.053l-2.795-4.053h-4.627zm-69.367.59c1.009 0 1.725.47 2.148 1.405c.432.928.647 2.53.647 4.809c0 2.303-.215 3.927-.647 4.87c-.431.945-1.147 1.417-2.148 1.417c-1.01 0-1.729-.472-2.16-1.416c-.432-.944-.649-2.568-.649-4.871c0-2.279.217-3.881.649-4.809c.431-.936 1.15-1.404 2.16-1.404z"
                fillRule="evenodd">
              </path>
            </svg>
          </motion.button>
        ) : (
          <>
            <div className='py-2 px-5 flex items-center justify-between border-b border-b-white/15'>
              {/* Title */}
              <motion.h2 className='font-bold text-nodeforge-amber text-lg'>Canvas Attributes</motion.h2>

              {/* Close Btn */}
              <motion.button
                className='group/close w-6 h-6 p-1 cursor-pointer rounded-3xl hover:bg-white/10'
                type='button'
                onClick={() => setOpen(false)}
              >
                <svg
                  className='stroke-nodeforge-amber group-hover/close:stroke-white'
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                >
                  <g id="Menu / Close_MD">
                    <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </motion.button>
            </div>

            <motion.div
              className='font-semibold bg-nodeforge-box-bg py-2 px-5'
              variants={listVariants}
              initial='closed'
              animate='open'
            >
              <motion.div
                className='flex justify-between items-center mb-1'
                variants={listItemVariants}
              >
                <p>Mouse Coordinates: </p>
                <CodeText>
                  {'{'}x: <span className='text-nodeforge-code-blue'>{mousePos.x}</span>, y: <span className='text-nodeforge-code-blue'>{mousePos.y}</span>{'}'}
                </CodeText>
              </motion.div>
              <motion.div
                className='flex justify-between items-center mb-1'
                variants={listItemVariants}
              >
                <p>Dimensions: </p>
                <CodeText>
                  {'{'}w: <span className='text-nodeforge-code-blue'>{dimensions.width.toFixed(0)}</span>, h: <span className='text-nodeforge-code-blue'>{dimensions.height.toFixed(0)}</span>{'}'}
                </CodeText>
              </motion.div>
              <motion.div
                className='flex justify-between items-center mb-1'
                variants={listItemVariants}
              >
                <p>Origin: </p>
                <CodeText>
                  {'{'}x: <span className='text-nodeforge-code-blue'>{origin[0].toFixed(2)}</span>, y: <span className='text-nodeforge-code-blue'>{origin[1].toFixed(2)}</span>{'}'}
                </CodeText>
              </motion.div>
              <motion.div
                className='flex justify-between items-center mb-1'
                variants={listItemVariants}
              >
                <p>Scale: </p>
                <CodeText>
                  <span className='text-nodeforge-code-blue'>{matrix[0].toFixed(3)}</span>
                </CodeText>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
      <Tooltip id='canvas-infotip' content='Canvas Attributes' place='left' hidden={open ? true : false} />
    </>
  )
}

const CodeText = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <p className={`${jetbrains.className} text-sm`}>
      {children}
    </p>
  )
}

export default CanvasInfoTip