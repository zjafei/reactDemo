import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import PageTitle from '@/components/PageTitle';

@connect(({ record, loading }) => ({
  record,
  getListIsLoading: loading.effects['record/getList'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'record/getList' });
  }

  render() {
    const {
      dispatch,
      getListIsLoading,
      route: { title },
      record: {
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
          title: '机主姓名',
          key: 'ownerName',
          render: (text, record) => {
            return <Fragment>{record.ownerName}</Fragment>;
          },
        },
        {
          title: '联系方式',
          key: 'ownerPhone',
          render: (text, record) => {
            return <Fragment>{record.contactPhone}</Fragment>;
          },
        },
        {
          title: '身份证号码',
          key: 'ownerIdCardNumber',
          render: (text, record) => {
            return <Fragment>{record.ownerIdCardNumber}</Fragment>;
          },
        },
        {
          title: '确认码',
          key: 'confirmCode',
          render: (text, record) => {
            return <Fragment>{record.confirmCode}</Fragment>;
          },
        },
        {
          title: '机械ID',
          key: 'machineId',
          render: (text, record) => {
            return <Fragment>{record.machineId}</Fragment>;
          },
        },
        {
          title: '操作',
          key: 'operating',
          width: 100,
          // fixed: 'right',
          render: (text, record) => <Link to={`/machine/record/${record.id}`}>查看详情</Link>,
        },
      ],
      dataSource: listData,
      loading: getListIsLoading,
      pagination: {
        total: totalItemCount,
        current: page,
      },
      onChange: pagination => {
        dispatch({
          type: 'record/changeListParams',
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
          <TableList {...listProps} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
