import { IconType } from "react-icons";

export interface SideBarMenuItem {
  id: string;
  label: string;
  icon: IconType;
  url: string;
}

export interface SideBarMenuCard {
  id: string;
  displayName: string;
  photoUrl: string;
  title: string;
  url: string;
}

export interface StartUpBodyRowContent {
  id: string;
  photoUrl: string;
  name: string;
  status: string;
  address: string;
  city: string;
  affiliationDate: string;
}

export interface ImportantKpi {
    name: string;
    value: number;
    und: string;
}

export interface KpiAttribute {
  name: string;
  values: number[];
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
}

export interface ElementsToCharData {
  name: string;
  values: number[];
}

export interface ElementsToChar<T, U, V> {
  labels: T[];
  und: U;
  data: V[];
}


