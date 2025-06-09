 export const CONFIG = {
  BASE_URL: 'https://foodnutrition-be-production.up.railway.app',
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

