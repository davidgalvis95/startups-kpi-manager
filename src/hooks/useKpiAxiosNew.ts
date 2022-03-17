import { useCallback } from "react";
import { useDispatch } from "react-redux";
import allActions from "../store/actions/allActions";
import { KpiActions } from "../store/actions/ActionTypes";
import { KpiFetchingWrapper, KpiWrapper } from "../types/Kpi";
import { KpiRelatedRequestImpl } from "../store/actions/kpiActionsNew";
import { sampleKpisResponse } from "../assets/sample-data/SampleKpisNew";

interface KpisContainerObject {
  data: KpiFetchingWrapper;
}

const useKpiAxiosNew = () => {
  const dispatch = useDispatch();

  const pymeActions = allActions.kpiActionsNew;

  const startOperation = () => {
    dispatch(
      pymeActions.loadingKpisOperation(
        new KpiRelatedRequestImpl(
          KpiActions.LOADING_KPI_CREATION_OR_FETCHING,
          undefined,
          undefined,
        )
      )
    );
  };

  const handleError = (error: Error) => {
    dispatch(
      pymeActions.errorOnKpiOperation(
        new KpiRelatedRequestImpl(
          KpiActions.KPI_ERROR,
          undefined,
          error
        )
      )
    );
  };

  const getAllKpis = useCallback(async (pymeId: string) => {

    try {
      //   const result = await kpiStartUpManagerAxios.get(`/kpis`);
      const result = await getAllFakeKpis(pymeId);
      dispatch(
        pymeActions.gotKpis(
          new KpiRelatedRequestImpl(
            KpiActions.KPIS_FETCHED,
            result.data,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const createOrUpdateKpisData = useCallback(async (kpis: KpiWrapper, pymeId: string) => {
    try {
      //   const result = await kpiStartUpManagerAxios.put('/pyme', pyme);
      const result = await updateFakeKpis(kpis, pymeId);
      dispatch(
        pymeActions.updatedKpis(
          new KpiRelatedRequestImpl(
            KpiActions.KPIS_UPDATED,
            result.data,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  //TODO fix this stuff
  const getAllFakeKpis = (pymeId: string): Promise<KpisContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: sampleKpisResponse });
      }, 3000);
    });
  };

  const updateFakeKpis = (kpis: KpiWrapper, pymeId: string): Promise<KpisContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: sampleKpisResponse });
      }, 3000);
    });
  };

  return {
    getKpisPointer: getAllKpis,
    createOrUpdateKpisDataPointer: createOrUpdateKpisData,
    startKpiOperationPointer: startOperation,
  };
};

export default useKpiAxiosNew;
