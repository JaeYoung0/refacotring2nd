import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <div id="root">
      <Component {...pageProps} />
    </div>
  )
}

export default App
