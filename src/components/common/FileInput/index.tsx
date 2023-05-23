import Image from "next/image";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { importFile } from "@/lib/api";
import { getSellImage } from "@/lib/utils";

interface FileInputProps {
  typeImage: string[];
  size: number;
  setUrlImage: (url: string) => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile, types: string[], size: number) => {
  const isJpgOrPng = types.includes(file.type);
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG/JPEG file!");
  }
  const sizeLimit = file.size / 1024 / 1024 < size;
  if (!sizeLimit) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && sizeLimit;
};

const FileInput = ({ typeImage, size, setUrlImage }: FileInputProps) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (options: any) => {
    setLoading(true);
    const { file } = options;

    const formData = new FormData();
    formData.append("file", file);
    const res: any = await importFile(formData);
    setLoading(false);

    if (res?.status === 200) {
      const imagePath = res?.data?.image_path || "";
      setUrlImage(imagePath || "");
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Upload
        accept="image/png, image/jpeg, image/jpg"
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={(file) => beforeUpload(file, typeImage, size)}
        customRequest={handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default FileInput;
