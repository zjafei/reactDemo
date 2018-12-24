import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Page extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <h1>LicenseDownload</h1>
        <button
          type="button"
          onClick={() => {
            router.push({
              pathname: '/license/license/list',
            });
          }}
        >
          list
        </button>
        <button
          type="button"
          onClick={() => {
            router.push({
              pathname: '/license/license/download',
            });
          }}
        >
          down
        </button>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
