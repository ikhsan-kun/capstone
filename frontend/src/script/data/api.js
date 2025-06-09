import {CONFIG} from '../config';
import { getAccessToken } from '../utils/auth';

const ENDPOINTS = {
  LOGIN: `${CONFIG.BASE_URL}/auth/login`,
  REGISTER: `${CONFIG.BASE_URL}/auth/register`,
  ADDFEEDBACK: `${CONFIG.BASE_URL}/feedback`,
  GETFEEDBACK: `${CONFIG.BASE_URL}/all/feedback`,
  GETPROFILE: `${CONFIG.BASE_URL}/profile`,
  NUTRITION: `${CONFIG.BASE_URL}/analyze`,
  GETHISTORY: `${CONFIG.BASE_URL}/history` 
};

export async function fetchProfile(token) {
  const res = await fetch(ENDPOINTS.GETPROFILE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

// Login user
export async function loginUser(credentials) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
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

export async function analyzeFoodImage(file, saveHistory = true) {
  const token = getAccessToken();
  const formData = new FormData();  
  formData.append("file", file);
  formData.append("save", saveHistory ? "true" : "false");

  const res = await fetch(`${CONFIG.BASE_URL}/analyze`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return await res.json();
}

export async function fetchUserHistory() {
  const token = getAccessToken();
  const res = await fetch(`${CONFIG.BASE_URL}/history`, {
    method: 'GET',
    headers: { 
      Authorization: `Bearer ${token}` 
    },
  });
  return await res.json();
}