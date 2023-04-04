import { colorPrimary } from "@/constants/colors";
import { Analytics } from "@vercel/analytics/react";
import { ConfigProvider } from "antd";
import { getAnalytics } from "firebase/analytics";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import app from "src/utils/firebase";
import { SWRConfig } from "swr";
import { store } from "../store/store";

import 'react-multi-carousel/lib/styles.css';
import "../styles/global.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const analytics = getAnalytics(app);
    // if (process.env.NODE_ENV === "production") {
    //   analytics;
    // }
    if (typeof window != undefined) {
      const analytics = getAnalytics(app);
      analytics;
    }
  }, []);
  return getLayout(
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimary,
        },
      }}
    >
      <Provider store={store}>
        <SWRConfig
          value={{
            onError: (error, key) => {
              if (error.status !== 403 && error.status !== 404) {
                // We can send the error to Sentry,
                // or show a notification UI.
              }
            },
          }}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} key={router.asPath} />
          <Analytics />
        </SWRConfig>
      </Provider>
      {/* <Analytics /> */}
    </ConfigProvider>
  );
}
