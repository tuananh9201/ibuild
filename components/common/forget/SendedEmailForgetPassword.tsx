import React from "react";
import Image from "next/image";
import { Typography } from "antd";

import { SendEmailSuccess } from "@/constants/images";

const { Paragraph } = Typography;

type Props = {
  email: string;
};

const SendedEmailForgetPassword = ({ email }: Props) => {
  return (
    <Typography>
      <Paragraph>
        Để giữ an toàn cho tài khoản của bạn, iBuild muốn đảm bảo rằng bạn chính
        là người đang cố đăng nhập
      </Paragraph>
      <div
        style={{
          margin: "24px auto",
        }}
      >
        <Image
          style={{
            margin: "0 auto",
          }}
          src={SendEmailSuccess}
          priority={true}
          alt="Gửi email thành công"
        />
      </div>
      <Paragraph>
        iBuild sẽ gửi mã xác minh tới email {email || "abc@gmail.com"}. Hãy kiểm
        tra email của bạn để thực hiện tiếp tục việc thiết lập mật khẩu mới.
      </Paragraph>
    </Typography>
  );
};

export default SendedEmailForgetPassword;
