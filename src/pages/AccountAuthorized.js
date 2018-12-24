import React from 'react';
import Redirect from 'umi/redirect';

export default ({ children }) =>
  window.localStorage.getItem('xAuthToken') ? <Redirect to="/" /> : children;
