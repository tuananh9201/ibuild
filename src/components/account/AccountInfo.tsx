import React, { useState } from "react";
import { Form, Input, Modal } from "antd";

import { FilterRelated } from "../common";
import { RELATED_LIST } from "@/constants/data";
import AvatarInfo from "./AvatarInfo";

type ButtonProps = {
  children: React.ReactElement;
  className?: string;
  onClick: Function;
};

const Button = ({ children, className, onClick }: ButtonProps) => {
  return <button className={className ? className : ""}>{children}</button>;
};

const AccountInfo = () => {
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);

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
            <div className="flex justify-end">
              <Button
                className="text-white bg-primary-color px-9 py-3 rounded mt-6"
                onClick={() => {}}
              >
                <span className="text-base">Lưu thay đổi</span>
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="w-full">
              <Button
                className="w-full bg-[#F8F9FF] border border-solid border-primary-color rounded py-3 pl-4 flex flex-start text-primary-color"
                onClick={() => {}}
              >
                <span>Nâng cấp tài khoản</span>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccountInfo;
