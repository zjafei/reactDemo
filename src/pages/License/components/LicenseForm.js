import { Form, Input } from 'antd';
import React, { PureComponent } from 'react';

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
      // data,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="车牌数量">
          {getFieldDecorator('license.count', {
            // initialValue: data.count,
            rules: [
              {
                required: true,
                message: '请填写车牌数量',
              },
            ],
          })(<Input placeholder="请填写车牌数量" autoComplete="off" />)}
        </FormItem>
      </Form>
    );
  }
}
