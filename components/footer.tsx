import Image from 'next/image'
import {logo, addressIcon, phoneIcon, sendIcon} from '@/constants/images'

export default function Footer(){
    return (
        <div className="main-footer">
          <div className="row row-footer">
            <div className="col-lg-4 col-md-12">
              <div className="info">
                <div className="logo-space">
                  <a href="#" className="logo">
                    <Image src={logo} alt="IBUILD" />
                  </a>
                  <span className="desc">
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the.
                  </span>
                </div>
              </div>
              <div className="addresses">
                <div className="address-icon">
                  <Image src={addressIcon} alt="" />
                </div>
                <div className="address-info">
                  <div className="desc">
                    Trụ sở Hà Nội: Tầng 25, Tòa tháp B, 173 Xuân Thủy, Cầu Giấy,
                    Hà Nội, Việt Nam.
                  </div>
                  <div className="desc">
                    Trụ sở HCM: Tầng 3, Số 293 Điện Biên Phủ, Phường 15, Quận
                    Bình Thạnh, TP.HCM
                  </div>
                </div>
              </div>
              <div className="addresses">
                <div className="address-icon">
                  <Image src={addressIcon} alt="" />
                </div>
                <div className="address-info">
                  <div className="desc">Trụ sở Hà Nội: (84-4) 3.768.9696</div>
                  <div className="desc">Trụ sở HCM: (84-8) 5.404.2168</div>
                </div>
              </div>
              <div className="addresses">
                <div className="address-icon">
                  <Image src={phoneIcon} alt="" />
                </div>
                <div className="address-info">
                  <div className="desc">Fax: (84-8) 5.404.2188</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="footer-menu">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Sản phẩm
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Văn bản pháp lý
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Thông tin xây dựng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Đăng ký / Đăng nhập
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="footer-form">
                <form action="">
                  <label htmlFor="footer-search-input" className="form-label">
                    Theo dõi
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="info@gmail.com"
                      aria-describedby="footer-search-input"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="footer-search-input"
                    >
                      <Image src={sendIcon} alt="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="text">
              Bản quyền thuộc về VDI - Giấy phép số: 134/CP-CBC - Cục báo chí,
              Bộ Thông tin và Truyền thông.
            </div>
          </div>
        </div>
    )
}