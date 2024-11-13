import axios from 'axios';
import Cookies from 'js-cookie';
import { userGet } from "../service/index.service"

export function getTokenFromLocalStorage() {
  return Cookies.get('token');
}

export function getUserId() {
  return Cookies.get('userId');
}

const backendRoot = "http://localhost:3000/"

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await userGet();
    const { authenticated = false } = response.data;
    return authenticated ? response.data : false;
  }
  catch (err) {
    console.error('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export async function apiRequest(apiRoute, method="GET", body={}) {
  const defaultReturnObject = {}
  if (apiRoute === undefined){
    console.error('undefined api route. pass the route in apiRequest()');
    return defaultReturnObject;
  }
  try {
    const token = getTokenFromLocalStorage();
    let headers = {}
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios({
      method: method,
      url: backendRoot + apiRoute,
      headers: headers,
      data: body
    });
    console.log('apiRequest response: ', response.data)
    return response.data;
  }
  catch (err) {
    console.error('apiRequest to ' + apiRoute + ', Something Went Wrong. Did you add a /?', err);
    return defaultReturnObject;
  }
}