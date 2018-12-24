import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './Login.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class Page extends PureComponent {
  render() {
    const {
      dispatch,
      submitting,
      form: { getFieldDecorator, validateFields, getFieldsValue },
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.loginCon}>
          <div className={styles.loginTitle}>后台管理会员登陆</div>
          <Form>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入账号',
                  },
                ],
              })(
                <Input
                  size="large"
                  autoComplete="off"
                  addonBefore={<Icon type="user" />}
                  placeholder="请输入账号"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
              })(
                <Input
                  size="large"
                  autoComplete="off"
                  type="password"
                  addonBefore={<Icon type="lock" />}
                  placeholder="请输入密码"
                />
              )}
            </FormItem>
            {/* <div>{getFieldDecorator('autoLogin', {})(<Checkbox>自动登陆</Checkbox>)}</div> */}
            <Button
              block
              type="primary"
              size="large"
              loading={submitting}
              onClick={() => {
                validateFields(errors => {
                  if (errors) {
                    return;
                  }
                  dispatch({
                    type: 'login/login',
                    payload: {
                      ...getFieldsValue(),
                    },
                  });
                });
              }}
              className={styles.submit}
            >
              登陆
            </Button>
          </Form>
        </div>
        <GlobalFooter className={styles.footer} />
      </div>
    );
  }
}

export default Page;
