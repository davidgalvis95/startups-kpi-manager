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

export interface Kpi1 {
  id?: string;
  name: string;
  und: string;
  value?: number;
  date?: string;
  chartTypes?: string[];
}

export interface KpiFetching {
  id: string;
  name: string;
  important?: boolean;
  und: string;
  values: KpiDataFetching[];
  chartTypes: string[];
}

export interface KpiDataFetching {
  label: string;
  value: number;
}

export interface KpiWrapper {
  kpis: Kpi1[];
}

export interface KpiFetchingWrapper {
  kpis: KpiFetching[];
}
