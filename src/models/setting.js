import { message } from 'antd';
// import defaultSettings from '../defaultSettings';

let lessNodesAppended;
const updateTheme = primaryColor => {
  // Don't compile less in production!
  if (APP_TYPE !== 'site') {
    return;
  }
  // Determine if the component is remounted
  if (!primaryColor) {
    return;
  }
  const hideMessage = message.loading('正在编译主题！', 0);
  function buildIt() {
    if (!window.less) {
      return;
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor,
        })
        .then(() => {
          hideMessage();
        })
        .catch(() => {
          message.error('Failed to update theme');
          hideMessage();
        });
    }, 200);
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

const updateColorWeak = colorWeak => {
  document.body.className = colorWeak ? 'colorWeak' : '';
};

export default {
  namespace: 'setting',
  state: {
    primaryColor: '#1890FF', // primary color of ant design
    layout: 'sidemenu', // nav menu position: sidemenu or topmenu
    contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
    fixedHeader: true, // sticky header
    autoHideHeader: false, // auto hide header
    fixSiderbar: true, // sticky siderbar
  },
  reducers: {
    getSetting(state) {
      const setting = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      const { primaryColor, colorWeak } = setting;
      if (state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      updateColorWeak(colorWeak);
      return {
        ...state,
        ...setting,
      };
    },
  },
};
