import React, { PureComponent } from 'react';
import { Table } from 'antd';
import cssStyle from './style.less';

export default class TableList extends PureComponent {
  render() {
    const {
      dataSource,
      pagination,
      rowKey,
      header,
      paginationExtend,
      style,
      ...props
    } = this.props;
    const { pageSize = 10, current, total } = pagination || {};
    return (
      <div className={cssStyle.list} style={style}>
        {header ? <div className={cssStyle.header}>{header}</div> : null}
        <Table
          {...props}
          dataSource={dataSource}
          rowKey={rowKey || 'id'}
          pagination={
            pagination !== false
              ? Object.assign(
                  {
                    pageSize,
                    size: 'large',
                    showQuickJumper: true,
                    showSizeChanger: false,
                  },
                  pagination
                )
              : false
          }
        />
        {pagination !== false && dataSource.length > 0 ? (
          <div className={cssStyle.footer}>
            当前显示第 {(current - 1) * pageSize + 1} 到{' '}
            {(current - 1) * pageSize + dataSource.length} 条，共 {total} 条
          </div>
        ) : null}
      </div>
    );
  }
}
