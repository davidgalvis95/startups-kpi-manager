import { Kpi, PymeKpiWrapper } from "../../types/Kpi";
import { KpiRelatedRequest } from "../actions/kpiActions";
import { KpiActions } from "../actions/ActionTypes";


interface KpiStatus {
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

const defaultState: KpiStatus = {
  kpiOperationLoading: false,
  kpi: undefined,
  kpis: undefined,
  errorOnKpiOperation: undefined,
};

const pictureChangeReducer = (
  state = defaultState,
  action: KpiRelatedRequest
): KpiStatus => {
  switch (action.type) {
    case KpiActions.LOADING_KPI_CREATION_OR_FETCHING:
      return new KpiStatusImpl(true, undefined, undefined, undefined);
    case KpiActions.KPI_CREATED:
      return new KpiStatusImpl(false, action.kpi, undefined, undefined);
    case KpiActions.KPI_FETCHED:
      return new KpiStatusImpl(false, undefined, action.kpis, undefined);
    case KpiActions.KPIS_FETCHED:
      return new KpiStatusImpl(false, action.kpi, undefined, undefined);
    case KpiActions.KPI_UPDATED:
      return new KpiStatusImpl(false, action.kpi, undefined, undefined);
    case KpiActions.KPI_ERROR:
      return new KpiStatusImpl(
        false,
        undefined,
        undefined,
        action.errorOnKpiOp
      );
    default:
      return defaultState;
  }
};

export default pictureChangeReducer;
