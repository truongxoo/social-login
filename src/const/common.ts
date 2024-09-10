/* eslint-disable */
export const EMAIL_REGEX =
  /^(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)@(?:[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,3})$/;

export const PASSWORD_REGEX =
  /^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#^,.<>?/~`;:"'+=_()\-\[\]\/\\\|\^\$\*\+\(\)\{\}]).{8,20}$/;

export const PHONE_NUMBER_REGEX = /^\d{8,15}$/;

export const FULLNAME_REGEX = /^(?!.* $)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

export const OTP_REGEX = /^\d*$/;

export const POSTALZIP_REGEX = /^[a-zA-Z0-9]+$/;

export const NUMBER = /^[0-9]+$/;

export const PASSWORD_REGEX_UPPERCASE = /[A-Z]/;
export const PASSWORD_REGEX_LOWCASE = /[a-z]/;
export const PASSWORD_REGEX_NUMBER = /[0-9]/;
export const PASSWORD_REGEX_SPECIAL = /[!@#$%^&*(),.?":{}|<>~_\-=\+;'`/\\\[\]\(\)\{\}\|\^\$\*\+\?\!\&]/;
export const PASSWORD_REGEX_NOSPACES = /\s/;

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_FORMAT_2 = 'DD/MM/YY';
export const DATE_FORMAT_1 = 'DD/MM';
export const DATE_FORMAT_3 = 'DD-MM-YYYY';
export const NO_WHITESPACE = /[^\s]/g;

export const MONTH_FORMAT = 'MM/YY';

export const TIME_FORMAT = 'hh:mm A';
export const TIME_FORMAT_1 = 'HH:mm:ss';
export const TIME_FORMAT_2 = 'HH:mm';

export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const DATE_TIME_FORMAT_2 = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_FORMAT_3 = 'DD/MM/YYYY HH:mm';
export const DATE_TIME_FORMAT_4 = 'DD-MM-YYYY HH:mm:ss';
export const DATE_TIME_FORMAT_5 = 'DD-MM-YYYY HH:mm:ss A';

export const TRACK_BOOKING_STATUS = {
  PLACED: 'PLACED',
  CONFIRMED: 'CONFIRMED',
  ON_THE_WAY: 'ON_THE_WAY',
  REACHED: 'REACHED',
  DONE: 'DONE',
};

export const BOOKING_STATUS = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
}

export const MAX_SIZE_IMAGE = 5242880;

export const MAX_LENGTH = {
  GENERAL: 50,
  EMAIL: 50,
  PASSWORD: 20,
  FULLNAME: 50,
  TWOFA: 6,
  REFERRAL_CODE: 15,
  OTP: 6,
  TEXT_AREA: 500,
  WITHDRAW_ADDRESS_LABEL: 100,
  PHONE: 15,
  ADDRESS: 255,
  POSTALZIP: 20,
  NOTE: 1000,
  EXPERIENCE: 2
};

export const MIN_LENGTH = {
  PASSWORD: 8,
  PHONE: 8,
};




export const ROLE = {
  CONSUMER: "CONSUMER",
  PROVIDER: "PROVIDER",
}

export const MESSAGE_STATUS = {
  SENT: "SENT",
  RECEIVED: "RECEIVED",
  SEEN:  "SEEN",
  SENDING: "SENDING",
};

export const USER_STATUS = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

export const FILE_TYPE = {
  IMAGE: "IMAGE",
  DOCUMENT: "DOCUMENT",
  PDF: "PDF",
  EXCEL: "EXCEL",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  UNKNOWN: "UNKNOWN",
};

export const CHAT_LIMIT = {
  CONVERSATION: 10,
  MESSAGE: 40,
  LOAD_MORE: 20,
}; 

export const ERROR = {
  DEFAULT:"Error when loading data. Try again",
  FILE_TYPE:"FILE_TYPE",
  FILE_SIZE:"FILE_SIZE"
}


export const pageSizeDefault = 10; 
export const sliderSizeDefault = 4; 
export const totalElementDefault = 20; 
export const offsetDefault = 0; 
