import React from "react";
import { Form, Input } from "antd";

import { FilterRelated } from "../common";
import { RELATED_LIST } from "@/constants/data";
import AvatarInfo from "./AvatarInfo";

type ButtonProps = {
  children: React.ReactElement;
  className?: string;
};

const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

const AccountInfo = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <AvatarInfo />
      <div className="account-info mt-9">
        <Form
          layout="horizontal"
          form={form}
          scrollToFirstError
          requiredMark={false}
          className="max-w-[620px]"
        >
          <Form.Item label="Họ và tên" name="name">
            <Input size="large" placeholder="" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input size="large" placeholder="" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input size="large" placeholder="Nhập email" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input size="large" placeholder="Nhập địa chỉ" />
          </Form.Item>
          <div className="w-full flex flex-row gap-3 pl-[120px]">
            <div className="w-1/2">
              <FilterRelated
                defaultValue={0}
                options={RELATED_LIST}
                placeHolder="Quận/Huyện"
                onSelect={() => {}}
              />
            </div>
            <div className="flex-base">
              <FilterRelated
                defaultValue={0}
                options={RELATED_LIST}
                placeHolder="Tỉnh/Thành phố"
                onSelect={() => {}}
              />
            </div>
          </div>
          <Form.Item>
            <Button>
              <>Lưu thay đổi</>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccountInfo;
