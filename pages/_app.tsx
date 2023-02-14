import { useEffect } from "react";
import { NextPage } from "next";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import { Analytics } from "@vercel/analytics/react";
import { colorPrimary } from "@/constants/colors";
import { getAnalytics } from "firebase/analytics";
import app from "utils/firebase";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
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
    <SWRConfig
      value={{
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            // or show a notification UI.
            console.log("SHIT");
          }
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorPrimary,
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
      <Analytics />
    </SWRConfig>
  );
}
