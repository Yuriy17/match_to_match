/* eslint-disable no-control-regex */
export const BootstrapType = {
  select: 'select',
  input: 'input',
  list: 'list',
};
export const State = {
  loggedOut: 'loggedOut',
  loggedIn: 'loggedIn',
  registered: 'registered',
};
export const Pages = {
  game: 'game',
  about: 'about',
  score: 'score',
  settings: 'settings',
};
export const patterns = {
  username:
    /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/,
  surname:
    /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/,
  // eslint-disable-next-line max-len
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
};
export const Popups = {
  success: 'success',
  error: 'error',
  info: 'info',
};

export const Icons = {
  faCog: 'fa-cog',
  faQuestion: 'fa-question',
  faSpinner: 'fa-spinner',
  faTrophy: 'fa-trophy',
  faWarehouse: 'fa-warehouse',
  faCheck: 'fa-check',
  faExclamationTriangle: 'fa-exclamation-triangle',
  faInfoCircle: 'fa-info-circle',
};
