import { Grid } from "@mui/material";
import Card from "../../../hoc/Card";
import classes from "./CreateNewKpi.module.css";
import CustomSelectComp from "../../../hoc/dropdown-form-button/CustomSelectComp";
import CustomInputComp from "../../../hoc/custom-input/CustomInputComp";
import CustomCheckBoxComp from "../../../hoc/checkbox-button/CustomCheckBoxComp";
import RemoveButtonComp from "../../../hoc/remove-button/RemoveButtonComp";
import AddButtonComp from "../../../hoc/add-button/AddButtonComp";
import { Kpi, KpiAttribute } from "../../../types/types";
import { useEffect, useState } from "react";
import { newKpiVariablesValues } from "./CreateNewKpi";

interface UpdateKpiProps {
  kpis?: Kpi[];
}

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

const UpdateKpi = ({ kpis }: UpdateKpiProps) => {
  const [currentKpi, setCurrentKpi] = useState<Kpi>(defaultKpi);
  const [kpisForUpdate, setKpisForUpdate] = useState<Kpi[]>(
    kpis || [defaultKpi]
  );
  const [attributeNames, setAttributeNames] = useState<string[]>([]);
  const [kpiChartTypes, setKpiChartTypes] = useState<string[]>([]);

  useEffect(() => {
    const attributesArray: string[] = [];
    currentKpi.attributes.forEach((attribute) =>
      attributesArray.push(attribute.name)
    );
    setAttributeNames(attributesArray);
  }, [currentKpi.attributes]);

  useEffect(() => {
    setKpiChartTypes(currentKpi.chartTypes);
  }, [currentKpi.name]);

  const saveInfoHandler = () => {
    const kpiDataCopy: Kpi = {
      ...currentKpi,
      chartTypes: kpiChartTypes,
      attributes: attributeNames.map((attributeName: string): KpiAttribute => {
        return {
          name: attributeName,
          values: { ...currentKpi }.attributes.find(
            (a) => a.name === attributeName
          )
            ? { ...currentKpi }.attributes.find(
                (a) => a.name === attributeName
              )!.values
            : [],
        };
      }),
    };
    //TODO Validate all the fields
    //TODO Handle the API request to save the KPI
    console.log(kpiDataCopy);
  };

  const attributeNameChangeHandler = (e: any, index: number) => {
    const newAttributeNames: string[] = [...attributeNames];
    newAttributeNames[index] = e.target.value;
    setAttributeNames(newAttributeNames);
  };

  const setCurrentKpiHandler = (e: any) => {
    setCurrentKpi(
      [...kpisForUpdate].filter((kpi) => kpi.name === e.target.innerText)[0]
    );
  };

  const setNewComparativeVariable = (e: any) => {
    //TODO make a confirmation modal/pop up since this will remove all attributes
    const newKpi: Kpi = {
      ...currentKpi,
      labelType: e.target.value,
      attributes: [...attributeNames].map((attribute, index) => {
        console.log(currentKpi);
        return {
          name: attribute,
          values: [],
        };
      }),
    };
    setCurrentKpi(newKpi);
  };

  const setNewUnitHandler = (e: any) =>
    setCurrentKpi({
      ...currentKpi,
      und: e.target.value,
    });

  const attributeGroupChangeHandler = (e: any) =>
    setCurrentKpi({
      ...currentKpi,
      attributesGroupName: e.target.value,
    });

  const chartTypeAdditionHandler = (e: any, name: string) => {
    const chartTypes = [...kpiChartTypes];
    if (e.target.checked) {
      chartTypes.push(name);
    } else {
      chartTypes.splice(chartTypes.indexOf(name), 1);
    }
    setKpiChartTypes(chartTypes);
  };

  const handleAttributesSectionCreation = (e: any): void => {
    setAttributeNames(
      e.target.checked
        ? currentKpi.attributes.length > 0
          ? currentKpi.attributes.map(a => a.name)
          : [""]
        : []
    );
  };

  function addAttributeHandler(e: any) {
    const copyOfAttributes: string[] = [...attributeNames];
    copyOfAttributes.push("");
    setAttributeNames(copyOfAttributes);
  }

  function removeAttributeHandler(e: any, index: number) {
    const copyOfAttributes: string[] = [...attributeNames];
    copyOfAttributes.splice(index, 1);
    setAttributeNames(copyOfAttributes);
  }

  return (
    <div>
      <Card width={90} padding={"1rem"}>
        <div>
          <div className={classes.title}>
            <p>Actualizacion de KPI</p>
          </div>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Seleccione el KPI que desea Actializar *"}
                values={kpisForUpdate.map((kpi) => kpi.name)}
                click={setCurrentKpiHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomInputComp
                label={"Unidad de medicion del KPI (Ejemplo: USD, kg, km) *"}
                placeholder={"Unidad de medicion"}
                value={currentKpi.und}
                change={setNewUnitHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomSelectComp
                label={"Tipo de variable comparativa *"}
                values={newKpiVariablesValues}
                click={setNewComparativeVariable}
                value={currentKpi.labelType}
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
                  checked={kpiChartTypes.indexOf("Barras") !== -1}
                  click={chartTypeAdditionHandler}
                  renderFromParent={true}
                />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Barras Agrupadas"}
                  checked={kpiChartTypes.indexOf("Barras Agrupadas") !== -1}
                  click={chartTypeAdditionHandler}
                  renderFromParent={true}
                />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Anillo"}
                  checked={kpiChartTypes.indexOf("Anillo") !== -1}
                  click={chartTypeAdditionHandler}
                  renderFromParent={true}
                />
                <CustomCheckBoxComp
                  labelBefore={false}
                  name={"Linea"}
                  checked={kpiChartTypes.indexOf("Linea") !== -1}
                  click={chartTypeAdditionHandler}
                  renderFromParent={true}
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
                  checked={attributeNames.length > 0}
                  click={handleAttributesSectionCreation}
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
                value={currentKpi.attributesGroupName}
                change={attributeGroupChangeHandler}
              />
            </Grid>
          </Grid>
          {/* Create attribute component */}
          {attributeNames.length > 0 ? (
            <div>
              <div className={classes.title}>
                <p>Actualizacion de Atributos</p>
              </div>
              {attributeNames.map((name, index) => {
                return (
                  <Grid container key={index}>
                    <Grid item xs={12} sm={6} md={3}>
                      <CustomInputComp
                        value={name}
                        index={index}
                        label={"Nombre del atributo (Ej: Ventas Online)"}
                        placeholder={"Nombre del atributo"}
                        change={attributeNameChangeHandler}
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
              click={() => saveInfoHandler()}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateKpi;
