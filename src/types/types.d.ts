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

export interface KpiAttribute {
  attribute: string;
  values: number[];
  labels: string[];
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

export interface ElementsToChar {
  labels: string[];
  und: string;
  data: ElementsToCharData[];
}
