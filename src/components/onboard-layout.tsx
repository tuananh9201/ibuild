import Head from "next/head";

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
    </>
  );
}
