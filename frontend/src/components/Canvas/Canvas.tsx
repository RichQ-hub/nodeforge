'use client';

import { mat3, vec2 } from 'gl-matrix';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import CanvasInfoTip from './CanvasInfoTip';
import VisualiserContext from '@/context/VisualiserContext';
import { barlow } from '@/lib/fonts';
import { motion } from 'framer-motion';
import TimelineControls from '../TimelineControls';

const ORIGIN = Object.freeze({ x: 0, y: 0 });

const Canvas = () => {
  const { controller } = useContext(VisualiserContext);
  const canvasRef = useRef<SVGSVGElement | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const [transformMatrix, setTransformMatrix] = useState<mat3>(mat3.create());

  // Origin in viewport pixel coordinates.
  const [canvasOrigin, setCanvasOrigin] = useState<vec2>(vec2.fromValues(ORIGIN.x, ORIGIN.y));
  const [canvasDimensions, setCanvasDimensions] = useState({
    height: 0,
    width: 0
  });

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCanvasDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });

        const canvasBoundingRect = entry.target.getBoundingClientRect();
        setCanvasOrigin(vec2.fromValues(canvasBoundingRect.left, canvasBoundingRect.top));
      }
    });

    observer.observe(canvasRef.current);

    return () => {
      observer.disconnect();
    }
  }, []);

  /**
   * Clears the canvas.
   */
  useEffect(() => {
    controller.clearVisualiserCanvas();
  }, []);

  // ==============================================================================
  // PAN BEHAVIOUR.
  // ==============================================================================

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isMouseDown.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !canvasRef.current) {
      return;
    }

    setTransformMatrix((prevMatrix) => {
      const newMatrix = mat3.clone(prevMatrix);

      newMatrix[6] += -e.movementX / prevMatrix[0];
      newMatrix[7] += -e.movementY / prevMatrix[4];

      return newMatrix;
    });
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  // ==============================================================================
  // SCALE BEHAVIOUR.
  // ==============================================================================
  
  /**
   * Scales the canvas around the mouse cursor.
   * 
   * When reading, consider 2 spaces:
   * 1) Viewport space - The pixel coordinate system of the entire screen (the viewport).
   * 2) Canvas internal coordinate system - The infinite coordinate system in the canvas. 
   */
  const handleZoom = useCallback((e: React.WheelEvent) => {
    // Determines how fast to zoom.
    const zoomIntensity = 0.001;

    // The amount to scale by, accumulated on top of the current scale. (E.g.
    // Given currentScale = 2 and scaleFactor = 1.1, then newScale = 2 * 1.1
    // = 2.2.). Note that e.deltaY is negative when zooming up, which 
    // correlates to zooming in.
    const scaleFactor = 1 - e.deltaY * zoomIntensity;

    setTransformMatrix(prevMatrix => {
      // Mouse pixels position in the viewport, relative to the top-left point
      // of the canvas in the viewport space.
      const mouseScreenPos = vec2.subtract(
        vec2.create(),
        vec2.fromValues(e.clientX, e.clientY),
        canvasOrigin
      );

      /**
       * The correction vector at which we translate the top-left corner point
       * (in terms of the internal coordinate system) of the canvas after scaling
       * around the mouse cursor. We do this to make sure the mouse remains on top
       * of the same internal coordinate system before and after scaling. This is
       * because when we scale by 2 at a point like (5,5), it will shift to (10,10)
       * in terms of the viewport space, but in reality that point (10,10) is still
       * point (5,5) in the internal coordinate system. So we have to translate the
       * top-left corner and subsequently the whole canvas viewport such that that
       * point (10,10) comes back under the mouse.
       */
      const viewportTopLeftChange = vec2.fromValues(
        (mouseScreenPos[0] / prevMatrix[0]) * (1 - 1 / scaleFactor),
        (mouseScreenPos[1] / prevMatrix[4]) * (1 - 1 / scaleFactor),
      );

      /**
       * Calculation Explained: 
       *    x = (mouseScreenPos[0] / prevMatrix[0]) * (1 - 1 / scaleFactor)
       * 
       * For {mouseScreenPos[0] / prevMatrix[0]}, we simply divide the viewport x-value
       * (which is in pixels) by the current scale factor which gets us the vector
       * between the mouse and the top-left corner of the canvas, relative to the internal
       * coordinate system.
       *    - Note that the top-left INTERNAL coordinate doesn't matter when calculating
       *      the vector.
       * 
       * For {1 - 1 / scaleFactor}, this is the amount at which the mouse point moves
       * AFTER the new scale is applied. (E.g. we scale by 4 around point (100,100) in
       * a viewbox of (200,200), which is the exact centre. This gives us
       * viewportTopLeftChange = (75,75). After applying the scale, we get viewbox
       * dimensions of (50,50). Then we shift the top-left by (75,75) which 
       * makes it so the viewbox corner coordinates become 75-125 in both the x and y
       * directions. Hence, the original mouse point of (100,100) is now at the centre
       * of the viewbox and subsequently still under the mouse.
       */

      const newMatrix = mat3.clone(prevMatrix);

      // ---------------------------------------------------------------
      // Transformations
      // ---------------------------------------------------------------

      /**
       * Scaling happens around the top left corner, since to scale, we simply
       * increase/decrease the dimensions of the viewbox. Everything scales
       * down and right from the top-left corner. Therefore, the top-left
       * coordinate in terms of the canvas coordinate system remains stationary.
       */

      const scaleVec = vec2.fromValues(scaleFactor, scaleFactor);
      mat3.scale(newMatrix, newMatrix, scaleVec);
      
      newMatrix[6] += viewportTopLeftChange[0];
      newMatrix[7] += viewportTopLeftChange[1];

      return newMatrix;
    });
  }, [canvasOrigin]);

  return (
    <div className='w-full h-full flex flex-col'>
      {/* IMPORTANT: Overflow hidden is essential so as to not push the TimelineControls component out of the window. */}
      <div className='relative flex-1 overflow-hidden'>
        <svg
          className='bg-nodeforge-canvas w-full h-full'
          id='visualiser-canvas'
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleZoom}
          viewBox={`${transformMatrix[6]} ${transformMatrix[7]} ${canvasDimensions.width / transformMatrix[0]} ${canvasDimensions.height / transformMatrix[4]}`}
        >
        </svg>
        
        <CanvasInfoTip
          dimensions={canvasDimensions}
          origin={canvasOrigin}
          matrix={transformMatrix}
        />

        <motion.button
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          className={`
            ${barlow.className} group font-semibold text-lg flex items-center px-3 py-1 bg-red-500 absolute bottom-4 right-4
            rounded-xl cursor-pointer hover:text-white hover:border hover:border-red-700`
          }
          type='button'
          onClick={() => controller.clearVisualiserCanvas()}
        >
          Clear
          <svg className='fill-black w-6 h-6 group-hover:fill-white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15.0722 3.9967L20.7508 9.83395L17.0544 13.5304L13.0758 17.5H21.0041V19H7.93503L4.00195 15.0669L15.0722 3.9967ZM10.952 17.5L15.4628 12.9994L11.8268 9.3634L6.12327 15.0669L8.55635 17.5H10.952Z"></path> </g></svg>
        </motion.button>
      </div>
      <TimelineControls />
    </div>
  )
}

export default Canvas;