import Visualiser from "@/components/Visualiser";

export default function VisualiserPage() {
  return (
    <main className='h-[calc(100vh-56px)]'>
      <Visualiser />
      {/* <Visualiser /> */}
    </main>
  );
}

{/* <main className='h-[calc(100vh-56px)] grid grid-cols-[minmax(300px,400px)_minmax(400px,1fr)] grid-rows-[100%]'>
  <CanvasSidebar />
  <Canvas />
</main> */}
