import { Col, Row } from "antd";
import useSWR from "swr";

import { fetchNewsRelated } from "src/lib/api/news";
import NewCardNormal from "./news-card-normal";
import { INews } from "@/lib/types";

interface NewRelatedProps {
  data: INews[];
}

const NewRelated = ({ data }: NewRelatedProps) => {
  return (
    <div className="mb-10 mt-[60px]">
      <div className="font-semibold text-2xl leading-[150%] mb-8">
        Thông tin liên quan
      </div>
      <Row gutter={[32, 32]}>
        {data?.map((n) => (
          <Col lg={6} md={12} key={n.id}>
            <NewCardNormal hideDescription={true} news={n} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewRelated;
