export const constants = {
  access_token: 'access_token',
  refresh_token: 'refresh_token'
};

const apiurl = 'http://localhost:4000';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/login`,
    logout: `${apiurl}/logout`,
    profile: `${apiurl}/profile`,
    refresh: `${apiurl}/refresh-token`,
    products: `${apiurl}/products`,
  },
};
