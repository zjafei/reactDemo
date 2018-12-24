import { Form, Input } from 'antd';
import React, { PureComponent } from 'react';
import Select from '@/components/Select';
import dict from '@/utils/dict';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    md: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 20 },
  },
};

export default class CustomizeComponent extends PureComponent {
  render() {
    const {
      data,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="账户名">
          {getFieldDecorator('officer.username', {
            initialValue: data.username,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写账户名',
              },
            ],
          })(<Input placeholder="请填写账户名" autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('officer.password', {
            initialValue: data.password,
            rules: [
              {
                required: data.password === '',
                message: '请填写密码',
              },
            ],
          })(
            <Input
              type="password"
              placeholder={data.password === '' ? '请填写密码' : '不修改密码留空'}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="权限等级">
          {getFieldDecorator('officer.type', {
            initialValue: data.type,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              data={Object.keys(dict.officerType).map(key => {
                return { itemCode: key, itemName: dict.officerType[key] };
              })}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}
