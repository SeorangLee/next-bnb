import { AppProps } from "../node_modules/next/app";
import axios from "../lib/api/index";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store/index"

const app = ({ Component, pageProps } : AppProps ) => {
  return (
    <>
      <GlobalStyle />
      {/* <Header /> */}
      <Component {...pageProps} />
      <div id="root-modal"/>
    </>
  )
};

export default wrapper.withRedux(app);