import { NextPage } from "next";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { ConfigProvider } from "antd";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
