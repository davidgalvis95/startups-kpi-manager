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

export interface ElementsToCharData {
  name: string;
  values: number[];
}

export interface ElementsToChar<T, U, V> {
  labels: T[];
  und: U;
  data: V[];
}


