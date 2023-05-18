import { Form, Input } from "antd";

import { Modal } from "../common";

interface BecomeExpertModalProps {
  isOpen: boolean;
}

const BecomeExpertModal = ({ isOpen }: BecomeExpertModalProps) => {
  const body = (
    <>
      <h3>Trở thành chuyên gia</h3>
      <p>
        Bạn là kiến trúc sư, nhà thầu hoặc chỉ là người quan tâm tới xây dựng
        hãy trải nghiệm thêm tính năng tìm kiếm chuyên dụng và những thông tin
        hữu ích dành riêng cho chuyên gia.
      </p>
      <Form>
        <Form.Item>
          <span>
            Doanh nghiệp <span className="text-[#E54545]">*</span>
          </span>
          <Input placeholder="Nhập tên doanh nghiệp" />
          <span>0/200</span>
        </Form.Item>
      </Form>
    </>
  );

  return <Modal isOpen={isOpen} body={body} />;
};

export default BecomeExpertModal;
