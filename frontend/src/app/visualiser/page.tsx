import Canvas from "@/components/Canvas";
import CanvasSidebar from "@/components/CanvasInterface/CanvasSidebar";

export default function VisualiserPage() {
  return (
    <main className='h-[calc(100vh-56px)] grid grid-cols-[minmax(300px,400px)_minmax(400px,1fr)] grid-rows-[100%]'>
      {/* Left Sidebar */}
      <CanvasSidebar />


      {/* Canvas */}
      <Canvas height='100%' width='100%' />
    </main>
  );
}
