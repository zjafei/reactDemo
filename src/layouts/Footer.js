import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import moment from 'moment';
// import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 24, textAlign: 'center' }}>
    <Fragment>
      <Icon type="copyright" /> 2014-
      {moment().format('YYYY')} 电子科技有限公司 苏ICP备88888888号-8
    </Fragment>
    {/* <GlobalFooter
      links={[
        {
          key: 'Pro 首页',
          title: 'Pro 首页',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 车牌管理系统
        </Fragment>
      }
    /> */}
  </Footer>
);
export default FooterView;
