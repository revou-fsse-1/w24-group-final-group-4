import '@/styles/globals.css';
import 'nprogress/nprogress.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { useEffect } from 'react';

export const progress = NProgress.configure({
  showSpinner: false,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  useEffect(() => {
    const handleStart = (_: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        progress.start();
      }
    };
    const handleStop = () => {
      progress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
