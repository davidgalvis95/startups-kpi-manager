export interface PymeKpiWrapper {
    importantKpis:ImportantKpi[];
    kpis:Kpi[];
}

export interface ImportantKpi {
    name: string;
    value: number;
    und: string;
}

export interface Kpi {
  name: string;
  und: string;
  labelType: string;
  total: number[];
  labels: string[];
  chartTypes: string[];
  attributesGroupName: string;
  attributes: KpiAttribute[];
  mainKpi: boolean;
}

export interface KpiAttribute {
    name: string;
    values: number[];
}