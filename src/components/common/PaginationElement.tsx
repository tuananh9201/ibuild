import { Pagination } from "antd";

interface PaginationProps {
  total: number;
  current: number;
  onChangePagination: (page: number) => void;
}
const PaginationElement = ({
  total,
  current,
  onChangePagination,
}: PaginationProps) => {
  const onChange = (page: number, pageSize: number) => {
    onChangePagination;
  };
  return (
    <Pagination
      onChange={onChange}
      defaultCurrent={current}
      pageSize={12}
      total={total}
    />
  );
};

export default PaginationElement;
