import { Row, Col, Pagination } from "antd";
import ProductCard from "../products/product-card";
import suppliers from "../../data/suppliers.json";
const ProductGroups = () => {
  return (
    <Row
      gutter={{
        lg: 32,
      }}
    >
      {suppliers.map((supplier) => (
        <Col className="gutter-row" key={supplier.id} md={24} lg={8}>
          <ProductCard supplier={supplier} />
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

export default ProductGroups;
