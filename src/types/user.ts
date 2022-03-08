export interface StartUpType {
  pymeId: string;
  active: boolean;
  name: string;
  city: string;
  country: string;
  address: string;
  emailAddress: string;
  photoUrl: string;
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
  rights: string[];
  pyme: StartUp;
}

class User implements UserDataType {
    
  id: string;
  firstName: string;
  lastName: string;
  cityOfResidence: string;
  countryOfResicence: string;
  address: string;
  photoUrl: string;
  phone: string;
  emailAddress: string;
  rights: string[];
  pyme: StartUp;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    cityOfResidence: string,
    countryOfResicence: string,
    address: string,
    photoUrl: string,
    phone: string,
    emailAddress: string,
    rights: string[],
    pymeId: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cityOfResidence = cityOfResidence;
    this.countryOfResicence = countryOfResicence;
    this.address = address;
    this.photoUrl = photoUrl;
    this.phone = phone;
    this.emailAddress = emailAddress;
    this.rights = rights;
    this.pyme = this.getStartUp(pymeId)
  }

  getStartUp(pymeId: string):StartUp{
    //   //Process the request dispatching request
    //   axios

    return new StartUp('1', true, 'CUBE VENTURES S.A.S', 'Bogota', 'Country', 'sdasdfsf', 'saddsfds@dsdsf.com', '');
  }
}

class StartUp implements StartUpType {
  pymeId: string;
  active: boolean;
  name: string;
  city: string;
  country: string;
  address: string;
  emailAddress: string;
  photoUrl: string;

  constructor(
    pymeId: string,
    active: boolean,
    name: string,
    city: string,
    country: string,
    address: string,
    emailAddress: string,
    photoUrl: string
  ) {
    this.pymeId = pymeId;
    this.active = active;
    this.name = name;
    this.city = city;
    this.country = country;
    this.address = address;
    this.emailAddress = emailAddress;
    this.photoUrl = photoUrl;
  }
}
