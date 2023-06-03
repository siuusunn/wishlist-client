import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allTracks: `${process.env.REACT_APP_BASE_URL}/api/tracks/`,
  singleTrack: (pk) => `${process.env.REACT_APP_BASE_URL}/api/items/${pk}`,
  allArtists: `${process.env.REACT_APP_BASE_URL}/api/artists/`,
  singleArtist: (pk) => `/api/artists/${pk}`,
  allWishlists: `${process.env.REACT_APP_BASE_URL}/api/users/`,
  singleWishlist: (pk) => `${process.env.REACT_APP_BASE_URL}/api/users/${pk}`,
  login: `http://localhost:8000/api/users/login/`,
  register: `${process.env.REACT_APP_BASE_URL}/api/users/register/`
};

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${AUTH.getToken()}` }
});

export const API = { ENDPOINTS, GET, POST, PUT, DELETE, getHeaders };
