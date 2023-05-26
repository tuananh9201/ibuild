import { importFile } from "@/lib/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { useState } from "react";

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

const checkHeightWidthImage = (file: RcFile): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (event) => {
      const _loadedImageUrl = event.target?.result;
      const image = document.createElement("img");
      image.src = _loadedImageUrl as string;

      image.addEventListener("load", () => {
        const { width, height } = image;

        if (width >= 80 && height >= 80) {
          resolve(true);
          return;
        }

        message.error("Ảnh phải có kích thước 80x80");
        resolve(false);
      });
    });
  });
};

const beforeUpload = async (file: RcFile, types: string[], size: number) => {
  // check height and width image
  let conditionImage = await checkHeightWidthImage(file);

  // check image type
  const isJpgOrPng = types.includes(file.type);
  if (!isJpgOrPng) {
    message.error("Bạn chỉ có thể tải lên ảnh có định dạng JPG/PNG/JPEG");
  }

  // check image size
  const sizeLimit = file.size / 1024 / 1024 < size;
  if (!sizeLimit) {
    message.error("Ảnh có dung lượng nhỏ hơn 3MB");
  }

  return isJpgOrPng && sizeLimit && conditionImage;
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
