import { Form, Input } from 'antd';
import React, { PureComponent } from 'react';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 18 },
  },
};

export default class UserFormTest extends PureComponent {
  render() {
    const {
      data,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [
              {
                required: true,
                message: '必须填写姓名',
              },
            ],
          })(<Input placeholder="请填写姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="年龄">
          {getFieldDecorator('age', {
            initialValue: data.age,
            rules: [
              {
                required: true,
                message: '必须填写姓名',
              },
            ],
          })(<Input placeholder="请填写年龄" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="地址">
          {getFieldDecorator('address', {
            initialValue: data.address,
            rules: [
              {
                required: true,
                message: '必须填写地址',
              },
            ],
          })(<Input placeholder="请填写地址" />)}
        </FormItem>
      </Form>
    );
  }
}
