import React from 'react';
import { connect } from 'dva';
import dynamic from 'umi/dynamic';
import Redirect from 'umi/redirect';
import services from '@/services';

export default dynamic({
  async loader() {
    const response = await services.queryCurrentUser();
    if (response.code === 0) {
      for (let i = 0; i < response.result.auth.length; i++) {
        if (response.result.auth[i].authority === 'ROLE_admin') {
          return connect()(({ children }) => {
            return children;
          });
        }
      }
      window.localStorage.removeItem('xAuthToken');
      return () => <Redirect to="/account/login" />;
    } else {
      window.localStorage.removeItem('xAuthToken');
      return () => <Redirect to="/account/login" />;
    }
  },
});
