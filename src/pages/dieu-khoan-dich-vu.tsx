import { ReactElement } from "react";
import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
const TermsOfServicePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Điều khoản Dịch vụ | IBUILD</title>
        <meta name="description" content="Điều khoản Dịch vụ | IBUILD" />
      </Head>
      <div className="flex flex-col justify-start px-4 pt-[60px] pb-4">
        <h1>Điều khoản Dịch vụ </h1>
        <div
          style={{
            marginTop: 80,
          }}
          className="mt-20"
        >
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Chào mừng bạn đến với trang web của chúng tôi. Chúng tôi cam kết bảo
            vệ quyền riêng tư của bạn và đảm bảo rằng thông tin cá nhân của bạn
            được bảo vệ tốt nhất có thể. Bằng cách sử dụng trang web của chúng
            tôi, bạn đồng ý với việc thu thập và sử dụng thông tin của bạn theo
            chính sách bảo mật này.
          </div>

          <h3>1. Giới thiệu</h3>
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Chào mừng đến với trang web của chúng tôi. Điều khoản Dịch vụ này mô
            tả các điều kiện và điều khoản mà bạn cần phải tuân thủ khi sử dụng
            trang web của chúng tôi. Bằng cách sử dụng trang web của chúng tôi,
            bạn đồng ý với các điều khoản này.
          </div>

          <h3>2. Sử dụng trang web</h3>
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Chúng tôi sử dụng thông tin cá nhân của bạn để cung cấp các dịch vụ
            trên trang web của chúng tôi và để liên lạc với bạn về các thông tin
            liên quan đến trang web của chúng tôi. Chúng tôi không chia sẻ thông
            tin cá nhân của bạn với bất kỳ bên thứ ba nào.
          </div>

          <h3>Bảo vệ thông tin cá nhân</h3>
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Bạn đồng ý sử dụng trang web của chúng tôi chỉ cho các mục đích hợp
            pháp và tuân thủ tất cả các luật pháp liên quan đến sử dụng trang
            web.
          </div>

          <h3>3. Tài khoản của bạn</h3>
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Nếu bạn đăng ký tài khoản trên trang web của chúng tôi, bạn đồng ý
            cung cấp thông tin chính xác và hoàn chỉnh về bản thân và giữ bảo
            mật tài khoản của bạn. Bạn chịu trách nhiệm cho mọi hoạt động được
            thực hiện dưới tên tài khoản của bạn.
          </div>

          <h3>4. Chính sách bảo mật</h3>
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Chúng tôi đảm bảo rằng thông tin cá nhân của bạn được bảo vệ tốt
            nhất có thể. Vui lòng xem Chính sách bảo mật của chúng tôi để biết
            thêm chi tiết về cách chúng tôi thu thập và bảo vệ thông tin của
            bạn.
          </div>

          <h3>5. Bản quyền</h3>
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Tất cả các nội dung trên trang web của chúng tôi đều được bảo vệ bởi
            bản quyền và không thể sao chép, phân phối hoặc sử dụng một cách
            không hợp lệ mà không được sự cho phép của chúng tôi.
          </div>

          <h3>6. Thay đổi Điều khoản Dịch vụ</h3>
          <div className="mx-0 my-6 text-base font-normal leading-[150%]">
            Chúng tôi có thể thay đổi hoặc cập nhật Điều khoản Dịch vụ này bất
            cứ lúc nào và chúng tôi sẽ thông báo cho bạn về những thay đổi này.
            Bằng cách tiếp tục sử dụng trang web của chú
          </div>
        </div>
      </div>
    </>
  );
};
TermsOfServicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default TermsOfServicePage;
