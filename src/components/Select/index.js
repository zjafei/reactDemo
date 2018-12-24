import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select } from 'antd';

const { Option } = Select;

@connect(({ global, loading }) => ({
  global,
  loading,
}))
class CustomizeComponent extends PureComponent {
  componentDidMount() {
    const { data, type, dispatch } = this.props;

    if (Array.isArray(data) === false) {
      dispatch({ type: 'global/getSelectData', payload: type });
    }
  }

  render() {
    const {
      data,
      type,
      hasAll,
      global: { selectList },
      loading,
      ...props
    } = this.props;

    // 有本地数据走本地数据
    let dataList = [];
    if (Array.isArray(data) === true) {
      dataList = [...data];
    } else if (selectList[type] !== undefined) {
      dataList = [...selectList[type]];
    }
    // const dataList = Array.isArray(data) === true ? [...data] : [...selectList[type]];

    // 是否添加 全部 选项
    if (hasAll !== false && hasAll !== undefined) {
      dataList.unshift({
        itemCode: null,
        itemName: '全部',
      });
    }

    return (
      <Select {...props}>
        {dataList.map(row => {
          return (
            <Option value={row.itemCode} key={row.itemCode}>
              {row.itemName}
            </Option>
          );
        })}
      </Select>
    );
  }
}

export default CustomizeComponent;
