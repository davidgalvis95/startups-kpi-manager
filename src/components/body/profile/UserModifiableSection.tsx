import React, { useState } from "react";
import { Grid } from "@mui/material";
import classes from "./ProfileModifiableSection.module.css";
import { AiFillEdit } from "react-icons/ai";
import { StartUpType, UserDataType } from "../../../types/userTypes";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import User from "../../../types/User";

interface UserModifiableSectionProps {
  userData: UserDataType;
}

const UserModifiableSection = ({
  userData,
}: UserModifiableSectionProps) => {
  const [isInEditableMode, setIsInEditableMode] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>(userData?.firstName || "");
  const [lastName, setLastName] = useState<string>(userData?.lastName || "");
  const [cityOfResidence, setCityOfResidence] = useState<string>(
    userData?.cityOfResidence || ""
  );
  const [countryOfResicence, setcountryOfResidence] = useState<string>(
    userData?.countryOfResicence || ""
  );
  const [address, setAddress] = useState<string>(userData?.address || "");
  const [phone, setPhone] = useState<string>(userData?.phone || "");

  const saveData = (): void => {
    const newUser: UserDataType = new User(
      userData,
      firstName,
      lastName,
      cityOfResidence,
      countryOfResicence,
      address,
      phone
    );
    console.log(newUser);
    //TODO send request to server
    handleEdition();
  };

  const handleEdition = (): void => {
    setIsInEditableMode(!isInEditableMode);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className={classes.infoHeader}>
        <div className={classes.title}>
          {/* TODO set this to be dynamic */}
          <label>Informacion del Usuario</label>
        </div>
        <div className={classes.title}>
          {isInEditableMode ? (
            <div onClick={() => handleEdition()}>
              <AiFillEdit />
            </div>
          ) : null}
        </div>
      </div>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Nombre"}
              placeholder={"Nombre"}
              value={firstName}
              change={(e: any) => setFirstName(e.target.value)}
              disabled={isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Apellido"}
              placeholder={"Apellido"}
              value={lastName}
              change={(e: any) => setLastName(e.target.value)}
              disabled={isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Ciudad de Residencia"}
              placeholder={"Nombre del usuario"}
              value={cityOfResidence}
              change={(e: any) => setCityOfResidence(e.target.value)}
              disabled={isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Direccion"}
              placeholder={"Direccion"}
              value={address}
              change={(e: any) => setAddress(e.target.value)}
              disabled={isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Telefono"}
              placeholder={"Telefono"}
              value={phone}
              change={(e: any) => setPhone(e.target.value)}
              disabled={isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Pais de Residencia"}
              placeholder={"Pais de Residencia"}
              value={countryOfResicence}
              change={(e: any) => setcountryOfResidence(e.target.value)}
              disabled={isInEditableMode}
            />
          </div>
        </Grid>
      </Grid>
      {!isInEditableMode ? (
        <div className={classes.imageUploadCont} onClick={() => saveData()}>
          <div className={classes.fileInput}>
            <input type="text" id="file" className={classes.file} />
            <label>
              Guardar Datos
              <p className={classes.fileName}></p>
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserModifiableSection;
