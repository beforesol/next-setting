import { AppProps } from 'next/app'
import '/public/assets/css/common.css';
import { wrapper } from '../../config/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(App);
