import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface ILoadingComponentProps {
  fontSize?: number;
}
const LoadingComponent = (props: ILoadingComponentProps) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: props?.fontSize || 24 }} spin />
  );
  return (
    <div>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingComponent;
