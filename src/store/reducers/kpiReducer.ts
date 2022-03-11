import { Kpi, PymeKpiWrapper } from "../../types/Kpi";
import { KpiRelatedRequest } from "../actions/kpiActions";
import { KpiActions } from "../actions/ActionTypes";

export interface KpiStatus {
  kpiOperationLoading: boolean;
  kpi?: Kpi;
  kpis?: PymeKpiWrapper;
  errorOnKpiOperation?: Error;
}

class KpiStatusImpl implements KpiStatus {
  kpiOperationLoading: boolean;
  kpi?: Kpi;
  kpis?: PymeKpiWrapper;
  errorOnKpiOperation?: Error;

  constructor(
    public loading: boolean,
    public kpiData: Kpi | undefined,
    public kpisData: PymeKpiWrapper | undefined,
    public errorData: Error | undefined
  ) {
    this.kpiOperationLoading = loading;
    this.kpi = kpiData;
    this.kpis = kpisData;
    this.errorOnKpiOperation = errorData;
  }
}

export const defaultKpiState: KpiStatus = {
  kpiOperationLoading: false,
  kpi: undefined,
  kpis: undefined,
  errorOnKpiOperation: undefined,
};

const addNewKpiDetailToNonExistentKpis = (
  kpi?: Kpi
): PymeKpiWrapper | undefined => {
  if (!kpi) {
    return undefined;
  }
  return {
    importantKpis: [],
    allKpisDetailed: [kpi],
  };
};

const addNewKpiDetailToExistentKpis = (
  kpis: PymeKpiWrapper,
  kpi?: Kpi
): PymeKpiWrapper => {
  if (!kpi) return kpis;
  const newKpisDetailed = { ...kpis }.allKpisDetailed;
  newKpisDetailed.push(kpi);
  return {
    ...kpis,
    allKpisDetailed: newKpisDetailed,
  };
};

const updateKpiDetailOnExistentKpis = (
  kpis: PymeKpiWrapper,
  kpi?: Kpi
): PymeKpiWrapper => {
  if (!kpi) return kpis;
  const newKpisDetailed: Kpi[] = { ...kpis }.allKpisDetailed;
  const index: number = newKpisDetailed.indexOf(
    newKpisDetailed.filter((oldKpi) => oldKpi.id === kpi.id)[0]
  );
  newKpisDetailed[index] = kpi;
  return {
    ...kpis,
    allKpisDetailed: newKpisDetailed,
  };
};

const pictureChangeReducer = (
  state = defaultKpiState,
  action: KpiRelatedRequest
): KpiStatus => {
  const kpi = state.kpi || undefined;
  const kpis = state.kpis || undefined;
  switch (action.type) {
    case KpiActions.LOADING_KPI_CREATION_OR_FETCHING:
      return new KpiStatusImpl(true, kpi, kpis, undefined);
    case KpiActions.KPI_CREATED:
      const newKpis = kpis
        ? addNewKpiDetailToExistentKpis(kpis, action.kpi)
        : addNewKpiDetailToNonExistentKpis(action.kpi);
      return new KpiStatusImpl(false, action.kpi, newKpis, undefined);
    case KpiActions.KPI_FETCHED:
      return new KpiStatusImpl(false, action.kpi, kpis, undefined);
    case KpiActions.KPIS_FETCHED:
      return new KpiStatusImpl(false, kpi, action.kpis, undefined);
    case KpiActions.KPI_UPDATED:
      const newUpdatedKpis = updateKpiDetailOnExistentKpis(kpis!, action.kpi);
      return new KpiStatusImpl(false, action.kpi, newUpdatedKpis, undefined);
    case KpiActions.KPI_ERROR:
      return new KpiStatusImpl(
        false,
        undefined,
        undefined,
        action.errorOnKpiOp
      );
    case KpiActions.CLEAR:
      return defaultKpiState;
    default:
      return state;
  }
};

export default pictureChangeReducer;
