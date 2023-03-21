import Head from "next/head";

import Footer from "./layouts/footer";

// import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import MainHeader from "./layouts/header";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: IMainLayoutProps) {
  // const unAuthorized = useSelector(
  //   (state: RootState) => state.auth.unAuthorized
  // );

  // const router = useRouter();

  // useEffect(() => {
  //   if (unAuthorized) {
  //     const pathname = router.pathname;
  //     router.push({
  //       pathname: "/dang-nhap",
  //       query: {
  //         redirect: pathname,
  //         ...router.query,
  //       },
  //     });
  //   }
  // }, [unAuthorized, router]);

  return (
    <>
      <Head>
        <title>
          IBUILD | Báo giá xây dựng, danh bạ xây dựng, văn bản xây dựng, tin tức
          xây dựng
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Báo giá xây dựng, danh bạ xây dựng, văn bản xây dựng, tin tức xây dựng"
        />
        <meta
          name="keywords"
          content="xây dựng việt nam, xdvn, vlxd, xây dựng,  thiết bị xây dựng, vật liệu xây dựng, báo giá xây dựng, tin tức xây dựng, văn bản xây dựng,  tiêu chuẩn xây dựng (tcxdvn), định mức xây dựng, giá thiết bị, nhà cung cấp, cửa hàng, tư vấn xây dựng, doanh nghiệp xây dựng, công ty xây dựng, xây lắp, build.vn,, mẫu nhà đẹp, mẫu nội thất, mẫu phòng ngủ, mẫu phòng khách, tp hcm, hà nội, Việt Nam"
        />
        <meta httpEquiv="content-language" content="vi" />
      </Head>
      <Provider store={store}>
        <div className="max-w-[1440px] flex flex-col m-auto p-0 h-auto">
          <MainHeader />
          {children}
          <Footer />
        </div>
      </Provider>
    </>
  );
}
