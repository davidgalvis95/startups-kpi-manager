import { Grid } from "@mui/material";
import Card from "../../../hoc/Card";
import classes from "./CreateNewKpi.module.css";
import CustomSelectComp from "../../../hoc/dropdown-form-button/CustomSelectComp";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import CustomCheckBoxComp from "../../../hoc/checkbox-button/CustomCheckBoxComp";
import RemoveButtonComp from "../../../hoc/remove-button/RemoveButtonComp";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import React, { useState } from "react";
import { Kpi, KpiAttribute } from "../../../types/types";

const defaultKpi: Kpi = {
  name: "",
  und: "",
  labelType: "",
  total: [],
  labels: [],
  chartTypes: [],
  attributesGroupName: "",
  attributes: [],
};

export const newKpiVariablesValues = [
  "Fecha (Ejemplo: ene-2022, feb-2022)",
  "Texto (Ejemplo: Negro, Gris, Blanco)",
  "Numero (Ejemplo: 1000, 10000, 100000)",
];

const CreateNewKpi = (props: any) => {
  const [attributes, setAttributes] = useState<string[]>([]);
  const [kpiData, setKpiData] = useState<Kpi>(defaultKpi);



  const saveInfoHandler = () => {
    const kpiDataCopy: Kpi = {
      ...kpiData,
      attributes: attributes.map((attributeName: string): KpiAttribute => {
        return { name: attributeName, values: [] };
      }),
    };
    //TODO Validate all the fields
    //TODO Handle the API request to save the KPI
    console.log(kpiDataCopy);
  };

  const changeNameAttributeHandler = (e: any): void =>
    setKpiData({ ...kpiData, name: e.target.value });

  const changeAttributeUndHandler = (e: any): void =>
    setKpiData({ ...kpiData, und: e.target.value });

  const changeAttributeVariableUndHandler = (e: any): void =>
    setKpiData({ ...kpiData, labelType: e.target.textContent });

  const changeAttributeChartsHandler = (e: any, name: string): void => {
    const newChartTypes: string[] = { ...kpiData }.chartTypes;
    if (e.target.checked) {
      newChartTypes.push(name);
    } else {
      newChartTypes.splice(newChartTypes.indexOf(name), 1);
    }
    setKpiData({ ...kpiData, chartTypes: newChartTypes });
  };

  const changeAttributeSubGroupHandler = (e: any): void =>
    setKpiData({ ...kpiData, attributesGroupName: e.target.value });

  //TODO fix this type to the correct type of event React.MouseEvent<HTMLElement>
  const handleAttributesSectionCreation = (e: any): void => {
    setAttributes(e.target.checked ? [""] : []);
  };

  const changeAttributeInputHandler = (e: any, index: number) => {
    const copyOfAttributes: string[] = [...attributes];
    copyOfAttributes[index] = e.target.value;
    setAttributes(copyOfAttributes);
  };

  function addAttributeHandler(e: any) {
    const copyOfAttributes: string[] = [...attributes];
    copyOfAttributes.push("");
    setAttributes(copyOfAttributes);
  }

  function removeAttributeHandler(e: any, index: number) {
    const copyOfAttributes: string[] = [...attributes];
    copyOfAttributes.splice(index, 1);
    setAttributes(copyOfAttributes);
  }

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
                change={(e: any) => changeNameAttributeHandler(e)}
                value={kpiData.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={"Unidad de medicion del KPI (Ejemplo: USD, kg, km) *"}
                placeholder={"Unidad de medicion"}
                change={(e: any) => changeAttributeUndHandler(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Tipo de variable comparativa *"}
                values={newKpiVariablesValues}
                click={(e: any) => changeAttributeVariableUndHandler(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <p className={classes.textBoxLabel}>
                Seleccione el de graficos que quiere para su KPI *
              </p>
              <div className={classes.chackBoxWrapperParent}>
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Barras"}
                  click={(e: any, name: string) =>
                    changeAttributeChartsHandler(e, name)
                  }
                />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Barras Agrupadas"}
                  click={(e: any, name: string) =>
                    changeAttributeChartsHandler(e, name)
                  }
                />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Anillo"}
                  click={(e: any, name: string) =>
                    changeAttributeChartsHandler(e, name)
                  }
                />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Linea"}
                  click={(e: any, name: string) =>
                    changeAttributeChartsHandler(e, name)
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div
                className={`${classes.chackBoxWrapperParent} ${classes.margined}`}
              >
                <CustomCheckBoxComp
                  labelBefore={true}
                  name={"Tiene Atributos"}
                  click={(e: any) => handleAttributesSectionCreation(e)}
                  checked={attributes.length > 0 || false}
                  renderFromParent={true}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={
                  "Nombre del subgrupo de atributos (Ej: Tipo de Contrato)"
                }
                placeholder={"Nombre del subgrupo de atributos"}
                disabled={attributes.length ? false : true}
                change={(e: any) => changeAttributeSubGroupHandler(e)}
              />
            </Grid>
          </Grid>
          {/* Create attribute component */}
          {attributes.length > 0 ? (
            <div>
              <div className={classes.title}>
                <p>Creacion de Atributos</p>
              </div>
              {attributes.map((attribute, index) => {
                return (
                  <Grid container key={index}>
                    <Grid item xs={12} sm={6} md={3}>
                      <CustomInputComp
                        label={"Nombre del atributo (Ej: Ventas Online)"}
                        placeholder={"Nombre del atributo"}
                        value={attribute}
                        change={(e: any) =>
                          changeAttributeInputHandler(e, index)
                        }
                        index={index}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className={classes.buttonsWrapper}>
                        <RemoveButtonComp
                          name={"Quitar"}
                          click={(e: any) => removeAttributeHandler(e, index)}
                        />
                        <AddButtonComp
                          name={"Nuevo Atributo"}
                          click={(e: any) => addAttributeHandler(e)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          ) : null}
          {/* Create attribute component */}
          <div className={classes.saveButtonWrapper}>
            <AddButtonComp
              name={"Guardar Datos"}
              click={(e: any) => saveInfoHandler()}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateNewKpi;
