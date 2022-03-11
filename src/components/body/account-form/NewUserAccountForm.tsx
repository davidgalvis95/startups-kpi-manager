import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Card from "../../../hoc/Card";
import classes from "./NewAccountForm.module.css";
import { RootState } from "../../../store/reducers/rootReducer";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import { StartUpType, UserDataType } from "../../../types/userPymeTypes";
import useFileUploadAxios from "../../../hooks/useFileUploadAxios";
import CustomSelectComp from "../../../hoc/dropdown-form-button/CustomSelectComp";
import UserWithoutPyme from "../../../types/UserWithoutPyme";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import RemoveButtonComp from "../../../hoc/remove-button/RemoveButtonComp";
import useUserAxios from "../../../hooks/useUserAxios";

const defaultUser: UserDataType = {
  id: "",
  firstName: "",
  lastName: "",
  cityOfResidence: "",
  countryOfResicence: "",
  address: "",
  //This was needed since the component is now nested
  photoUrl: "../../../assets/images/profile.png",
  phone: "",
  emailAddress: "",
  rights: "",
  pymeId: "",
};

interface NewUserAccountFormProps {
  pymes?: StartUpType[];
}

const NewUserAccountForm = () => {
  const { pymes } = useSelector((state: RootState) => state?.pymeReducer);
  const [firstName, setFirstName] = useState<string>(defaultUser.firstName);
  const [lastName, setLastName] = useState<string>(defaultUser.lastName);
  const [email, setEmail] = useState<string>(defaultUser.emailAddress);
  const [phone, setPhone] = useState<string>(defaultUser.phone);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [pymeImageUrl, setPymeImageUrl] = useState<string>(
    defaultUser.photoUrl
  );
  const [userImageUrl, setUserImageUrl] = useState<string>(
    defaultUser.photoUrl
  );
  const [pymesToDisplay, setPymesToDisplay] = useState<string[]>([]);
  const [pyme, setPyme] = useState<string>();
  var pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  const { userOperationLoading } = useSelector(
    (state: RootState) => state?.userReducer
  );

  const { uploadImagePointer } = useFileUploadAxios();
  const {
    createUserPointer,
    startUserOperationPointer: startOperationPointer,
  } = useUserAxios();

  const { isLoading, imageUrl } = useSelector(
    (state: RootState) => state?.pictureChangeReducer
  );

  useEffect(() => {
    setPymesToDisplay(pymes ? pymes.map((pyme) => pyme.name) : []);
  }, []);

  const uploadPhoto = (files: FileList | null): void => {
    if (files) {
      uploadImagePointer(files[0]);
    }
  };

  const changePymeValueHandler = (e: any) => {
    const newPymeId: string = pymes!
      .filter((pyme) => pyme.name === e.target.innerText)
      .map((pyme) => pyme.pymeId)[0];
    setPyme(newPymeId);
  };

  const saveData = (): void => {
    if (password === passwordConfirmation && pattern.test(password)) {
      const user: UserWithoutPyme = new UserWithoutPyme(
        {
          ...defaultUser,
          photoUrl: imageUrl || defaultUser.photoUrl,
          pymeId: pyme!,
        },
        firstName,
        lastName,
        "",
        "",
        "",
        phone,
        email,
        password
      );

      //TODO Validate all the fields
      createUserPointer(user);
      startOperationPointer();
      // //TODO send request to server
    } else {
      //TODO show this in a modal
      console.log("The password does not match!");
    }
  };

  const exitHandler = () => {
    //TODO handle exit
  };

  return (
    <Card width={80} padding={"1rem"}>
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.textWrapper}>
              <div className={classes.textInnerWrapper}>
                <label className={classes.title}>
                  Formulario de Registro: Usuario Nuevo
                </label>
                <p className={classes.warning}>
                  Por favor rellene todos los campos marcados con *
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <div className={classes.photoContainer}>
              {isLoading ? (
                <div className={classes.ldsSpinner}></div>
              ) : (
                <img
                  className={classes.profileImage}
                  src={!imageUrl ? pymeImageUrl : imageUrl}
                  width="100%"
                />
              )}
            </div>
            <div className={classes.imageUploadCont}>
              <div className={classes.fileInput}>
                <input
                  type="file"
                  id="file"
                  className={classes.file}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    uploadPhoto(event.target.files)
                  }
                />
                <label>
                  Cargar Foto
                  <p className={classes.fileName}></p>
                </label>
              </div>
            </div>
          </Grid>

          <Grid item xs={6} sm={6} md={6}>
            <div style={{ marginBottom: "30px" }}>
              <CustomSelectComp
                label={"Pyme a la que se inscribe el nuevo usuario *"}
                values={pymesToDisplay}
                click={(e: any) => changePymeValueHandler(e)}
              />
              <CustomInputComp
                label={"Nombres*"}
                placeholder={"Nombres"}
                value={firstName}
                change={(e: any) => setFirstName(e.target.value)}
              />
              <CustomInputComp
                label={"Apellidos*"}
                placeholder={"Apellidos"}
                value={lastName}
                change={(e: any) => setLastName(e.target.value)}
              />
              <CustomInputComp
                label={"Correo Electronico*"}
                placeholder={"Correo Electronico"}
                value={email}
                change={(e: any) => setEmail(e.target.value)}
              />
              <CustomInputComp
                label={"Telefono*"}
                placeholder={"Telefono"}
                value={phone}
                change={(e: any) => setPhone(e.target.value)}
              />
              <CustomInputComp
                label={"Contraseña*"}
                placeholder={"Contraseña"}
                value={password}
                change={(e: any) => setPassword(e.target.value)}
                type="password"
              />
              <CustomInputComp
                label={"Por Favor Confirme la Contraseña*"}
                placeholder={"Confirmacion"}
                value={passwordConfirmation}
                change={(e: any) => setPasswordConfirmation(e.target.value)}
                type="password"
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RemoveButtonComp name={"Salir"} click={exitHandler} />
          {userOperationLoading ? (
            <div className={classes.spinnerContainer}>
              <div className={classes.ldsSpinnerSmall}></div>
            </div>
          ) : (
            <AddButtonComp name={"Guardar Datos"} click={saveData} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewUserAccountForm;
