import React, { useState } from "react";
import { Grid } from "@mui/material";
import InputCustomField from "../../../hoc/InputCustomField";
import classes from "./ProfileModifiableSection.module.css";
import { AiFillEdit } from "react-icons/ai";
import CustomButton from "../../../hoc/CustomButton";

const ProfileModifiableSection = () => {
  const [isInEditableMode, setIsInEditableMode] = useState<boolean>(true);

  const handleEdition = (): void => {
    setIsInEditableMode(!isInEditableMode);
  };

  return (
    <div>
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
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
          <InputCustomField
            text={"Nombre"}
            placeholder={"Ingrese su nombre"}
            width={"100%"}
          />
        </Grid>
      </Grid>
      {!isInEditableMode ? (
        <CustomButton
          clickHandler={() => handleEdition()}
          text={"Guardar Cambios"}
          padding={"8px"}
          width={"70px"}
          fontSize={"12px"}
        />
      ) : null}
    </div>
  );
};

export default ProfileModifiableSection;
