import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import MyModal from '@/components/Modal';
import PageTitle from '@/components/PageTitle';
import RfidForm from './components/RFIDForm';

@connect(({ rfid, loading }) => ({
  rfid,
  getListIsLoading: loading.effects['rfid/getList'],
  rfidCreateIsLoading: loading.effects['rfid/rfidCreate'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'rfid/getList' });
  }

  changeListParams = () => {
    const {
      dispatch,
      form: { validateFields, getFieldsValue },
    } = this.props;

    validateFields(err => {
      if (err) return;
      dispatch({
        type: 'rfid/changeListParams',
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
      type: 'rfid/resetListParams',
    });
  };

  openFormCreate = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'rfid/openForm',
      payload: {},
    });
  };

  openFormEdit = data => {
    const { dispatch } = this.props;
    const { id, ...formData } = data;

    dispatch({
      type: 'rfid/openForm',
      payload: {
        rfidId: id,
        formData: {
          appKey: formData.appKey,
          expiredAt: moment(formData.expiredAt),
        },
      },
    });
  };

  render() {
    const {
      dispatch,
      getListIsLoading,
      rfidCreateIsLoading,
      // route: { title, name: pageName },
      route: { title },
      rfid: {
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
          title: 'RFID',
          key: 'appKey',
          render: (text, record) => <Fragment>{record.appKey}</Fragment>,
        },
        {
          title: '烧录值',
          key: 'secret',
          render: (text, record) => <Fragment>{record.secret}</Fragment>,
        },
        {
          title: '烧录状态',
          key: 'createdAt',
          render: (text, record) => <Fragment>{record.createdAt}</Fragment>,
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
          type: 'rfid/changeListParams',
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
            <Button icon="form" type="primary" onClick={this.openFormCreate}>
              批量录入
            </Button>
          </ListHeaderForm>
          <TableList {...listProps} />
        </Card>
        <MyModal
          title="批量录入"
          visible={visible}
          confirmLoading={rfidCreateIsLoading}
          onOk={(data, resetFields) => {
            const rfidForm = data.rfid;
            rfidForm.expiredAt = rfidForm.expiredAt.format('YYYY-MM-DD');
            dispatch({
              type: 'rfid/rfidCreate',
              payload: {
                data: { ...rfidForm },
                resetFields,
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'rfid/closeForm',
            });
          }}
        >
          <RfidForm data={formData} />
        </MyModal>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
