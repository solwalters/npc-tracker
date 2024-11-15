import axios from "axios";
import Cookies from 'js-cookie';
import { getTokenFromLocalStorage } from '../lib/common';

const apiUrl = process.env.REACT_APP_API_PATH;

interface User {
  email: string;
  password: string;
}

interface World {
  worldName: string;
  worldOwner: number;
}

const localToken = getTokenFromLocalStorage();
const headers = {
  'Authorization': `Bearer ${localToken}`
}

// register the user service
export const registerUser = async (user: User) => {
  try {
    const response = await axios.post(`${apiUrl}user/register`, user);
    const token = await response.data.token;
    Cookies.set('token', token);
    return response.data;
  } catch (error) {
    return error;
  }
};

// login the user service
export const loginUser = async (user: User) => {
  try {
    const response = await axios.post(`${apiUrl}user/login`, user);
    const token = await response.data.token;
    Cookies.set('token', token);
    return response.data;
  } catch (error) {
    return error;
  }
};

// logout the user service
export const logoutUser = async () => {
  try {
    Cookies.remove('token');
    Cookies.remove('userId');
  } catch (error) {
    return error;
  }
};

// user get service
export const userGet = async () => {
  try {
    const response = await axios.get(`${apiUrl}user/get`, {headers: headers});
    Cookies.set('userId', response.data.user.id)
    return response;
  } catch (error) {
    return error;
  }
};

// create a world service
export const createWorld = async (world: World) => {
  try {
    const response = await axios.post(`${apiUrl}world/create`, world, {headers: headers});
    return response.data;
  } catch (error) {
    return error;
  }
}
