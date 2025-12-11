'use client';

import { Circle, Rect, Svg, SVG } from '@svgdotjs/svg.js';
import { mat3, vec2 } from 'gl-matrix';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type Point = {
  x: number,
  y: number
}

const ORIGIN = Object.freeze({ x: 0, y: 0 });

const Canvas = ({
  height,
  width
}: {
  height: string;
  width: string;
}) => {
  const canvasRef = useRef<SVGSVGElement | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const [mousePos, setMousePos] = useState<Point>(ORIGIN);
  const [transformMatrix, setTransformMatrix] = useState<mat3>(mat3.create());

  // Origin in viewport pixel coordinates.
  const [canvasOrigin, setCanvasOrigin] = useState<vec2>(vec2.fromValues(ORIGIN.x, ORIGIN.y));
  const [canvasTopLeft, setCanvasTopLeft] = useState<vec2>(vec2.fromValues(ORIGIN.x, ORIGIN.y));
  const [canvasDimensions, setCanvasDimensions] = useState({
    height: 0,
    width: 0
  });

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

  /**
   * Sets the viewport coordinate of the top-left corner of the canvas.
   */
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvasBoundingRect = canvasRef.current.getBoundingClientRect();
    setCanvasOrigin(vec2.fromValues(canvasBoundingRect.x, canvasBoundingRect.y));

    setCanvasDimensions({
      height: canvasBoundingRect.height,
      width: canvasBoundingRect.width
    });
  }, []);

  /**
   * Draws the shapes.
   */
  useEffect(() => {
    const rect1 = new Rect().attr({
      x: '200',
      y: '200',
      width: '100',
      height: '100',
      fill: '#3700ff',
    })
    const rect2 = new Rect().attr({
      x: '400',
      y: '400',
      width: '100',
      height: '100',
      fill: '#3700ff',
    })
    const circ = new Circle().attr({
      cx: '0',
      cy: '0',
      r: '20',
      fill: '#f06',
    });

    rect1.addTo('#visualiser-canvas');
    rect2.addTo('#visualiser-canvas');
    circ.addTo('#visualiser-canvas');
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

    setCanvasTopLeft(vec2.fromValues(transformMatrix[6], transformMatrix[7]));
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

      setCanvasTopLeft(vec2.fromValues(newMatrix[6], newMatrix[7]));

      return newMatrix;
    });
  }, [canvasOrigin]);

  return (
    <div className='relative h-full w-full'>
      <svg
        className='active:cursor-grabbing'
        id='visualiser-canvas'
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleZoom}
        width={width}
        height={height}
        viewBox={`${transformMatrix[6]} ${transformMatrix[7]} ${canvasDimensions.width / transformMatrix[0]} ${canvasDimensions.height / transformMatrix[4]}`}
      >
      </svg>
      <div className='absolute top-0 right-0'>
        <p>Mouse Pos: {mousePos.x} {mousePos.y}</p>
        <p>Canvas Origin: {canvasOrigin[0]} {canvasOrigin[1]}</p>
        <p>Scale: {transformMatrix[0]}</p>
      </div>
    </div>
  )
}

export default Canvas;