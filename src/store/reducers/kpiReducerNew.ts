import {
  Kpi,
  KpiFetchingWrapper,
  KpiWrapper,
  PymeKpiWrapper,
} from "../../types/Kpi";
import { KpiRelatedRequest } from "../actions/kpiActionsNew";
import { KpiActions } from "../actions/ActionTypes";

export interface KpiStatusNew {
  kpiOperationLoading: boolean;
  kpisFetched?: KpiFetchingWrapper;
  errorOnKpiOperation?: Error;
}

class KpiStatusImpl implements KpiStatusNew {
  kpiOperationLoading: boolean;
  kpisFetched?: KpiFetchingWrapper;
  errorOnKpiOperation?: Error;

  constructor(
    public loading: boolean,
    public kpisData: KpiFetchingWrapper | undefined,
    public errorData: Error | undefined
  ) {
    this.kpiOperationLoading = loading;
    this.kpisFetched = kpisData;
    this.errorOnKpiOperation = errorData;
  }
}

export const defaultKpiStateNew: KpiStatusNew = {
  kpiOperationLoading: false,
  kpisFetched: undefined,
  errorOnKpiOperation: undefined,
};

const pictureChangeReducer = (
  state = defaultKpiStateNew,
  action: KpiRelatedRequest
): KpiStatusNew => {
  const kpis = state.kpisFetched || undefined;
  switch (action.type) {
    case KpiActions.LOADING_KPI_CREATION_OR_FETCHING:
      return new KpiStatusImpl(true, kpis, undefined);
    case KpiActions.KPIS_FETCHED:
      return new KpiStatusImpl(false, action.kpis, undefined);
    case KpiActions.KPIS_UPDATED:
      console.log('in kpis updated')
      return new KpiStatusImpl(false, action.kpis, undefined);
    case KpiActions.KPI_ERROR:
      return new KpiStatusImpl(false, undefined, action.errorOnKpiOp);
    case KpiActions.CLEAR:
      return defaultKpiStateNew;
    default:
      return state;
  }
};

export default pictureChangeReducer;
