import CONFIG from '../config';

const ENDPOINTS = {
  LOGIN: `${CONFIG.BASE_URL}/auth/login`,
  REGISTER: `${CONFIG.BASE_URL}/auth/register`,
  ADDFEEDBACK: `${CONFIG.BASE_URL}/feedback`,
  GETFEEDBACK: `${CONFIG.BASE_URL}/all/feedback`,
};

// Login user
export async function loginUser(credentials) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return await response.json();
}

// Register user
export async function registerUser(data) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function fetchAllFeedback(token) {
  const response = await fetch(ENDPOINTS.GETFEEDBACK, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
}

export async function postFeedback(token, { message, rating }) {
  const response = await fetch(ENDPOINTS.ADDFEEDBACK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ message, rating })
  });
  return await response.json();
}

