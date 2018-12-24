import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import MyModal from '@/components/Modal';
import PageTitle from '@/components/PageTitle';
import AppForm from './components/AppForm';

@connect(({ app, loading }) => ({
  app,
  getListIsLoading: loading.effects['app/getList'],
  appCreateIsLoading: loading.effects['app/appCreate'],
  appEditIsLoading: loading.effects['app/appEdit'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'app/getList' });
  }

  changeListParams = () => {
    const {
      dispatch,
      form: { validateFields, getFieldsValue },
    } = this.props;

    validateFields(err => {
      if (err) return;
      dispatch({
        type: 'app/changeListParams',
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
      type: 'app/resetListParams',
    });
  };

  openFormCreate = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'app/openForm',
      payload: {
        isEdit: false,
      },
    });
  };

  openFormEdit = data => {
    const { dispatch } = this.props;
    const { id, ...formData } = data;

    dispatch({
      type: 'app/openForm',
      payload: {
        isEdit: true,
        appId: id,
        formData: {
          appKey: formData.appKey,
          secret: formData.secret,
          expiredAt: moment(formData.expiredAt),
          description: formData.description,
        },
      },
    });
  };

  render() {
    const {
      dispatch,
      getListIsLoading,
      appEditIsLoading,
      appCreateIsLoading,
      // route: { title, name: pageName },
      route: { title },
      app: {
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
          title: 'APP_KEY',
          key: 'appKey',
          render: (text, record) => <Fragment>{record.appKey}</Fragment>,
        },
        {
          title: '密钥',
          key: 'secret',
          render: (text, record) => <Fragment>{record.secret}</Fragment>,
        },
        {
          title: '创建日期',
          key: 'createdAt',
          render: (text, record) => <Fragment>{record.createdAt}</Fragment>,
        },
        {
          title: '到期日期',
          key: 'expiredAt',
          render: (text, record) => (
            <Fragment>{moment(record.expiredAt).format('YYYY-MM-DD')}</Fragment>
          ),
        },
        {
          title: '描述',
          key: 'description',
          render: (text, record) => <Fragment>{record.description}</Fragment>,
        },
        {
          title: '操作',
          key: 'operating',
          width: 60,
          render: (text, record) => (
            <a
              onClick={() => {
                this.openFormEdit(record);
              }}
            >
              修改
            </a>
          ),
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
          type: 'app/changeListParams',
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
          <ListHeaderForm>
            <Button icon="plus-square" type="primary" onClick={this.openFormCreate}>
              新建应用
            </Button>
          </ListHeaderForm>
          <TableList {...listProps} />
        </Card>
        <MyModal
          title={`${isEdit ? '编辑' : '新建'}应用`}
          visible={visible}
          confirmLoading={appEditIsLoading || appCreateIsLoading}
          onOk={(data, resetFields) => {
            const appForm = data.app;
            appForm.expiredAt = appForm.expiredAt.format('YYYY-MM-DD');
            dispatch({
              type: isEdit === false ? 'app/appCreate' : 'app/appEdit',
              payload: {
                data: { ...appForm },
                resetFields,
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'app/closeForm',
            });
          }}
        >
          <AppForm data={formData} />
        </MyModal>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
