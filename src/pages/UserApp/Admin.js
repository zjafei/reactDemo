import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal } from 'antd';
import dict from '@/utils/dict';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import MyModal from '@/components/Modal';
import PageTitle from '@/components/PageTitle';
import AdminForm from './components/AdminForm';

@connect(({ admin, loading }) => ({
  admin,
  getListIsLoading: loading.effects['admin/getList'],
  adminCreateIsLoading: loading.effects['admin/adminCreate'],
  adminEditIsLoading: loading.effects['admin/adminEdit'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'admin/getList' });
  }

  changeListParams = () => {
    const {
      dispatch,
      form: { validateFields, getFieldsValue },
    } = this.props;

    validateFields(err => {
      if (err) return;
      dispatch({
        type: 'admin/changeListParams',
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
      type: 'admin/resetListParams',
    });
  };

  openFormCreate = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'admin/openForm',
      payload: {
        isEdit: false,
      },
    });
  };

  openFormEdit = data => {
    const { dispatch } = this.props;
    const { id, ...formData } = data;

    dispatch({
      type: 'admin/openForm',
      payload: {
        isEdit: true,
        adminId: id,
        formData,
      },
    });
  };

  render() {
    const {
      dispatch,
      getListIsLoading,
      adminEditIsLoading,
      adminCreateIsLoading,
      // route: { title, name: pageName },
      route: { title },
      admin: {
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
          title: '管理员ID',
          key: 'id',
          render: (text, record) => <Fragment>{record.id}</Fragment>,
        },
        {
          title: '账户名',
          key: 'username',
          render: (text, record) => <Fragment>{record.username}</Fragment>,
        },
        {
          title: '角色',
          key: 'expiredAt',
          render: (text, record) => (
            <span className={record.type === dict.ADMIN_FACTORY ? 'error_text' : ''}>
              {dict.adminType[record.type]}
            </span>
          ),
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
                          管理员 {record.username} ?
                        </Fragment>
                      ),
                      onOk: () => {
                        dispatch({
                          type:
                            record.enabled === true ? 'admin/adminDisable' : 'admin/adminEnable',
                          payload: {
                            adminId: record.id,
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
          type: 'admin/changeListParams',
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
              新建管理员
            </Button>
          </ListHeaderForm>
          <TableList {...listProps} />
        </Card>
        <MyModal
          title={`${isEdit ? '编辑' : '新建'}管理员`}
          visible={visible}
          confirmLoading={adminEditIsLoading || adminCreateIsLoading}
          onOk={(data, resetFields) => {
            dispatch({
              type: isEdit === false ? 'admin/adminCreate' : 'admin/adminEdit',
              payload: {
                data: { ...data.admin },
                resetFields,
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'admin/closeForm',
            });
          }}
        >
          <AdminForm data={formData} />
        </MyModal>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
