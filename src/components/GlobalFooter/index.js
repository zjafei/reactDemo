import React from 'react';
import { Icon } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, links }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {/* Copyright <Icon type="copyright" />2014-{moment().format('YYYY')}  */}
      <Icon type="copyright" /> 2014-
      {moment().format('YYYY')} 电子科技有限公司 苏ICP备88888888号-8
    </footer>
  );
};

export default GlobalFooter;
