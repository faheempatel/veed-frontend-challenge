'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // TODO: Nicer error page
  return (
    <div className="max-w-[800px] mx-auto p-[16px]">
      <h2>Something went wrong!</h2>
      <button
        className="border-2 rounded border-[#fff] px-[32px] mt-[16px]"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
