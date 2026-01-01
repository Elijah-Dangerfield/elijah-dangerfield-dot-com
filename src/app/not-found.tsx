import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={paths.home.getHref()} className="mt-6">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
