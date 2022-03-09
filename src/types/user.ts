import { AccessRights } from "../components/body/profile/AccessRights";
import { StartUpType, UserDataType } from "./userPymeTypes";

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
    rights: AccessRights;
    pymeId: string;
    pyme: StartUpType;
  
    constructor(
      userDataType: UserDataType,
      firstName: string,
      lastName: string,
      cityOfResidence: string,
      countryOfResicence: string,
      address: string,
      phone: string,
    ) {
      this.id = userDataType.id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.cityOfResidence = cityOfResidence;
      this.countryOfResicence = countryOfResicence;
      this.address = address;
      this.photoUrl = userDataType.photoUrl;
      this.phone = phone;
      this.emailAddress = userDataType.emailAddress;
      this.rights = userDataType.rights;
      this.pyme = userDataType.pyme!;
      this.pymeId = userDataType.pymeId;
    }
  }
  
  export default User;