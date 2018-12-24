import React, { PureComponent } from 'react';
import styles from './index.less';

export default class CustomizeComponent extends PureComponent {
  render() {
    const { children } = this.props;
    return <div className={styles.pageTitle}>{children}</div>;
  }
}
