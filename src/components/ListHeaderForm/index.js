import React, { PureComponent } from 'react';
import styles from './style.less';

export default class CustomizeComponent extends PureComponent {
  render() {
    const { children } = this.props;
    return <div className={styles.tableListForm}>{children}</div>;
  }
}
