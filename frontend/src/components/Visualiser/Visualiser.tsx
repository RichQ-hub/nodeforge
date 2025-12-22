'use client';

import React, { useRef, useState } from "react";
import CanvasSidebar from "../VisualiserInterface/CanvasSidebar";
import Canvas from "../Canvas";
import CanvasInterface from "../VisualiserInterface/CanvasInterface";
import OperationsTab from "../VisualiserInterface/OperationsTab";

import operationsIcon from '@/assets/operation.svg';
import descriptionIcon from '@/assets/description.svg';
import DescriptionTab from "../VisualiserInterface/DescriptionTab";
import clsx from "clsx";

const INTERFACE_TABS = [
  {
    name: 'Operations',
    icon: operationsIcon,
    node: <OperationsTab />
  },
  {
    name: 'Description',
    icon: descriptionIcon,
    node: <DescriptionTab />
  },
];

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
const newClamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

const Visualiser = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [sidebarWidth, setSidebarWidth] = useState<number>(400);

  const originalWidth = useRef(sidebarWidth);
  const originalClientX = useRef(sidebarWidth);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  return (
    <div className='h-full flex'>
      <CanvasSidebar
        interfaceTabs={INTERFACE_TABS}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      {/* Main Group */}
      <div className='relative h-full w-full'>
        {/* Expanded Sidebar */}
        <aside
          className={clsx(
            'absolute top-0 bottom-0 left-0 transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300',
            openSidebar ? 'translate-x-0' : '-translate-x-full'
          )}
          style={{ width: sidebarWidth }}
        >
          <CanvasInterface>
            {INTERFACE_TABS[selectedTab].node}
          </CanvasInterface>

          {/* Expanded Sidebar Drag Handler */}
          <div
            className={clsx(
              'absolute w-0.5 z-10 right-0 grow-0 top-0 bottom-0 cursor-col-resize',
              isDragging ? 'bg-nodeforge-amber' : 'bg-slate-400',
            )}
            onMouseDown={(e: React.MouseEvent) => {
              e.preventDefault();
              const { ownerDocument } = e.currentTarget;
              originalWidth.current = sidebarWidth;
              originalClientX.current = e.clientX;
              setIsDragging(true);

              const onPointerMove = (e: MouseEvent) => {
                const newNum = Math.floor(newClamp(originalWidth.current + e.clientX - originalClientX.current, 320, 440));
                setSidebarWidth(newNum)
              }

              const onPointerUp = () => {
                ownerDocument.removeEventListener('pointermove', onPointerMove);
                setIsDragging(false);
              }

              ownerDocument.addEventListener('pointermove', onPointerMove);
              ownerDocument.addEventListener('pointerup', onPointerUp, { once: true });
            }}
          />
        </aside>

        {/* Canvas */}
        <div
          className={clsx(
            'h-full',
            isDragging ? 'transition-none' : 'transition-all ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300'
          )}
          style={{ paddingLeft: openSidebar ? sidebarWidth : 0 }}
        >
          <Canvas />
        </div>
      </div>
    </div>
  )
}

export default Visualiser;