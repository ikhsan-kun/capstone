 export const CONFIG = {
  BASE_URL: 'http://localhost:3000',
};
export const TOKEN_KEY = 'nutriai_token';

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

