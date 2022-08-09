import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "../node_modules/next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext){
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try{
      ctx.renderPage({
        enhanceApp :(App) => (props) =>
        sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles:(
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }


  }

  render() {
    return (
      <Html>
        <Head>
          <link 
            href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&
            display=swap"
            rel = "stylesheet"
          />
          <link 
            href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&
            display=swap&subset=korean"
            rel = "stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

