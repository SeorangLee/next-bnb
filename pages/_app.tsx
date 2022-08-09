import { AppProps } from "../node_modules/next/app";
import GlobalStyle from "../styles/GlobalStyle";

const app = ({ Component, pageProps } : AppProps ) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal"/>
    </>
  )
};

export default app;