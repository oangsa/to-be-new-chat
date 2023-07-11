import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import "@/styles/globals.css"

import { Layout } from '@/components/layout/layout';
import { Inter, Kanit } from 'next/font/google'
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={kanit.className}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </main>
    
  );
}

export default MyApp;
