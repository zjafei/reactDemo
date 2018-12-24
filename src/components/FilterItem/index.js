import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const FilterItem = ({ style = {}, className = '', label = '', labelWidth = 70, children }) => {
  const filterItemClass = classNames(className, styles.filterItem);

  return (
    <div style={style} className={filterItemClass}>
      {label ? (
        <div style={{ width: labelWidth }} className={styles.label}>
          {label}
        </div>
      ) : null}

      <div className={styles.item}>{children || null}</div>
    </div>
  );
};

export default FilterItem;
