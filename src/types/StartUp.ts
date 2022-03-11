import { StartUpType } from "./userPymeTypes";

export class StartUp implements StartUpType {
  pymeId: string;
  active: boolean;
  name: string;
  city: string;
  country: string;
  address: string;
  emailAddress: string;
  photoUrl?: string;
  phone: string;

  constructor(
    pymeData: StartUpType,
    name: string,
    city: string,
    country: string,
    address: string,
    emailAddress: string,
    phone: string
  ) {
    this.pymeId = pymeData.pymeId;
    this.active = pymeData.active;
    this.name = name;
    this.city = city;
    this.country = country;
    this.address = address;
    this.emailAddress = emailAddress;
    this.photoUrl = pymeData.photoUrl;
    this.phone = phone;
  }
}
