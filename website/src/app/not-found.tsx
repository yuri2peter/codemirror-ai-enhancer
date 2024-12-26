'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <h1 className="text-3xl mb-8">404 | Page Not Found</h1>
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
              onClick={() => router.back()}
            >
              go back
            </Button>
            to the previous page.
          </p>
        </div>
      </div>
    </div>
  );
}
