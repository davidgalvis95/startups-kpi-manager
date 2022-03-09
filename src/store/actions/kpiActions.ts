import { Kpi, PymeKpiWrapper } from "../../types/Kpi";
import { KpiActions } from "./ActionTypes";

export interface KpiRelatedRequest {
  type: KpiActions;
  kpi?: Kpi;
  kpis?: PymeKpiWrapper;
  errorOnKpiOp?: Error;
}

export class KpiRelatedRequestImpl implements KpiRelatedRequest {
  type: KpiActions;
  kpi: Kpi;
  kpis: PymeKpiWrapper;
  errorOnKpiOp?: Error;

  constructor(
    public typeOfAction: KpiActions,
    public incomingKpi: Kpi,
    public incomingKpis: PymeKpiWrapper,
    public errorData: Error
  ) {
    this.type = typeOfAction;
    this.kpi = incomingKpi;
    this.kpis = incomingKpis;
    this.errorOnKpiOp = errorData;
  }

  public getType(): string {
    return this.type;
  }
}

const loadingKpisOperation: Function = (
  request: KpiRelatedRequest
): KpiRelatedRequest => {
  return {
    type: request.type,
  };
};

const updatedKpi: Function = (
  request: KpiRelatedRequest
): KpiRelatedRequest => {
  return {
    type: request.type,
    kpi: request.kpi,
  };
};

const gotKpi: Function = (request: KpiRelatedRequest): KpiRelatedRequest => {
  return {
    type: request.type,
    kpi: request.kpi,
  };
};

const gotKpis: Function = (request: KpiRelatedRequest): KpiRelatedRequest => {
  return {
    type: request.type,
    kpis: request.kpis,
  };
};

const kpiCreated: Function = (
  request: KpiRelatedRequest
): KpiRelatedRequest => {
  return {
    type: request.type,
    kpi: request.kpi,
  };
};

const errorOnKpiOperation: Function = (
  request: KpiRelatedRequest
): KpiRelatedRequest => {
  return {
    type: request.type,
    errorOnKpiOp: request.errorOnKpiOp,
  };
};

export default {
  loadingKpisOperation,
  kpiCreated,
  gotKpi,
  gotKpis,
  updatedKpi,
  errorOnKpiOperation,
};
