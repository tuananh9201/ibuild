import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import useSWR from "swr";

import AvatarInfo from "./AvatarInfo";
import useUser from "@/lib/hooks/user";
import AddressInfo from "./AddressInfo";
import { IbuildButton } from "../common";
import { validateOnlyNumber } from "@/lib/utils";
import { User } from "@/lib/types";
import { getUser, updateUser } from "@/lib/api/user";
import { ERRORS } from "@/constants/msg";
import FormInputOtp from "./FormInputOtp";
import ChangeSuccess from "./ChangeSuccess";

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

  // state
  const [districtAndCity, setDistrictAndCity] = useState({
    cityId: "",
    districtId: "",
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [maxLength, setMaxLength] = useState(10);
  const [isOpenOtpModal, setIsOpenOtpModal] = useState(false);
  const [content, setContent] = useState("");
  const [payload, setPayload] = useState<User>({
    id: 0,
    full_name: "",
    email: "",
  });
  const [errors, setErrors] = useState("");
  const [changeSuccess, setChangeSuccess] = useState(false);

  const { data: user } = useSWR("ss", getUser, {
    onSuccess: function (data) {
      setDistrictAndCity((prev) => ({
        ...prev,
        cityId: data?.city_id || "",
        districtId: data?.district_id || "",
      }));
    },
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onFinish = async (values: any) => {
    const userInfo: User = {
      id: 0,
      full_name: values?.full_name,
      phone_number: values?.phone_number,
      email: values?.email,
      address: values?.address,
      city_id: districtAndCity.cityId,
      district_id: districtAndCity.districtId,
      picture: image || "",
    };

    setPayload((prev) => ({
      ...prev,
      ...userInfo,
    }));

    const res: any = await updateUser(userInfo);
    if (res?.response?.data?.status_code === 400) {
      setIsOpenOtpModal(true);
      res?.response?.data?.otp_type === "phone"
        ? setContent(`số điện thoại ${values?.phone_number}`)
        : setContent(`email ${values?.email}`);
      if (res?.response?.data?.message) {
        setErrors(res?.response?.data?.message);
      }
    }
  };

  const updateUserInfo = async (otp: string) => {
    const userInfo: User = {
      ...payload,
      otp_code: otp,
    };
    const res: any = await updateUser(userInfo);
    console.log(res);
    if (res?.response?.data?.status_code === 400) {
      setErrors(res?.response?.data?.message);
    }
    if (res?.data?.status_code === 200) {
      setIsOpenOtpModal(false);
      setChangeSuccess(true);
    }
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

  const handleFieldChange = () => {
    const values = form.getFieldsValue();

    if (((values?.phone_number as string) || "").startsWith("84")) {
      setMaxLength(12);
    } else {
      setMaxLength(10);
    }

    const hasValue = Object.values(values).some(
      (value) => value !== undefined && value !== ""
    );
    setIsSubmitDisabled(!hasValue);
  };

  const handleCloseModal = () => {
    setIsOpenOtpModal(false);
    setErrors("");
  };

  useEffect(() => {
    if (!changeSuccess) return;

    const t = setTimeout(() => {
      setChangeSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(t);
    };
  }, [changeSuccess]);

  return (
    <div>
      <AvatarInfo url={image} onChange={setImage} />
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
            <Input
              size="large"
              placeholder=""
              maxLength={30}
              onChange={handleFieldChange}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[
              () => ({
                validator(rule, value) {
                  if (value) {
                    console.log(validateOnlyNumber(value));
                    if (!validateOnlyNumber(value)) {
                      return Promise.reject(ERRORS.MSG011);
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              size="large"
              placeholder=""
              maxLength={maxLength}
              onChange={handleFieldChange}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email không đúng định dạng",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Nhập email"
              onChange={handleFieldChange}
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                pattern: /^[a-zA-Z0-9\s\/\p{L}]+$/u,
                message: "Chưa kí tự không phù hợp",
              },
              {
                max: 100,
                message: "Không được quá 100 kí tự",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Nhập địa chỉ"
              maxLength={100}
              onChange={handleFieldChange}
            />
          </Form.Item>
          <AddressInfo
            cityId={districtAndCity.cityId}
            districtId={districtAndCity.districtId}
            onSelectCity={handleSelectCity}
            onSelectDistrict={handleSelectDistrict}
          />
          <Form.Item shouldUpdate>
            {() => (
              <div className="w-[170px] mr-0 ml-auto mt-6">
                <IbuildButton
                  prefix={<span>Lưu thay đổi</span>}
                  type="submit"
                  disabled={isSubmitDisabled || isLoading}
                  isLoading={isLoading}
                />
              </div>
            )}
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
            <div></div>
          </Form.Item>
        </Form>
      </div>
      <FormInputOtp
        isOpen={isOpenOtpModal}
        content={content}
        error={errors}
        onClose={handleCloseModal}
        onSend={updateUserInfo}
      />

      {changeSuccess && <ChangeSuccess title="Thay đổi thành công" />}
    </div>
  );
};

export default AccountInfo;
