import { StoreItem } from "../components/StoreItem";
import items from "../items.json";
import { Col, Row } from "react-bootstrap";

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
        <Col></Col>
      </Row>
    </>
  );
}
