import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Card from "../../../hoc/Card";
import classes from "./NewAccountForm.module.css";
import { RootState } from "../../../store/reducers/rootReducer";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import { StartUpType } from "../../../types/userPymeTypes";
import useFileUploadAxios from "../../../hooks/useFileUploadAxios";
import { StartUp } from "../../../types/StartUp";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import RemoveButtonComp from "../../../hoc/remove-button/RemoveButtonComp";
import usePymeAxios from "../../../hooks/usePymeAxios";

const defaultPyme: StartUpType = {
  pymeId: "",
  active: true,
  name: "",
  city: "",
  country: "",
  address: "",
  emailAddress: "",
  photoUrl: "../../assets/images/factory.jpeg",
  phone: "",
};

const NewPymeAccountForm = () => {
  const [nationalId, setNationalId] = useState<string>(defaultPyme.pymeId);
  const [name, setName] = useState<string>(defaultPyme.name);
  const [email, setEmail] = useState<string>(defaultPyme.emailAddress);
  const [phone, setPhone] = useState<string>(defaultPyme.phone);
  const [pymeImageUrl, setPymeImageUrl] = useState<string>(
    defaultPyme.photoUrl!
  );

  const { isLoading, imageUrl } = useSelector(
    (state: RootState) => state?.pictureChangeReducer
  );

  const { pymeOperationLoading } = useSelector(
    (state: RootState) => state?.pymeReducer
  );

  const { user } = useSelector((state: RootState) => state?.userReducer);

  const { uploadImagePointer } = useFileUploadAxios();
  const { createPymePointer, startPymeOperationPointer } = usePymeAxios();

  const uploadPhoto = (files: FileList | null): void => {
    if (files) {
      uploadImagePointer(files[0]);
    }
  };

  const saveData = (): void => {
    const startup: StartUpType = new StartUp(
      //The id is set by the backend
      { ...defaultPyme, photoUrl: imageUrl },
      name,
      "",
      "",
      "",
      email,
      phone
    );
    //TODO Validate all the fields
    if (user) {
      startPymeOperationPointer();
      createPymePointer(startup, user.id);
    }
  };

  const exitHandler = (): void => {
    //TODO implement this exit handler
  };

  return (
    <Card width={80} padding={"1rem"}>
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.textWrapper}>
              <div className={classes.textInnerWrapper}>
                <label className={classes.title}>
                  Formulario de Registro: Cuenta Empresarial Nueva
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
                  src={imageUrl ? imageUrl : pymeImageUrl}
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
              <CustomInputComp
                label={"Nit o Cedula*"}
                placeholder={"Nit o Cedula"}
                value={nationalId}
                change={(e: any) => setNationalId(e.target.value)}
              />
              <CustomInputComp
                label={"Nombre de la empresa*"}
                placeholder={"Nit o Cedula"}
                value={name}
                change={(e: any) => setName(e.target.value)}
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
            </div>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RemoveButtonComp name={"Salir"} click={exitHandler} />
          {pymeOperationLoading ? (
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

export default NewPymeAccountForm;
