import Head from "next/head";
import Script from "next/script";

interface IOnboardLayoutProps {
  children: React.ReactNode;
}
export default function OnBoardLayout({ children }: IOnboardLayoutProps) {
  return (
    <>
      <Head>
        <title>IBUILD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="onboard-wrapper">{children}</div>
      {/* <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      /> */}
    </>
  );
}
