import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";

import AvatarInfo from "./AvatarInfo";
import useUser from "@/lib/hooks/user";
import AddressInfo from "./AddressInfo";

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

  const { user } = useUser();

  // state
  const [districtAndCity, setDistrictAndCity] = useState({
    cityId: "",
    districtId: "",
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onFinish = (values: any) => {
    console.log(values);
    console.log(districtAndCity);
  };

  const handleSelectCity = (id: string) => {
    setDistrictAndCity((prev) => ({
      ...prev,
      cityId: id,
    }));
  };

  const handleSelectDistrict = (id: string) => {
    setDistrictAndCity((prev) => ({
      ...prev,
      districtId: id,
    }));
  };

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
          onFinish={onFinish}
        >
          <Form.Item
            label="Họ và tên"
            name="full_name"
            rules={[
              {
                required: true,
                message: "Tên không được để trống",
              },
              {
                pattern: /^[\p{L}\s]+$/u,
                message: "Chỉ nhận các kí tự chữ cái",
              },
              {
                max: 30,
                message: "Tối đa 30 kí tự",
              },
            ]}
          >
            <Input size="large" placeholder="" maxLength={30} />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input size="large" placeholder="" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input size="large" placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                pattern: /^[a-zA-Z0-9\/\s\u00C0-\u017F.,!?]+$/u,
                message: "Chưa kí tự không phù hợp",
              },
              {
                max: 100,
                message: "Không được quá 100 kí tự",
              },
            ]}
          >
            <Input size="large" placeholder="Nhập địa chỉ" />
          </Form.Item>
          <AddressInfo
            cityId={districtAndCity.cityId}
            districtId={districtAndCity.districtId}
            onSelectCity={handleSelectCity}
            onSelectDistrict={handleSelectDistrict}
          />
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
