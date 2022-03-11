export interface PymeKpiWrapper {
  importantKpis: ImportantKpi[];
  allKpisDetailed: Kpi[];
}

export interface ImportantKpi {
  id: string;
  name: string;
  value: number;
  und: string;
}

export interface Kpi {
  id: string;
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
