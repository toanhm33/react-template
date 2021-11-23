import Request from '.';
const authorizedRequest = new Request();
const token = localStorage.getItem('TOKEN_NAME');

if (token) {
  authorizedRequest.setToken(token);
}

export default authorizedRequest;
