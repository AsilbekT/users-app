export const TOKEN_KEY = 'auth_token';

export const getLocalToken = () =>
  JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null');

export const saveLocalToken = (token) => {
  if (!token) localStorage.removeItem(TOKEN_KEY);
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};
