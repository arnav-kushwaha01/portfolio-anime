export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="font-bebas text-2xl text-white tracking-widest animate-pulse">
        LOADING...
      </div>
    </div>
  )
}
