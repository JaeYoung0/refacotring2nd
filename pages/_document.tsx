import Document, { DocumentContext, Html, Head, NextScript, Main } from 'next/document'
import { ReactElement } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class StyledDocument extends Document<{ styleTags: ReactElement }> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    )
  }
}
