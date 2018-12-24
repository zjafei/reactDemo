import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Card } from 'antd';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import PageTitle from '@/components/PageTitle';
import Select from '@/components/Select';

const FormItem = Form.Item;
// const { Option } = Select;

@connect(({ application, loading }) => ({
  application,
  getListIsLoading: loading.effects['application/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'application/getList' });
  }

  changeListParams = e => {
    e.preventDefault();
    const {
      dispatch,
      form: { validateFields, getFieldsValue },
    } = this.props;

    validateFields(err => {
      if (err) return;
      dispatch({
        type: 'application/changeListParams',
        payload: {
          page: 1,
          ...getFieldsValue(),
        },
      });
    });
  };

  resetListParams = () => {
    const {
      form: { resetFields },
      dispatch,
    } = this.props;
    resetFields();
    dispatch({
      type: 'application/resetListParams',
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键词搜索">
              {getFieldDecorator('text')(
                <Input placeholder="请输入搜索关键词" autoComplete="off" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="APP_ID">
              {getFieldDecorator('appId', {
                initialValue: null,
              })(<Select hasAll placeholder="请选择" style={{ width: '100%' }} type="app" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="认证员ID">
              {getFieldDecorator('auditorId', {
                initialValue: null,
              })(<Select hasAll placeholder="请选择" style={{ width: '100%' }} type="officer" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.resetListParams}>
              重置
            </Button>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const {
      dispatch,
      getListIsLoading,
      // route: { title, name: pageName },
      route: { title },
      application: {
        listParams: { page },
        list: { data: listData, totalItemCount },
      },
    } = this.props;
    const listProps = {
      columns: [
        {
          title: '申请ID',
          key: 'id',
          render: (text, record) => <Fragment>{record.id}</Fragment>,
        },

        {
          title: '机械类型',
          key: 'category',
          render: (text, record) => {
            return <Fragment>{record.category}</Fragment>;
          },
        },
        {
          title: '品牌型号',
          key: 'brandModel',
          render: (text, record) => <Fragment>{record.brandModel}</Fragment>,
        },
        {
          title: '机主姓名',
          key: 'ownerName',
          render: (text, record) => <Fragment>{record.ownerName}</Fragment>,
        },
        {
          title: '联系方式',
          key: 'ownerPhone',
          render: (text, record) => <Fragment>{record.ownerPhone}</Fragment>,
        },
        {
          title: '来源',
          key: 'origin',
          render: (text, record) => (
            <Fragment>
              {record.auditor ? `认证员：${record.auditor.username}` : `APP：${record.app.appKey}`}
            </Fragment>
          ),
        },
        {
          title: '备注',
          key: 'remark',
          render: (text, record) => <Fragment>{record.remark}</Fragment>,
        },
        {
          title: '机械ID',
          key: 'machineId',
          render: (text, record) => <Fragment>{record.machineId}</Fragment>,
        },
        {
          title: '操作',
          key: 'operating',
          width: 100,
          // fixed: 'right',
          render: (text, record) => <Link to={`/machine/application/${record.id}`}>查看详情</Link>,
        },
      ],
      dataSource: listData,
      loading: getListIsLoading,
      style: {
        marginTop: 24,
      },
      pagination: {
        total: totalItemCount,
        current: page,
      },
      onChange: pagination => {
        dispatch({
          type: 'application/changeListParams',
          payload: {
            page: pagination.current,
          },
        });
      },
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false} bodyStyle={{ paddingBottom: 0, paddingLeft: 20, paddingRight: 20 }}>
          <PageTitle>{title}</PageTitle>
          <ListHeaderForm>{this.renderAdvancedForm()}</ListHeaderForm>
          <TableList {...listProps} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
