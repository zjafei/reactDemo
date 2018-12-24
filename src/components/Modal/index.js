import React, { cloneElement, PureComponent } from 'react';
import { Modal, Form } from 'antd';

function renderChildren(props) {
  if (Array.isArray(props.children) === true || props.children.type === undefined) {
    return props.children;
  } else {
    return cloneElement(props.children, {
      form: props.form,
      ...props.children.props,
    });
  }
}

@Form.create()
class CustomizeComponent extends PureComponent {
  render() {
    const { onClose, onOk, form, ...props } = this.props;
    const { resetFields, getFieldsValue, validateFields } = form;
    return (
      <Modal
        maskClosable={false}
        keyboard={false}
        {...props}
        onOk={() => {
          validateFields(errors => {
            if (errors) {
              return;
            }
            onOk(
              {
                ...getFieldsValue(),
              },
              resetFields
            );
          });
        }}
        onCancel={() => {
          resetFields();
          onClose();
        }}
      >
        {renderChildren(this.props)}
      </Modal>
    );
  }
}
export default CustomizeComponent;
