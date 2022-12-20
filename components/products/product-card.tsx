import {
  Supp2,
  Supp3,
  Supp4,
  Supplier1,
  addressIcon,
  btnBookmarkIcon,
  btnPhoneIcon,
  showerIcon,
  toiletIcon,
} from "@/constants/images";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="product-card_container">
        <div className="product-card_container_body">
          <div className="card-top">
            <div className="location">
              <div className="location-icon">
                <Image src={addressIcon} alt="" />
              </div>
              <span className="location">Bắc Từ Liêm, Hà Nội</span>
            </div>
            <div className="supplier-info">
              <div className="supplier-image">
                <Image src={Supplier1} alt="" />
              </div>
              <span className="supplier-title">Đại lý Viglacera Việt Nam</span>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-category-title">Thiết bị vệ sinh</h3>
            <div className="product-category-icons">
              <div className="product-category-icon-item">
                <Image src={toiletIcon} alt="" />
              </div>
              <div className="product-category-icon-item">
                <Image src={showerIcon} alt="" />
              </div>
              <div className="product-category-icon-item">
                <Image src={toiletIcon} alt="" />
              </div>
              <div className="product-category-icon-item">
                <Image src={showerIcon} alt="" />
              </div>
              <div className="product-category-icon-item">
                <Image src={toiletIcon} alt="" />
              </div>
            </div>
          </div>
          <span className="price-range">20.000.000 - 50.000.000 đ</span>
          <div className="product-card-body-bottom">
            <div className="row-populate">
              <span className="text">Hãng phổ biến</span>
              <div className="extras">
                <div className="item">
                  <Image src={Supp2} alt="" />
                </div>
                <div className="item">
                  <Image src={Supp3} alt="" />
                </div>
                <div className="item">
                  <Image src={Supp4} alt="" />
                </div>
              </div>
            </div>
            <div className="row-populate">
              <span className="text">SL sản phẩm</span>
              <div className="extras">300 - 1000</div>
            </div>
            <div className="row-populate">
              <span className="text">Khoảng cách</span>
              <div className="extras">3km</div>
            </div>
          </div>
        </div>
        <div className="product-card_container_actions">
          <button className="btn-in-card view-detail">Xem chi tiết</button>
          <button className="btn-in-card outline">
            <Image src={btnPhoneIcon} alt="" />
          </button>
          <button className="btn-in-card outline">
            <Image src={btnBookmarkIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
