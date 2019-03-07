import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const auth = {
  current: () =>
    requests.get('/user'),
  login: (username, password) =>
    requests.post('/users/login', {
      user: {
        username,
        password
      }
    }),
  register: (newUser) =>
    requests.post('/users/register', { user: { ...newUser } }),
  save: (userId, updatedUser) =>
    requests.put(`/users/${userId}`, { user: { ...updatedUser } })
};

const tools = {
  index: () =>
    requests.get('/tools', { user: {} }),
  activeSurvey: (toolId) =>
    requests.get(`/tools/${toolId}/surveys?isActive=true`)
};

const surveys = {
  get: (surveyId) =>
    requests.get(`/surveys/${surveyId}`)
};

export default {
  auth,
  tools,
  surveys,
  setToken: _token => {
    token = _token;
  }
};
