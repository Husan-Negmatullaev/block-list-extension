import type { AppProps } from 'next/app'
import {AppProviders} from "./app-providers";

export function App({ Component, pageProps }: AppProps) {
  return <AppProviders><Component {...pageProps} /></AppProviders>
}
