/* eslint-disable */
import { create } from 'node:domain';
import { AuthCodeRequest } from '../models/auth';
import { HttpResponse } from '../models/http';
import { PasswordCreationRequest, UserInformation } from '../models/user';
import axiosClient, { handleRequest } from './axiosClient';
import config from './config.json';

const userApi = {
  authenticate: (body: AuthCodeRequest): Promise<HttpResponse<any>> => {
    const url = config.apiBaseUrl.user + `/exchange-token`;
    return handleRequest(axiosClient.get(url));
  },
  getUserDetail: (): Promise<HttpResponse<UserInformation>> => {
    const url = config.apiBaseUrl.user + `/me`;
    return handleRequest(axiosClient.get(url));
  },
  createNewPassword: (body: PasswordCreationRequest): Promise<HttpResponse<void>> => {
    const url = config.apiBaseUrl.user + `/create-password`;
    return handleRequest(axiosClient.post(url, body));
  },
  updateUserProfile: (body: UserInformation) => {
    const url = config.apiBaseUrl.user + `/update`;
    return handleRequest(axiosClient.put(url, body));
  },
  userNews: () => {
    const url = "https://newsapi.org/v2/top-headlines";
    return handleRequest(axiosClient.get(url,{params: {
      category: 'technology',
      apiKey: '8d2f24006c5f4a78bebafca09d0dfc32'  
    }}));
  },

};

export default userApi;
