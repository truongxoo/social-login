/* eslint-disable */
const getPath = (path: string) => `/assets/${path}`;

const imageCollection: {
  [key: string]: string;
} = {
  logo: getPath('images/logo.png'),
  google: getPath('images/google.png'),
  facebook: getPath('images/facebook.png'),
  github: getPath('images/github.png'),
  new1: getPath('images/news-1.jpg'),
  new2: getPath('images/news-2.jpg'),
  new3: getPath('images/news-3.jpg'),
  new4: getPath('images/news-4.jpg'),
};


export  {imageCollection};
