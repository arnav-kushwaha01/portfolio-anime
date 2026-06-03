'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white p-10 font-mono">
      <h2 className="text-2xl text-red-500 mb-4">Something went wrong!</h2>
      <div className="bg-red-900/20 border border-red-500 p-4 rounded-md mb-4 max-w-2xl overflow-auto text-left whitespace-pre-wrap">
        <p className="font-bold">{error.name}: {error.message}</p>
        <p className="text-sm mt-2 opacity-80">{error.stack}</p>
      </div>
      <button
        className="px-4 py-2 bg-white text-black font-bold"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
