import { Checkbox, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import { IbuildButton, Modal } from "../common";

import { getBusinessServiceType, getJobs, getPositionJob } from "@/lib/api";
import { updateBecomeExpert } from "@/lib/api/user";
import { User } from "@/lib/types";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import ChangeSuccess from "./ChangeSuccess";
interface BecomeExpertModalProps {
  isOpen: boolean;
  onClose: Function;
}

const BecomeExpertModal = ({ isOpen, onClose }: BecomeExpertModalProps) => {
  const [form] = Form.useForm();

  const { data: jobs } = useSWRImmutable("jobs", getJobs);
  const { data: positions } = useSWRImmutable("positions", getPositionJob);
  const { data: businessServiceType } = useSWRImmutable(
    "businessServiceType",
    getBusinessServiceType
  );

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setIsCheckbox(e.target.checked);
    form.resetFields(["job_id", "position_id", "enterprise_email"]);
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const payload: User = {
      id: 0,
      full_name: "",
      email: "",
      enterprise_name: values?.enterprise_name,
      is_individual_business: values?.is_individual_business || false,
      business_type: values?.business_type,
      job_id: values?.job_id,
      position_id: values?.position_id,
      enterprise_email: values?.enterprise_email,
    };

    const res = await updateBecomeExpert(payload);
    setIsLoading(false);
    if (res?.status_code === 200) {
      onClose(false);
      setChangeSuccess(true);
    }

    if (res?.response?.data?.status_code === 400) {
      setErrors((prev) => ({
        ...prev,
        email: res?.response?.data?.message,
      }));
    }
  };

  const body = (
    <div className="w-full upgrade-account">
      <h3 className="text-text-color font-medium text-2xl text-center mb-2">
        Trở thành chuyên gia
      </h3>
      <p className="text-[#666666] font-normal text-sm text-center mb-6">
        Bạn là kiến trúc sư, nhà thầu hoặc chỉ là người quan tâm tới xây dựng
        hãy trải nghiệm thêm tính năng tìm kiếm chuyên dụng và những thông tin
        hữu ích dành riêng cho chuyên gia.
      </p>
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        scrollToFirstError
        onFinish={onFinish}
      >
        <Form.Item
          className="mb-1"
          name="enterprise_name"
          rules={[
            {
              pattern: /^[\p{L}\d&\s]+$/u,
              message: "Tên doanh nghiệp không được chứa ký tự đặc biệt",
            },
            {
              min: 13,
              message: "Tối thiểu 13 ký tự",
            },
            {
              max: 100,
              message: "Tối đa 100 ký tự",
            },
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
        >
          <div>
            <span className="text-text-color text-base font-medium block mb-2">
              Doanh nghiệp <span className="text-[#E54545]">*</span>
            </span>
            <Input
              placeholder="Nhập tên doanh nghiệp"
              maxLength={100}
              minLength={13}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <span className="block text-right mt-1 text-[#9a9a9a]">0/100</span>
        </Form.Item>
        <Form.Item
          className="mb-4"
          name="is_individual_business"
          valuePropName="checked"
        >
          <Checkbox
            defaultChecked={isCheckbox}
            onChange={onChangeCheckbox}
            className="circle-checkbox"
          >
            <span className="text-text-color font-normal text-base">
              Kinh doanh cá thể / Doanh nghiệp nhỏ
            </span>
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="business_type"
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
          label={
            <span className="text-text-color text-base font-medium">
              Loại hình dịch vụ doanh nghiệp{" "}
              <span className="text-[#E54545]">*</span>
            </span>
          }
        >
          <Select placeholder="Chọn loại hình dịch vụ" mode="multiple">
            {businessServiceType &&
              businessServiceType.map((bus) => (
                <Select.Option key={bus.id} value={bus.id}>
                  {bus.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="job_id"
          label={
            <span className="text-text-color text-base font-medium">
              Nghề nghiệp <span className="text-[#E54545]">*</span>
            </span>
          }
          rules={[
            {
              required: !isCheckbox,
              message: "Không được để trống",
            },
          ]}
        >
          <Select placeholder="Chọn nghề nghiệp" disabled={isCheckbox}>
            {jobs &&
              jobs.map((job) => (
                <Select.Option key={job.id} value={job.id}>
                  {job.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="position_id"
          label={
            <span className="text-text-color text-base font-medium">
              Chức vụ <span className="text-[#E54545]">*</span>
            </span>
          }
          rules={[
            {
              required: !isCheckbox,
              message: "Không được để trống",
            },
          ]}
        >
          <Select placeholder="Chọn chức vụ" disabled={isCheckbox}>
            {positions &&
              positions.map((position) => (
                <Select.Option key={position.id} value={position.id}>
                  {position.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="enterprise_email"
          rules={[
            {
              required: !isCheckbox,
              message: "Không được để trống",
            },
          ]}
        >
          <div>
            <span className="text-text-color text-base font-medium block mb-2">
              Email doanh nghiệp
              <span className="text-[#E54545]">*</span>
            </span>
            <Input placeholder="Nhập email" disabled={isCheckbox} />
            {errors.email && (
              <div className="text-[#ff4d4f] mt-1 text-sm font-medium">
                {errors.email}
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <div className="w-full mr-0 ml-auto mt-6">
              <IbuildButton
                prefix={<span>Nâng cấp tài khoản</span>}
                type="submit"
                disabled={isSubmitDisabled || isLoading}
                isLoading={isLoading}
              />
            </div>
          )}
        </Form.Item>
      </Form>
    </div>
  );

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
    <>
      <Modal isOpen={isOpen} body={body} />
      {changeSuccess && <ChangeSuccess title="Nâng cấp tài khoản thành công" />}
    </>
  );
};

export default BecomeExpertModal;
