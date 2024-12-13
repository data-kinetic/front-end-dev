import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
    );
}

export default MyApp;