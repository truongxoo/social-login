export const KEY_TOKEN = "accessToken";
export const RF_TOKEN = "refreshToken";
export const HINT = "hint";


export const setToken = (token: string) => {
  localStorage.setItem(KEY_TOKEN, token);
};

export const setHint = (hint: string) => {
  localStorage.setItem(HINT, hint);
};

export const setRefreshToken = (refToken: string) => {
  localStorage.setItem(RF_TOKEN, refToken);
};

export const getHint = () => {
  return localStorage.getItem(HINT);
};

export const getToken = () => {
  return localStorage.getItem(KEY_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(RF_TOKEN);
};

export const removeToken = () => {
   localStorage.removeItem(KEY_TOKEN);
   localStorage.removeItem(RF_TOKEN);
   localStorage.removeItem(HINT);
};
