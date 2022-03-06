import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import InputCustomField from "../../../hoc/InputCustomField";
import Card from "../../../hoc/Card";
import classes from "./NewAccountForm.module.css";
import CustomButton from "../../../hoc/CustomButton";
import { RootState } from "../../../store/reducers/rootReducer";

const NewAccountForm = () => {

  const saveCreatedAccount = () => {};

  return (
    <Card width={80} padding={"1rem"}>
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.textWrapper}>
              <div className={classes.textInnerWrapper}>
                <label className={classes.title}>
                  Formulario de Registro de Cuenta Nueva
                </label>
                <p className={classes.warning}>
                  Por favor rellene todos los campos marcados con *
                </p>
              </div>
            </div>

            <InputCustomField
              text={"Nit o Cedula*"}
              placeholder={"Ingrese la identificacion del la empresa"}
              width={"800px"}
            />
            <InputCustomField
              text={"Nombre de la empresa*"}
              placeholder={"Ingrese el nombre de la empresa"}
              width={"800px"}
            />
            <InputCustomField
              text={"Correo electronico*"}
              placeholder={"Ingrese el correo electronico de la empresa"}
              width={"800px"}
            />
            <InputCustomField
              text={"Telefono"}
              placeholder={"Ingrese el telefono de la empresa"}
              width={"800px"}
            />
            <InputCustomField
              text={"Contraseña*"}
              placeholder={"Ingrese la contraseña de la empresa"}
              width={"800px"}
            />
            <InputCustomField
              text={"Confirmacion de Contraseña*"}
              placeholder={"Confirme la contraseña de la empresa"}
              width={"800px"}
            />
          </Grid>
        </Grid>
        <div>
          <CustomButton
            clickHandler={() => saveCreatedAccount()}
            text={"Guardar Datos"}
            padding={"15px"}
            width={"150px"}
            fontSize={"15px"}
          />
        </div>
      </div>
    </Card>
  );
};

export default NewAccountForm;
