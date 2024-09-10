export interface UserInformation {
    userId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    dob: string;
    viaSocial:boolean;
}

export interface LoginInformation {
    email: string;
    password: string;
  }
  
  export interface RegistrationInfomation {
    email: string;
    password: string;
    phone: string;
    countryCode: string;
    fullname: string;
    userTypeEnum: string;
    dialCode: string;
  }
  export interface PasswordCreationRequest {
    password: string;
  }
