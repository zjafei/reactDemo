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
        <FormItem {...formItemLayout} label="录入日期">
          {getFieldDecorator('rfid.expiredAt', {
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
        <FormItem {...formItemLayout} label="烧录值">
          {getFieldDecorator('rfid.appKey', {
            initialValue: data.appKey,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写烧录值',
              },
            ],
          })(<Input placeholder="请填写烧录值" autoComplete="off" />)}
        </FormItem>
      </Form>
    );
  }
}
