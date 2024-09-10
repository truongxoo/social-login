import { OAuthConfig } from "../config/configuration";
import { removeToken } from "./localStorageService";
import { useNavigate } from 'react-router-dom';

export const logOut = () => {
  removeToken();
};

export const redirectToGoogle = () => {
  const callbackUrl = OAuthConfig.redirectUri;
  const authUrl = OAuthConfig.googleAuthUri;
  const googleClientId = OAuthConfig.googleClientId;

  const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&state=google`;

  window.location.href = targetUrl;
};

export const redirectToFacebook = () => {
  const callbackUrl = OAuthConfig.redirectUri;
  const authUrl = OAuthConfig.facebookAuthUri;
  const facebookClientId = OAuthConfig.facebookClientId;

  const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_type=code&client_id=${facebookClientId}&scope=email,public_profile&state=facebook`;

  window.location.href = targetUrl;
};

export const redirectToGitHub = () => {
  const callbackUrl = OAuthConfig.redirectUri;
  const authUrl = OAuthConfig.githubAuthUri;
  const githubClientId = OAuthConfig.githubClientId;

  const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_type=code&client_id=${githubClientId}&scope=user:email&state=github`;

  window.location.href = targetUrl;
};

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const cleanUpFacebookRedirect = () => {
    const hash = window.location.hash;
    if (hash === '#_=_') {
      navigate(window.location.pathname, { replace: true });
    }
  };

  return { cleanUpFacebookRedirect };
};