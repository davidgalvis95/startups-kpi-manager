import React, { useState } from "react";
import { Grid } from "@mui/material";
import classes from "./ProfileModifiableSection.module.css";
import { BiEdit } from "react-icons/bi";
import { UserDataType } from "../../../types/userPymeTypes";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import User from "../../../types/User";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducer";
import useUserAxios from "../../../hooks/useUserAxios";

interface UserModifiableSectionProps {
  userData: UserDataType;
}

const UserModifiableSection = ({ userData }: UserModifiableSectionProps) => {
  const [isInEditableMode, setIsInEditableMode] = useState<boolean>(false);
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
  const { userOperationLoading } = useSelector(
    (state: RootState) => state?.userReducer
  );

  const { updateUserPointer, startUserOperationPointer } = useUserAxios();

  const saveData = (): void => {
    const newUser: User = new User(
      userData,
      firstName,
      lastName,
      cityOfResidence,
      countryOfResicence,
      address,
      phone
    );
    //TODO validate data
    // console.log(newUser);
    updateUserPointer(newUser);
    startUserOperationPointer();
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
          {!isInEditableMode ? (
            <div onClick={() => handleEdition()}>
              <BiEdit cursor={"pointer"} />
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
              disabled={!isInEditableMode}
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
              disabled={!isInEditableMode}
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
              disabled={!isInEditableMode}
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
              disabled={!isInEditableMode}
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
              disabled={!isInEditableMode}
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
              disabled={!isInEditableMode}
            />
          </div>
        </Grid>
      </Grid>
      {isInEditableMode || userOperationLoading ? (
        <div className={classes.imageUploadCont}>
          {userOperationLoading ? (
            <div className={classes.ldsSpinnerSmall}></div>
          ) : (
            <AddButtonComp name={"Guardar Datos"} click={saveData} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserModifiableSection;
