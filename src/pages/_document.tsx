import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Báo giá xây dựng, danh bạ xây dựng, văn bản xây dựng, tin tức xây dựng"
        />
        <meta
          name="keywords"
          content="xây dựng việt nam, xdvn, vlxd, xây dựng,  thiết bị xây dựng, vật liệu xây dựng, báo giá xây dựng, tin tức xây dựng, văn bản xây dựng,  tiêu chuẩn xây dựng (tcxdvn), định mức xây dựng, giá thiết bị, nhà cung cấp, cửa hàng, tư vấn xây dựng, doanh nghiệp xây dựng, công ty xây dựng, xây lắp, build.vn,, mẫu nhà đẹp, mẫu nội thất, mẫu phòng ngủ, mẫu phòng khách, tp hcm, hà nội, Việt Nam"
        />
        <meta http-equiv="content-language" content="vi" />
      </Head>
      <body className="dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
