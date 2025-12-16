'use client';

import { useState } from "react";
import CanvasSidebar from "../VisualiserInterface/CanvasSidebar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Canvas from "../Canvas";
import CanvasInterface from "../VisualiserInterface/CanvasInterface";
import OperationsTab from "../VisualiserInterface/OperationsTab";

import operationsIcon from '@/assets/operation.svg';
import descriptionIcon from '@/assets/description.svg';
import DescriptionTab from "../VisualiserInterface/DescriptionTab";

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
]

const Visualiser2 = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className='h-full flex'>
      <CanvasSidebar
        interfaceTabs={INTERFACE_TABS}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <PanelGroup direction='horizontal'>
        {openSidebar && (
          <>
            <CanvasInterface>
              {INTERFACE_TABS[selectedTab].node}
            </CanvasInterface>
            <PanelResizeHandle className='w-1 bg-nodeforge-panel/40 active:bg-red-500' />
          </>
        )}
        <Panel
          order={2}
          defaultSize={100}
        >
          <Canvas />
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default Visualiser2;