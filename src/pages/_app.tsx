import '@/styles/reset.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { Session } from '@supabase/auth-helpers-react';
import AllProviders from '@/components/AllProviders'

export default function App({ Component, pageProps }: AppProps<{
  initialSession: Session
}>) {
  return (
    <AllProviders
      initialSupabaseSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </AllProviders>
  )
}
