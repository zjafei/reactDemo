export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

export const reducers = {
  overrideStateProps(state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  updateStateProps(state, { payload }) {
    const { name, value } = payload;
    return {
      ...state,
      ...{
        [name]: Array.isArray(state[name])
          ? [...state[name], ...value]
          : { ...state[name], ...value },
      },
    };
  },
};
