'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <h1 className="text-3xl mb-8">Ops! Something went wrong.</h1>
        <div className="flex gap-4">
          <p>
            You can go back to the
            <Button variant={null} className="text-blue-500 underline" asChild>
              <Link href="/">home</Link>
            </Button>
            page or
            <Button
              variant={null}
              className="text-blue-500 underline"
              onClick={() => reset()}
            >
              try again
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
