import { Grid } from "@mui/material";
import Card from "../../../hoc/Card";
import classes from "./CreateNewKpi.module.css";
import CustomSelectComp from "../../../hoc/dropdown-form-button/CustomSelectComp";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import CustomCheckBoxComp from "../../../hoc/checkbox-button/CustomCheckBoxComp";
import RemoveButtonComp from "../../../hoc/remove-button/RemoveButtonComp";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";

const CreateNewKpi = (props: any) => {
  const newKpiVariablesValues = [
    "Fecha (Ejemplo: ene-2022, feb-2022)",
    "Texto (Ejemplo: Negro, Gris, Blanco)",
    "Numero (Ejemplo: 1000, 10000, 100000)",
  ];

  const attributeNames = ["Fecha", "Texto", "Numero", "Fecha2"];
  const kpiUnd = "USD";
  const months = [
    "ene",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
  ];

  const years = [
    "2021",
    "2022",
    "2023",
  ];

  const kpiNames = ['Ventas', 'Eempleados', 'Margen Neto'];

  const variables = ['Bogota', 'Medellin', 'Cartagena', 'Cali']

  return (
    <div>
      <Card width={90} padding={"1rem"}>
        <div>
          <div className={classes.title}>
            <p>Creacion del KPI</p>
          </div>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={"Nombre del kpi (Ejemplo: Ventas) *"}
                placeholder={"Nombre del KPI"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={"Unidad de medicion del KPI (Ejemplo: USD, kg, km) *"}
                placeholder={"Unidad de medicion"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Tipo de variable comparativa *"}
                values={newKpiVariablesValues}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <p className={classes.textBoxLabel}>
                Seleccione el de graficos que quiere para su KPI *
              </p>
              <div className={classes.chackBoxWrapperParent}>
                <CustomCheckBoxComp labelBefore={false} name={"Barras"} />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Barras Agrupadas"}
                />
                <CustomCheckBoxComp labelBefore={false} name={"Anillo"} />
                <CustomCheckBoxComp labelBefore={false} name={"Linea"} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div
                className={`${classes.chackBoxWrapperParent} ${classes.margined}`}
              >
                <CustomCheckBoxComp
                  labelBefore={true}
                  name={"Tiene Atributos"}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={
                  "Nombre del subgrupo de atributos (Ej: Tipo de Contrato)"
                }
                placeholder={"Nombre del subgrupo de atributos"}
              />
            </Grid>
          </Grid>
          {/* Create attribute component */}
          <div>
            <div className={classes.title}>
              <p>Creacion de Atributos</p>
            </div>
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <CustomInputComp
                  label={"Nombre del atributo (Ej: Ventas Online)"}
                  placeholder={"Nombre del atributo"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className={classes.buttonsWrapper}>
                  <RemoveButtonComp name={"Quitar"} />
                  <AddButtonComp name={"Nuevo Atributo"} />
                </div>
              </Grid>
            </Grid>
          </div>
          {/* Create attribute component */}

          <div className={classes.saveButtonWrapper}>
            <AddButtonComp name={"Guardar Datos"} />
          </div>
        </div>
      </Card>

      <Card width={90} padding={"1rem"}>
        <div>
          <div className={classes.title}>
            <p>Actualizacion de KPI</p>
          </div>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={"Nombre del kpi (Ejemplo: Ventas) *"}
                placeholder={"Nombre del KPI"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={"Unidad de medicion del KPI (Ejemplo: USD, kg, km) *"}
                placeholder={"Unidad de medicion"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Tipo de variable comparativa *"}
                values={newKpiVariablesValues}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <p className={classes.textBoxLabel}>
                Seleccione el de graficos que quiere para su KPI *
              </p>
              <div className={classes.chackBoxWrapperParent}>
                <CustomCheckBoxComp labelBefore={false} name={"Barras"} />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Barras Agrupadas"}
                />
                <CustomCheckBoxComp labelBefore={false} name={"Anillo"} />
                <CustomCheckBoxComp labelBefore={false} name={"Linea"} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div
                className={`${classes.chackBoxWrapperParent} ${classes.margined}`}
              >
                <CustomCheckBoxComp
                  labelBefore={true}
                  name={"Tiene Atributos"}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={
                  "Nombre del subgrupo de atributos (Ej: Tipo de Contrato)"
                }
                placeholder={"Nombre del subgrupo de atributos"}
              />
            </Grid>
          </Grid>
          {/* Create attribute component */}
          <div>
            <div className={classes.title}>
              <p>Actualizacion de Atributos</p>
            </div>
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <CustomInputComp
                  label={"Nombre del atributo (Ej: Ventas Online)"}
                  placeholder={"Nombre del atributo"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className={classes.buttonsWrapper}>
                  <RemoveButtonComp name={"Quitar"} />
                  <AddButtonComp name={"Nuevo Atributo"} />
                </div>
              </Grid>
            </Grid>
          </div>
          {/* Create attribute component */}

          <div className={classes.saveButtonWrapper}>
            <AddButtonComp name={"Guardar Datos"} />
          </div>
        </div>
      </Card>

      <Card width={90} padding={"1rem"}>
        <div>
          <div className={classes.title}>
            <p>Carga de datos del KPI</p>
          </div>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Seleccione el KPI que desea Actializar *"}
                values={kpiNames}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <CustomSelectComp
                  label={"Seleccione mes para el que desea actualizar datos *"}
                  values={months}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <CustomSelectComp
                  label={"Seleccione año para el que desea actualizar datos *"}
                  values={years}
                />
              </div>
            </Grid>
          </Grid>
          {/* Create attribute component */}
          <div>
            <div className={classes.title}>
              <p>Valores para los Atributos</p>
            </div>
            <Grid container>
              {attributeNames.map((attributeName) => {
                return (
                  <Grid item xs={12} sm={6} md={6} key={attributeName}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <CustomInputComp
                        label={`Valor Para el Atributo '${attributeName}' (${kpiUnd})*`}
                        placeholder={"Valor del atributo en el periodo"}
                      />
                      <div className={classes.buttonsWrapper}>
                        <RemoveButtonComp name={"Corregir"} />
                        <AddButtonComp name={"Guardar"} />
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          {/* Create attribute component */}

          <div className={classes.saveButtonWrapper}>
            <AddButtonComp name={"Guardar Datos"} />
          </div>
        </div>
      </Card>

      <Card width={90} padding={"1rem"}>
        <div>
          <div className={classes.title}>
            <p>Carga de datos del KPI</p>
          </div>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Seleccione el KPI que desea Actializar *"}
                values={kpiNames}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <CustomSelectComp
                  label={"Seleccione variable para el que desea actualizar datos *"}
                  values={variables}
                />
              </div>
            </Grid>
          </Grid>
          {/* Create attribute component */}
          <div>
            <div className={classes.title}>
              <p>Valores para los Atributos</p>
            </div>
            <Grid container>
              {attributeNames.map((attributeName) => {
                return (
                  <Grid item xs={12} sm={6} md={6} key={attributeName}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <CustomInputComp
                        label={`Valor Para el Atributo '${attributeName}' (${kpiUnd})*`}
                        placeholder={"Valor del atributo en el periodo"}
                      />
                      <div className={classes.buttonsWrapper}>
                        <RemoveButtonComp name={"Corregir"} />
                        <AddButtonComp name={"Guardar"} />
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          {/* Create attribute component */}

          <div className={classes.saveButtonWrapper}>
            <AddButtonComp name={"Guardar Datos"} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateNewKpi;
