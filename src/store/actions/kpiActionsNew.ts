import { Kpi, KpiFetchingWrapper, KpiWrapper, PymeKpiWrapper } from "../../types/Kpi";
import { KpiActions } from "./ActionTypes";

export interface KpiRelatedRequest {
  type: KpiActions;
  kpis?: KpiFetchingWrapper;
  errorOnKpiOp?: Error;
}

export class KpiRelatedRequestImpl implements KpiRelatedRequest {
  type: KpiActions;
  kpis?: KpiFetchingWrapper;
  errorOnKpiOp?: Error;

  constructor(
    public typeOfAction: KpiActions,
    public incomingKpis: KpiFetchingWrapper | undefined,
    public errorData: Error | undefined
  ) {
    this.type = typeOfAction;
    this.kpis = incomingKpis;
    this.errorOnKpiOp = errorData;
  }

  public getType(): string {
    return this.type;
  }
}

const clear: Function = (request: KpiRelatedRequest): KpiRelatedRequest => {
  return {
    type: request.type,
  };
};

const loadingKpisOperation: Function = (
  request: KpiRelatedRequest
): KpiRelatedRequest => {
  return {
    type: request.type,
  };
};

const updatedKpis: Function = (
  request: KpiRelatedRequest
): KpiRelatedRequest => {
  return {
    type: request.type,
    kpis: request.kpis,
  };
};

const gotKpis: Function = (request: KpiRelatedRequest): KpiRelatedRequest => {
  return {
    type: request.type,
    kpis: request.kpis,
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
  updatedKpis,
  gotKpis,
  errorOnKpiOperation,
  clear
};
