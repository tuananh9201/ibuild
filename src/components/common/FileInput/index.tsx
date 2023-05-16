import Image from "next/image";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

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

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setUrlImage(url);
      });
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
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={(file) => beforeUpload(file, typeImage, size)}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default FileInput;
