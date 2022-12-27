import {
  Supp2,
  addressIcon,
  btnBookmarkIcon,
  btnPhoneIconBlack,
  btnPhoneIconPri,
  btnPhoneIconTranf,
  toiletIcon,
} from "@/constants/images";
import Image from "next/image";
import { Tooltip } from "antd";
import { useState } from "react";
import { ISupplier } from "types";
import { useRouter } from "next/router";
import Link from "next/link";
interface ICard {
  supplier: ISupplier;
}
const ProductCard = (props: ICard) => {
  const { supplier } = props;
  const router = useRouter();
  const [phoneIcon, setPhoneIcon] = useState(btnPhoneIconPri);
  const rootCategory = supplier.categories.find((c) => c.parentId === "0");
  const childCategory = supplier.categories.filter((c) => c.parentId !== "0");
  const handleClickProduct = (slug: string) => {
    router.push(`/san-pham/${slug}`);
  };
  return (
    <div className="product-card">
      <div className="product-card_container">
        <div className="product-card_container_body">
          <div className="card-top">
            <div className="location">
              <div className="location-icon">
                <Image src={addressIcon} alt="" />
              </div>
              <span className="location">{supplier.address}</span>
            </div>
            <div className="supplier-info">
              <div className="supplier-image">
                <Link href="/dai-ly">
                  <Image
                    width={40}
                    height={40}
                    src={rootCategory?.logo || Supp2}
                    alt=""
                  />
                </Link>
              </div>
              <span className="supplier-title">{supplier.name}</span>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-category-title">{rootCategory?.name}</h3>
            <div className="product-category-icons">
              {childCategory.map((c) => {
                return (
                  <div key={c.id} className="product-category-icon-item">
                    <Image
                      height={36}
                      width={36}
                      src={c.logo || toiletIcon}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <span className="price-range">{supplier.priceRange}</span>
          <div className="product-card-body-bottom">
            <div className="row-populate">
              <span className="text">Hãng phổ biến</span>
              <div className="extras">
                {supplier.brandsPopulate.map((brand) => (
                  <div key={brand.id} className="item">
                    <Image height={24} width={24} src={brand.logo} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="row-populate">
              <span className="text">SL sản phẩm</span>
              <div className="extras">
                {supplier.productQuantity.min} - {supplier.productQuantity.max}
              </div>
            </div>
            <div className="row-populate">
              <span className="text">Khoảng cách</span>
              <div className="extras">{supplier.space}</div>
            </div>
          </div>
        </div>
        <div className="product-card_container_actions">
          <button
            onClick={() => {
              handleClickProduct(supplier.id);
            }}
            className="btn-in-card view-detail"
          >
            Xem chi tiết
          </button>

          <Tooltip
            title={
              <div className="tooltip-container">
                <Image src={btnPhoneIconBlack} alt="" />
                <span>{supplier.phoneNumber}</span>
              </div>
            }
            color="white"
          >
            <button
              onMouseEnter={() => {
                setPhoneIcon(btnPhoneIconTranf);
              }}
              onMouseLeave={() => {
                setPhoneIcon(btnPhoneIconPri);
              }}
              className="btn-in-card outline"
            >
              <Image src={phoneIcon} alt="" />
            </button>
          </Tooltip>
          <button className="btn-in-card outline">
            <Image src={btnBookmarkIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="matched-label">
        <span className="matched-number">93%</span>
      </div>
    </div>
  );
};

export default ProductCard;
