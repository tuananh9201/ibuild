import { ReactElement } from "react";
import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "../_app";

import Head from "next/head";
import style from "@/styles/modules/product-detail.module.scss";
import suppliers from "../../data/suppliers.json";
import { useRouter } from "next/router";
import {
  Supp4,
  addressIcon,
  btnBookmarkIcon,
  btnPhoneIconTranf,
  shoppingBasket,
} from "@/constants/images";
import Image from "next/image";
import ProductChartPrice from "@/components/products/product-chart-price";
const DetailProduct: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { slug } = query;
  console.log("slug :", slug);
  const product = suppliers.find((s) => s.id === slug);
  const rootCategory = product?.categories.find((c) => c.parentId === "0");
  const childCategory = product?.categories.filter((c) => c.parentId !== "0");
  return (
    <>
      <Head>
        <title>{rootCategory?.name}</title>
      </Head>
      <div className="product-main">
        <section className={style.productDetail}>
          <div className={style.productInfo}>
            <div className={style.productSlider}></div>
            <div className={style.productDetailInfo}>
              <div className={style.productDetailInfoTop}>
                <h1 className={style.productTitle}>Thiết bị vệ sinh cao cấp</h1>
                <div className={style.supplier}>
                  <div className={style.suppLogo}>
                    <Image src={Supp4} alt="Trung Tâm Vlxd Đồng Tâm" />
                  </div>
                  <div className={style.suppName}>Trung Tâm Vlxd Đồng Tâm</div>
                </div>
                <div className={style.price}>10.000.000 - 30.000.000 VND</div>
                <div className={style.infoRow}>
                  <div className={style.icon}>
                    <Image src={shoppingBasket} alt="" />
                  </div>
                  <div className={style.label}>Số lượng</div>
                  <div className={style.number}>300 -1000</div>
                </div>
                <div className={style.infoRow}>
                  <div className={style.icon}>
                    <Image src={addressIcon} alt="" />
                  </div>
                  <div className={style.label}>
                    158 Nguyễn Khánh Toàn, Quan Hoa, Cầu Giấy, Hà Nội
                  </div>
                </div>
                <div className={style.action}>
                  <div>
                    <button
                      onClick={() => {
                        // handleClickProduct(supplier.id);
                      }}
                      className={style.buttonPhone}
                    >
                      <Image src={btnPhoneIconTranf} alt="" />
                      0272 387 2233
                    </button>
                  </div>
                  <div>
                    <button className="btn-in-card outline">
                      <Image src={btnBookmarkIcon} alt="" />
                      Theo dõi sản phẩm
                    </button>
                  </div>
                  <div>
                    <button className="btn-in-card outline">
                      Thông tin nhà cung cấp
                    </button>
                  </div>
                </div>
              </div>
              <div className={style.productDetailInfoBottom}>
                <span>
                  Thiết bị vệ sinh cao cấp là dòng thiết bị cao cấp bao gồm:{" "}
                </span>
                <ul>
                  <li>Bồn cầu vệ sinh</li>
                  <li>Chậu rửa lavabo</li>
                  <li>Bồn Tiểu Nam/Nữ</li>
                  <li>Vòi lavabo cảm ứng</li>
                  <li>Bộ vòi sen tắm</li>
                  <li>Van xả tiểu</li>
                  <li>Vòi rửa chén</li>
                  <li>Bồn tắm</li>
                  <li>Vòi xả lạnh</li>
                  <li>Phụ kiện phòng tắm</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={style.productChartPrice}>
            <ProductChartPrice />
          </div>
        </section>
        <section className="relate-product"></section>
      </div>
    </>
  );
};
DetailProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default DetailProduct;
