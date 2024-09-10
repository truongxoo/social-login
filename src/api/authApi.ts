/* eslint-disable */
import { LoginInformation } from '../models';
import { AuthCodeRequest, AuthResponse, RefreshTokenRequest } from '../models/auth';
import { HttpResponse } from '../models/http';
import axiosClient, { handleRequest } from './axiosClient';
import config from './config.json';

const authApi = {
  login: (body: LoginInformation): Promise<HttpResponse<AuthResponse>> => {
    const url = config.apiBaseUrl.auth + `/token`;
    return handleRequest(axiosClient.post(url, body));
  },
  logout: (): Promise<HttpResponse<any>> => {
    const url =  config.apiBaseUrl.auth + `/logout`;
    return handleRequest(axiosClient.post(url));
  },
  authenticateByCredential: (body: AuthCodeRequest): Promise<HttpResponse<any>> => {
    const url = config.apiBaseUrl.auth + `/exchange-token`;
    return handleRequest(axiosClient.post(url, body));
  },
  authenticateByIdentityProvider: (code: string, provider: string): Promise<HttpResponse<AuthResponse>> => {
    const url = config.apiBaseUrl.auth + `/outbound/authentication`;
    return handleRequest(axiosClient.post(url,null, { params: { code, provider } }));
  },
  refreshToken: (body: RefreshTokenRequest): Promise<HttpResponse<AuthResponse>> => {
    const url = config.apiBaseUrl.auth + `/refresh-token`;
    return handleRequest(axiosClient.post(url, body));
  }
};

export default authApi;