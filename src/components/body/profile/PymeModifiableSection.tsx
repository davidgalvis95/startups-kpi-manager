import React, { useState } from "react";
import { Grid } from "@mui/material";
import classes from "./ProfileModifiableSection.module.css";
import { StartUpType } from "../../../types/userPymeTypes";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import CustomCheckBoxComp from "../../../hoc/checkbox-button/CustomCheckBoxComp";
import { StartUp } from "../../../types/StartUp";
import { AccessRights } from "./AccessRights";
import { BiEdit } from "react-icons/bi";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducer";
import usePymeAxios from "../../../hooks/usePymeAxios";

interface PymeModifiableSectionProps {
  pymeData?: StartUpType;
  accessRights?: string;
  userId?: string;
}

const defaultPymeData = {
  pymeId: "",
  active: false,
  name: "",
  city: "",
  country: "",
  address: "",
  emailAddress: "",
  photoUrl: "",
  phone: "",
};

const PymeModifiableSection = ({
  pymeData = defaultPymeData,
  accessRights = "USER",
  userId,
}: PymeModifiableSectionProps) => {
  const [isInEditableMode, setIsInEditableMode] = useState<boolean>(false);
  const [name, setName] = useState<string>(pymeData?.name || "");
  const [active, setActive] = useState<boolean | undefined>(pymeData?.active);
  const [emailAddress, setEmailAddress] = useState<string>(
    pymeData?.emailAddress || ""
  );
  const [address, setAddress] = useState<string>(pymeData?.address || "");
  const [city, setCity] = useState<string>(pymeData?.city || "");
  const [country, setCountry] = useState<string>(pymeData?.country || "");
  const [phone, setPhone] = useState<string>(pymeData?.phone || "");
  const { pymeOperationLoading } = useSelector(
    (state: RootState) => state?.pymeReducer
  );

  const {
    updatePymePointer,
    startPymeOperationPointer: startOperationPointer,
  } = usePymeAxios();

  const handleEdition = (): void => {
    setIsInEditableMode(!isInEditableMode);
  };

  const saveData = (): void => {
    const startup: StartUpType = new StartUp(
      pymeData,
      name,
      city,
      country,
      address,
      emailAddress,
      phone
    );
    //TODO validate data
    console.log(startup);
    if (userId) {
      updatePymePointer(startup, userId);
      startOperationPointer();
    }

    handleEdition();
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className={classes.infoHeader}>
        <div className={classes.title}>
          {/* TODO set this to be dynamic */}
          <label>Informacion de la Start-Up</label>
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
              label={"Nombre de la Empresa"}
              placeholder={"Nombre de la Empresa"}
              value={name}
              change={(e: any) => setName(e.target.value)}
              disabled={!isInEditableMode}
            />
          </div>
        </Grid>
        {accessRights === AccessRights.ADMIN ? (
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.imageUploadCont}>
              <CustomCheckBoxComp
                name={"Activa?"}
                click={(e: any) => setActive(!active)}
                checked={active}
                labelBefore={false}
              />
            </div>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Ciudad"}
              placeholder={"Ciudad"}
              value={city}
              change={(e: any) => setCity(e.target.value)}
              disabled={!isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Direccion de la Empresa"}
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
              label={"Correo Electronico de la Empresa"}
              placeholder={"Correo Electronico"}
              value={emailAddress}
              change={(e: any) => setEmailAddress(e.target.value)}
              disabled={!isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Pais de Origen"}
              placeholder={"Pais de Origen"}
              value={country}
              change={(e: any) => setCountry(e.target.value)}
              disabled={!isInEditableMode}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.imageUploadCont}>
            <CustomInputComp
              label={"Telefono de la Empresa"}
              placeholder={"telefono de la Empresa"}
              value={phone}
              change={(e: any) => setPhone(e.target.value)}
              disabled={!isInEditableMode}
            />
          </div>
        </Grid>
      </Grid>
      {isInEditableMode || pymeOperationLoading ? (
        <div className={classes.imageUploadCont}>
          {pymeOperationLoading ? (
            <div className={classes.ldsSpinnerSmall}></div>
          ) : (
            <AddButtonComp name={"Guardar Datos"} click={saveData} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PymeModifiableSection;
