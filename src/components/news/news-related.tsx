import style from "@/styles/modules/build-info.module.scss";
import { Row, Col } from "antd";
import { fetchNewsRelated } from "src/lib/api/news";
import useSWR from "swr";
import NewCardNormal from "./news-card-normal";
const NewRelated = () => {
  const { data, error } = useSWR("/news-related", fetchNewsRelated, {
    fallbackData: [],
  });
  return (
    <div className={style.News_Related}>
      <div className={style.News_Related_Title}>Thông tin liên quan</div>
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
