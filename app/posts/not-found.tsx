import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <Alert className="my-8">
        <AlertTriangle />
        <AlertTitle>Not found</AlertTitle>
        <AlertDescription>Post not found.</AlertDescription>
        <Link href="/" className={buttonVariants({ variant: 'link' })}>
          Home
        </Link>
      </Alert>
    </div>
  );
}
