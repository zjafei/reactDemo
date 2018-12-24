import { Form, Input, DatePicker } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';

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
        <FormItem {...formItemLayout} label="APP_KEY">
          {getFieldDecorator('app.appKey', {
            initialValue: data.appKey,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写APP KEY',
              },
            ],
          })(<Input placeholder="请填写APP KEY" autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密钥">
          {getFieldDecorator('app.secret', {
            initialValue: data.secret,
            rules: [
              {
                required: true,
                message: '请填写密钥',
              },
            ],
          })(<Input placeholder="请填写密钥" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="到期日期">
          {getFieldDecorator('app.expiredAt', {
            initialValue: data.expiredAt,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <DatePicker
              style={{ width: '100%' }}
              allowClear={false}
              disabledDate={current => {
                return current && current.valueOf() < moment().subtract(1, 'days');
              }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {getFieldDecorator('app.description', {
            initialValue: data.description,
            rules: [
              {
                whitespace: true,
                message: '请填写正确的描述',
              },
            ],
          })(<Input placeholder="请填写描述" autoComplete="off" />)}
        </FormItem>
      </Form>
    );
  }
}
