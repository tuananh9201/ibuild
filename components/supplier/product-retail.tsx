import { Row, Col, Pagination } from "antd";
import retails from "../../data/product-retail.json";
import suppliers from "../../data/suppliers.json";
import RetailCard from "../products/retail-card";
const ProductRetails = () => {
  const retailsMap = retails.map((r) => {
    return { ...r, supplier: suppliers[0] };
  });
  return (
    <Row gutter={[24, 32]}>
      {retailsMap.map((retail) => (
        <Col className="gutter-row" key={retail.id} md={24} lg={8}>
          <RetailCard retail={retail} />
        </Col>
      ))}
      <div className="pagination">
        <Pagination
          defaultPageSize={6}
          defaultCurrent={1}
          total={suppliers.length}
        />
      </div>
    </Row>
  );
};

export default ProductRetails;
