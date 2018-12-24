import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import { hostList } from '@/services/mock';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FilterItem from '@/components/FilterItem';
import styles from './recordDetail.less';

const colWidth = {
  md: 12,
  sm: 24,
};

@connect(({ recordDetail, loading }) => ({
  recordDetail,
  getDetailIsLoading: loading.effects['recordDetail/getDetail'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    dispatch({ type: 'recordDetail/getDetail', payload: id });
    dispatch({
      type: 'recordDetail/overrideStateProps',
      payload: {
        machineId: id,
      },
    });
  }

  render() {
    const {
      recordDetail: { detail },
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Card
          bordered={false}
          bodyStyle={{
            padding: 20,
            minHeight: 200,
          }}
        >
          <div className={styles.header}>
            <span className={styles.img} />
            <span className={styles.title}>备案信息</span>
          </div>
          <div className={styles.photo}>
            <img
              style={{
                width: '100%',
              }}
              alt="备案信息"
              src={`//${hostList[ENV]}/cert/${detail.id}/image?confirmCode=${detail.confirmCode}`}
            />
          </div>
          <Row
            style={{ marginLeft: 24, marginTop: 20, marginRight: 410 }}
            gutter={{ md: 8, lg: 24, xl: 48 }}
          >
            <Col {...colWidth}>
              <FilterItem label="机主姓名：">{detail.ownerName}</FilterItem>
            </Col>
            <Col {...colWidth}>
              <FilterItem label="联系方式：">{detail.ownerPhone}</FilterItem>
            </Col>
            <Col {...colWidth}>
              <FilterItem label="确认码：">{detail.confirmCode}</FilterItem>
            </Col>
            {/* <Col {...colWidth}>
              <FilterItem label="电子文档：">
                <a href={detail.filePath}>点击下载</a>
              </FilterItem>
            </Col> */}
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
