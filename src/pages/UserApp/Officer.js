import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Card, Modal } from 'antd';
import dict from '@/utils/dict';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import MyModal from '@/components/Modal';
import PageTitle from '@/components/PageTitle';
import OfficerForm from './components/OfficerForm';

const FormItem = Form.Item;

@connect(({ officer, loading }) => ({
  officer,
  getListIsLoading: loading.effects['officer/getList'],
  officerCreateIsLoading: loading.effects['officer/officerCreate'],
  officerEditIsLoading: loading.effects['officer/officerEdit'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'officer/getList' });
  }

  changeListParams = () => {
    const {
      dispatch,
      form: { validateFields, getFieldsValue },
    } = this.props;

    validateFields(err => {
      if (err) return;
      dispatch({
        type: 'officer/changeListParams',
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
      type: 'officer/resetListParams',
    });
  };

  openFormCreate = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'officer/openForm',
      payload: {
        isEdit: false,
      },
    });
  };

  openFormEdit = data => {
    const { dispatch } = this.props;
    const { id, ...formData } = data;

    formData.password = '';

    dispatch({
      type: 'officer/openForm',
      payload: {
        isEdit: true,
        officerId: id,
        formData,
      },
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="认证员ID">
              {getFieldDecorator('id')(<Input placeholder="请输入认证员ID" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="账户名">
              {getFieldDecorator('username')(
                <Input placeholder="请输入账户名" autoComplete="off" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <Button icon="plus-square" type="primary" onClick={this.openFormCreate}>
            新建认证员
          </Button>
          <div style={{ float: 'right' }}>
            <Button type="primary" onClick={this.changeListParams}>
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
      officerEditIsLoading,
      officerCreateIsLoading,
      // route: { title, name: pageName },
      route: { title },
      officer: {
        isEdit,
        visible,
        formData,
        listParams: { page },
        list: { data: listData, totalItemCount },
      },
    } = this.props;

    // table的参数
    const listProps = {
      columns: [
        {
          title: '序号',
          key: '#',
          width: 80,
          render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
        },
        {
          title: '账户名',
          key: 'username',
          render: (text, record) => <Fragment>{record.username}</Fragment>,
        },
        {
          title: '状态',
          key: 'enabled',
          render: (text, record) => (
            <Fragment>
              <i
                style={{
                  verticalAlign: 1,
                  marginRight: 5,
                }}
                className={`point ${record.enabled === true ? 'success_flat' : 'error_flat'}`}
              />
              {record.enabled === true ? '使用中' : '已停用'}
            </Fragment>
          ),
        },
        {
          title: '权限等级',
          key: 'type',
          render: (text, record) => (
            <span className={record.type === dict.OFFICER_HIGH ? 'error_text' : ''}>
              {dict.officerType[record.type]}
            </span>
          ),
        },
        {
          title: '操作',
          key: 'operating',
          width: 130,
          render: (text, record, index) => {
            const showText = record.enabled === true ? '停用' : '启用';
            const stateClassName = record.enabled === false ? 'success_text' : 'error_text';
            return (
              <Fragment>
                <a
                  onClick={() => {
                    this.openFormEdit(record);
                  }}
                >
                  修改
                </a>
                <span
                  className={`cursor_pointer ${stateClassName}`}
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    Modal.confirm({
                      title: (
                        <Fragment>
                          你确定要
                          <span className={stateClassName}>{showText}</span>
                          认证员 {record.username} ?
                        </Fragment>
                      ),
                      onOk: () => {
                        dispatch({
                          type:
                            record.enabled === true
                              ? 'officer/officerDisable'
                              : 'officer/officerEnable',
                          payload: {
                            officerId: record.id,
                            index,
                          },
                        });
                      },
                    });
                  }}
                >
                  {showText}
                </span>
              </Fragment>
            );
          },
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
          type: 'officer/changeListParams',
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
          title={`${isEdit ? '编辑' : '新建'}认证员`}
          visible={visible}
          confirmLoading={officerEditIsLoading || officerCreateIsLoading}
          onOk={(data, resetFields) => {
            dispatch({
              type: isEdit === false ? 'officer/officerCreate' : 'officer/officerEdit',
              payload: {
                data: { ...data.officer },
                resetFields,
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'officer/closeForm',
            });
          }}
        >
          <OfficerForm data={formData} />
        </MyModal>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
