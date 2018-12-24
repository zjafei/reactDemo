import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Tabs, Card, Carousel, Icon } from 'antd';
import moment from 'moment';
// import ReactSlick from 'react-slick';
import dict from '@/utils/dict';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FilterItem from '@/components/FilterItem';
import styles from './MachineDetail.less';

const { TabPane } = Tabs;
const colWidth = {
  md: 8,
  sm: 24,
};
@connect(({ machineDetail, loading }) => ({
  machineDetail,
  getDetailIsLoading: loading.effects['machineDetail/getDetail'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch({ type: 'machineDetail/getDetail', payload: id });
    dispatch({
      type: 'machineDetail/overrideStateProps',
      payload: {
        machineId: id,
      },
    });
  }

  render() {
    const {
      machineDetail: { detail, machinePhotosList },
    } = this.props;

    let flatClass = '';
    switch (detail.state) {
      case dict.MACHINE_BINDED:
        flatClass = 'warning_flat';
        break;
      case dict.MACHINE_COMPLETED:
        flatClass = 'success_flat';
        break;
      case dict.MACHINE_VERIFIED:
        flatClass = 'primary_flat';
        break;
      default:
        break;
    }

    const label = dict.machineOwnerTypeLabel[detail.ownerType || dict.MACHINE_OWNER_TYPE_PERSONAL];

    return (
      <PageHeaderWrapper>
        <Card
          bordered={false}
          bodyStyle={{
            padding: 20,
            paddingBottom: 10,
          }}
        >
          <div className={styles.header} style={{ position: 'relative' }}>
            <span
              className={styles.img}
              style={{
                backgroundImage: `url('${
                  detail.photos.machinePhoto.rightSide
                    ? detail.photos.machinePhoto.rightSide.url
                    : ''
                }')`,
              }}
            />
            <span className={styles.title}>
              机械ID：
              {detail.id}
            </span>
            <div className={styles.machineState}>
              <div className={styles.label}>机械状态</div>
              <div className={styles.state}>
                <i
                  style={{
                    verticalAlign: 1,
                    marginRight: 5,
                  }}
                  className={`point ${flatClass}`}
                />
                {dict.machineCertState[detail.state]}
                {detail.state === dict.MACHINE_COMPLETED && detail.certId !== null ? (
                  <div>
                    <Link to={`/machine/record/${detail.certId}`}>查看备案</Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Row style={{ marginLeft: 24, marginTop: 20 }} gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col {...colWidth}>
              <FilterItem label={`${label.ownerName}：`}>{detail.ownerName}</FilterItem>
            </Col>
            <Col md={16} sm={24}>
              <FilterItem label={`${label.contactsPhone}：`}>{detail.contactsPhone}</FilterItem>
            </Col>
            <Col {...colWidth}>
              <FilterItem label="机械类型：">{detail.category}</FilterItem>
            </Col>
            <Col md={16} sm={24}>
              <FilterItem label="品牌型号：">
                {detail.brand} {detail.machineModel}
              </FilterItem>
            </Col>
            <Col {...colWidth}>
              <FilterItem label="认证日期：">
                {moment(detail.certDate).format('YYYY-MM-DD')}
              </FilterItem>
            </Col>
            <Col md={16} sm={24}>
              <FilterItem label="车牌：">{detail.plateNum}</FilterItem>
            </Col>
            <Col md={24} sm={24}>
              <FilterItem label={`${label.address}：`}>{detail.address}</FilterItem>
            </Col>
          </Row>
        </Card>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <div className={styles.machinePhoto}>
            <Carousel
              className={styles.machinePhotoBig}
              dots={false}
              ref={carousel => {
                this.carouselBig = carousel;
              }}
            >
              {machinePhotosList.map(row => (
                <div key={row}>
                  <div
                    className={styles.machinePhotoImg}
                    style={{ backgroundImage: `url('${row}')` }}
                  />
                </div>
              ))}
            </Carousel>
            <div className={styles.machinePhotoList}>
              <a
                className={styles.prev}
                onClick={() => {
                  this.carousel.prev();
                }}
              >
                <Icon type="left" style={{ color: '#ccc' }} />
              </a>
              <a
                className={styles.next}
                onClick={() => {
                  this.carousel.next();
                }}
              >
                <Icon type="right" style={{ color: '#ccc' }} />
              </a>
              <Carousel
                slidesToShow={3}
                dots={false}
                ref={carousel => {
                  this.carousel = carousel;
                }}
              >
                {machinePhotosList.map((row, index) => (
                  <div key={row}>
                    <div
                      className={styles.machinePhotoImg}
                      style={{ backgroundImage: `url('${row}')` }}
                      onClick={() => {
                        this.carouselBig.goTo(index);
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <Card
            bordered={false}
            style={{
              marginRight: 350,
              minHeight: 340,
            }}
            bodyStyle={{
              padding: '0 20px',
            }}
          >
            <Tabs size="large" className="biggest_tabs" defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="机械ID：">
                      {detail.id}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="机械类型：">
                      {detail.category}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="品牌：">
                      {detail.brand}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="型号：">
                      {detail.machineModel}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="铭牌编号：">
                      {detail.nameplateNumber}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    {/* 整机质量 weight 的对象机构 */}
                    <FilterItem labelWidth={85} label="整机质量：">
                      {detail.weight || '-'}
                      （kg）
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="外形尺寸：">
                      {detail.size}
                      （mm）
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="发动机功率：">
                      {detail.enginePower || '-'}
                      （kw）
                    </FilterItem>
                  </Col>
                  {/* <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="使用年限：">
                      *没*找*到*
                    </FilterItem>
                  </Col> */}
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="生产厂家：">
                      {detail.manufacturer}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="出厂日期：">
                      {moment(detail.productDate).format('YYYY年')}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="购买日期：">
                      {moment(detail.purchaseDate).format('YYYY年M月')}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="原值：">
                      {detail.buyPrice || '-'}
                      （元）
                    </FilterItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={`${label.tabName}`} key="2">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label={`${label.ownerName}：`}>
                      {detail.ownerName}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label={`${label.contactsPhone}：`}>
                      {detail.contactsPhone}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label={`${label.ownerIdCardNumber}：`}>
                      {detail.ownerIdCardNumber}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label={`${label.ownerIdCardPhoto}：`}>
                      {detail.photos.ownerIdCardPhoto.url ? '有' : '无'}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label={`${label.address}：`}>
                      {detail.address}
                    </FilterItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="认证信息" key="3">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="铭牌号：">
                      {detail.nameplateNumber}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="铭牌照片：">
                      {detail.photos.nameplatePhoto.url ? '有' : '无'}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="发动机号：">
                      {detail.mainEngineNo}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={120} label="发动机铭牌照片：">
                      {detail.photos.mainEngineNoPhoto.url ? '有' : '无'}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="发票照片：">
                      {detail.photos.invoicePhoto.url ? '有' : '无'}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="合格证照片：">
                      {detail.photos.certificationPhoto.url ? '有' : '无'}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="驾驶证照片：">
                      {detail.photos.mainEngineNoPhoto.url ? '有' : '无'}
                    </FilterItem>
                  </Col>
                  <Col md={24} lg={12}>
                    <FilterItem labelWidth={85} label="机械照片：">
                      {detail.photos.drivingLicencePhoto.url ? '有' : '无'}
                    </FilterItem>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
