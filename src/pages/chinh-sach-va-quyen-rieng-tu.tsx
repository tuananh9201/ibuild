import { ReactElement } from "react";
import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
const PrivacyPolicyPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Chính xác và quyền riêng tư | IBUILD</title>
        <meta
          name="description"
          content="Chính xác và quyền riêng tư | IBUILD"
        />
      </Head>
      <div className="main-content">
        <h1>Chính sách và quyền riêng tư </h1>
        <div
          style={{
            marginTop: 80,
          }}
        >
          <div
            style={{
              margin: "24px 0",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "150%",
            }}
          >
            Chào mừng bạn đến với trang web của chúng tôi. Chúng tôi cam kết bảo
            vệ quyền riêng tư của bạn và đảm bảo rằng thông tin cá nhân của bạn
            được bảo vệ tốt nhất có thể. Bằng cách sử dụng trang web của chúng
            tôi, bạn đồng ý với việc thu thập và sử dụng thông tin của bạn theo
            chính sách bảo mật này.
          </div>

          <h3>Thu thập thông tin cá nhân</h3>
          <div
            style={{
              margin: "24px 0",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "150%",
            }}
          >
            Khi bạn đăng nhập vào trang web của chúng tôi bằng tài khoản Google
            hoặc Facebook, chúng tôi thu thập thông tin cá nhân của bạn như tên,
            địa chỉ email và hình ảnh đại diện. Chúng tôi sử dụng thông tin này
            để đảm bảo rằng bạn có thể sử dụng các tính năng của trang web của
            chúng tôi một cách thuận tiện nhất.
          </div>

          <h3>Sử dụng thông tin cá nhân</h3>
          <div
            style={{
              margin: "24px 0",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "150%",
            }}
          >
            Chúng tôi sử dụng thông tin cá nhân của bạn để cung cấp các dịch vụ
            trên trang web của chúng tôi và để liên lạc với bạn về các thông tin
            liên quan đến trang web của chúng tôi. Chúng tôi không chia sẻ thông
            tin cá nhân của bạn với bất kỳ bên thứ ba nào.
          </div>

          <h3>Bảo vệ thông tin cá nhân</h3>
          <div
            style={{
              margin: "24px 0",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "150%",
            }}
          >
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn bằng cách sử dụng
            các biện pháp an ninh phù hợp. Chúng tôi chỉ cho phép các nhân viên
            có nhu cầu truy cập thông tin cá nhân của bạn và đảm bảo rằng các
            nhân viên này đã được đào tạo về bảo mật thông tin.
          </div>

          <h3>Điều chỉnh thông tin cá nhân</h3>
          <div
            style={{
              margin: "24px 0",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "150%",
            }}
          >
            Nếu bạn muốn xem hoặc chỉnh sửa thông tin cá nhân của mình, bạn có
            thể làm điều đó bằng cách truy cập vào tài khoản của mình trên trang
            web của chúng tôi
          </div>
        </div>
      </div>
    </>
  );
};
PrivacyPolicyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};
export default PrivacyPolicyPage;
