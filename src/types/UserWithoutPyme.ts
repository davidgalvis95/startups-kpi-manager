import { AccessRights } from "../components/body/profile/AccessRights";
import { UserDataType } from "./userPymeTypes";

class UserWithoutPyme implements UserDataType {
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
    password: string;
  
    constructor(
      userDataType: UserDataType,
      firstName: string,
      lastName: string,
      cityOfResidence: string,
      countryOfResicence: string,
      address: string,
      phone: string,
      email: string,
      password: string,
    ) {
      this.id = userDataType.id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.cityOfResidence = cityOfResidence;
      this.countryOfResicence = countryOfResicence;
      this.address = address;
      this.photoUrl = userDataType.photoUrl;
      this.phone = phone;
      this.emailAddress = email;
      this.rights = userDataType.rights;
      this.pymeId = userDataType.pymeId;
      this.password = password;
    }
  }
  
  export default UserWithoutPyme;