import Head from "next/head";

interface Props {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>IBUILD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="max-w-[1440px] mx-auto my-0 flex h-screen">
        {children}
      </div>
    </>
  );
}
