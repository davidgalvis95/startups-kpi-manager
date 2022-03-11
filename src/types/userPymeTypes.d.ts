export interface StartUpType {
  pymeId: string;
  active: boolean;
  name: string;
  city: string;
  country: string;
  address: string;
  emailAddress: string;
  photoUrl?: string;
  phone: string;
}

export interface UserDataType {
  id: string;
  firstName: string;
  lastName: string;
  cityOfResidence: string;
  countryOfResicence: string;
  address: string;
  photoUrl: string;
  phone: string;
  emailAddress: string;
  rights: AccessRights;
  pymeId: string;
  pyme?: StartUp;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  email: string;
  userId?: string;
  valid: boolean;
}
