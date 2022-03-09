import { useCallback } from "react";
import { useDispatch } from "react-redux";
import allActions from "../store/actions/allActions";
import { KpiActions, PymeActions } from "../store/actions/ActionTypes";
import { StartUpType } from "../types/userPymeTypes";
import { kpiStartUpManagerAxios } from "../config/axios/KpiStartUpManagerAxios";
import { SamplePymes } from "../assets/sample-data/SamplePymes";
import { SampleKpis } from "../assets/sample-data/SampleKpis";
import { PymeRelatedRequestImpl } from "../store/actions/pymeActions";
import { Kpi, PymeKpiWrapper } from "../types/Kpi";
import { KpiRelatedRequestImpl } from "../store/actions/kpiActions";

interface KpisContainerObject {
  data: PymeKpiWrapper;
}

interface KpiContainerObject {
  data: Kpi;
}

const useKpiAxios = () => {
  const dispatch = useDispatch();

  const pymeActions = allActions.kpiActions;

  const startOperation = () => {
    dispatch(
      pymeActions.loadingKpisOperation(
        new KpiRelatedRequestImpl(
          KpiActions.LOADING_KPI_CREATION_OR_FETCHING,
          undefined,
          undefined,
          undefined
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
          undefined,
          error
        )
      )
    );
  };

  const getKpi = useCallback(
    async (kpiId: string) => {
      try {
        //   const result = await kpiStartUpManagerAxios.get(`/kpis`, { 'headers' : {'X-kpiId':`${kpiId}`}});
        const result = await getFakeKpi(kpiId);
        dispatch(
          pymeActions.gotKpi(
            new KpiRelatedRequestImpl(
              KpiActions.KPI_FETCHED,
              result.data,
              undefined,
              undefined
            )
          )
        );
      } catch (error: any) {
        handleError(error);
      }
    },
    []
  );

  const getAllKpis = useCallback(async () => {
    try {
      //   const result = await kpiStartUpManagerAxios.get(`/kpis`);
      const result = await getAllFakeKpis();
      dispatch(
        pymeActions.gotKpis(
          new KpiRelatedRequestImpl(
            KpiActions.KPIS_FETCHED,
            undefined,
            result.data,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const createKpi = useCallback(async (kpi: Kpi) => {
    try {
      //   const result = await kpiStartUpManagerAxios.post('/kpis', pyme);
      const result = await createFakeKpi(kpi);
      dispatch(
        pymeActions.kpiCreated(
          new KpiRelatedRequestImpl(
            KpiActions.KPI_CREATED,
            result.data,
            undefined,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const updateKpi = useCallback(async (kpi: Kpi) => {
    try {
      //   const result = await kpiStartUpManagerAxios.put('/pyme', pyme);
      const result = await updateFakeKpi(kpi);
      dispatch(
        pymeActions.updatedKpi(
          new KpiRelatedRequestImpl(
            KpiActions.KPI_UPDATED,
            result.data,
            undefined,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const getFakeKpi = (
    kpiId: string
  ): Promise<KpiContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: SampleKpis.allKpisDetailed[Math.floor(Math.random() * 2)] });
      }, 3000);
    });
  };

  const getAllFakeKpis = (): Promise<KpisContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: SampleKpis });
      }, 3000);
    });
  };

  const updateFakeKpi = (kpi: Kpi): Promise<KpiContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: kpi });
      }, 3000);
    });
  };

  const createFakeKpi = (kpi: Kpi): Promise<KpiContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: kpi });
      }, 3000);
    });
  };

  return {
    getKpiPointer: getKpi,
    getKpisPointer: getAllKpis,
    createKpiPointer: createKpi,
    updateKpiPointer: updateKpi,
    startOperationPointer: startOperation,
  };
};

export default useKpiAxios;
