import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Input, Form, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import dict from '@/utils/dict';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import Select from '@/components/Select';
import MyModal from '@/components/Modal';
import PageTitle from '@/components/PageTitle';
import LicenseForm from './components/LicenseForm';
// import PageTitle from '@/components/PageTitle';

const FormItem = Form.Item;

@connect(({ license, loading }) => ({
  license,
  getListIsLoading: loading.effects['license/getList'],
  licenseCreateIsLoading: loading.effects['rfid/licenseCreate'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'license/getList' });
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
        type: 'license/changeListParams',
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
      type: 'license/resetListParams',
    });
  };

  openFormCreate = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'license/openForm',
      payload: {},
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form layout="inline" onSubmit={this.changeListParams}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="数字牌号">
              {getFieldDecorator('plateNumber')(
                <Input placeholder="请输入数字牌号" autoComplete="off" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="车牌状态">
              {getFieldDecorator('produceState', {
                initialValue: null,
              })(
                <Select
                  hasAll
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  data={Object.keys(dict.licenseProduceState).map(key => {
                    return { itemCode: key, itemName: dict.licenseProduceState[key] };
                  })}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <Button icon="form" type="primary" onClick={this.openFormCreate}>
            批量创建
          </Button>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={this.openFormCreate}>
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
      licenseCreateIsLoading,
      route: { title },
      license: {
        visible,
        formData,
        listParams: { page },
        list: { data: listData, totalItemCount },
      },
    } = this.props;

    const listProps = {
      columns: [
        {
          title: '序号',
          key: '#',
          width: 80,
          render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
        },
        {
          title: 'RFID',
          key: 'RFID',
          render: (text, record) => {
            return <Fragment>{record.rfid}</Fragment>;
          },
        },
        {
          title: '数字牌号',
          key: 'plateNumber',
          render: (text, record) => {
            return <Fragment>{record.plateNumber}</Fragment>;
          },
        },
        {
          title: '生产状态',
          key: 'produceState',
          render: (text, record) => {
            let flatClass = '';
            switch (record.produceState) {
              case dict.LICENSE_PRODUCE_STATE_ALLOCATED:
                flatClass = 'warning_flat';
                break;
              case dict.LICENSE_PRODUCE_STATE_CREATED:
                flatClass = 'success_flat';
                break;
              case dict.LICENSE_PRODUCE_STATE_BINDED:
                flatClass = 'primary_flat';
                break;
              case dict.LICENSE_PRODUCE_STATE_VALID:
                flatClass = 'primary_flat';
                break;
              default:
                break;
            }
            return (
              <Fragment>
                <i
                  style={{
                    verticalAlign: 1,
                    marginRight: 5,
                  }}
                  className={`point ${flatClass}`}
                />
                {dict.licenseProduceState[record.produceState]}
              </Fragment>
            );
          },
        },
        {
          title: '机械ID',
          key: 'id',
          render: (text, record) => {
            return <Fragment>{record.id}</Fragment>;
          },
        },
        {
          title: '批号参数',
          key: 'createBatchNo',
          render: (text, record) => {
            return <Fragment>{record.createBatchNo}</Fragment>;
          },
        },
      ],
      dataSource: listData,
      loading: getListIsLoading,
      pagination: {
        total: totalItemCount,
        current: page,
      },
      style: {
        marginTop: 24,
      },
      onChange: pagination => {
        dispatch({
          type: 'license/changeListParams',
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
        <MyModal
          title="批量录入"
          visible={visible}
          confirmLoading={licenseCreateIsLoading}
          onOk={(data, resetFields) => {
            dispatch({
              type: 'license/licenseCreate',
              payload: {
                data: { ...data.license },
                resetFields,
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'license/closeForm',
            });
          }}
        >
          <LicenseForm data={formData} />
        </MyModal>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
