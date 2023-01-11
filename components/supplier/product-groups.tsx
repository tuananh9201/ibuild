import { Row, Col } from "antd";
import ProductCard from "../products/product-card";
import suppliers from "../../data/suppliers.json";
const ProductGroups = () => {
  return (
    <Row gutter={[24, 32]}>
      {suppliers.map((supplier) => (
        <Col className="gutter-row" key={supplier.id} md={24} lg={8}>
          <ProductCard supplier={supplier} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGroups;
