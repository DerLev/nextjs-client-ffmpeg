import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { RouterTransition } from '@/components/RouterTransition'
import AppShellComponent from '@/components/AppShell'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>ffmpeg Client Converter</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
        <RouterTransition />
        <AppShellComponent>
          <Component {...pageProps} />
        </AppShellComponent>
      </MantineProvider>
    </>
  )
}
