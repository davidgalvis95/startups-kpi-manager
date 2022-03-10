import { useCallback } from "react";
import { useDispatch } from "react-redux";
import allActions from "../store/actions/allActions";
import { PymeActions } from "../store/actions/ActionTypes";
import { StartUpType } from "../types/userPymeTypes";
import { kpiStartUpManagerAxios } from "../config/axios/KpiStartUpManagerAxios";
import { SamplePymes } from "../assets/sample-data/SamplePymes";
import { PymeRelatedRequestImpl } from "../store/actions/pymeActions";

interface PymeContainerObject {
  data: StartUpType;
}

interface PymesContainerObject {
  data: StartUpType[];
}

const usePymeAxios = () => {
  const dispatch = useDispatch();

  const pymeActions = allActions.pymeActions;

  const startOperation = () => {
    dispatch(
      pymeActions.loadingPymesOperation(
        new PymeRelatedRequestImpl(
          PymeActions.LOADING_PYME_CREATION_OR_FETCHING,
          undefined,
          undefined,
          undefined
        )
      )
    );
  };

  const handleError = (error: Error) => {
    dispatch(
      pymeActions.errorOnPymeOperation(
        new PymeRelatedRequestImpl(
          PymeActions.PYME_ERROR,
          undefined,
          undefined,
          error
        )
      )
    );
  };

  const getPyme = useCallback(
    async (pymeNationalId: string, pymeId?: string) => {
      try {
        //   const result = await kpiStartUpManagerAxios.get(`/pyme`, { 'headers' : {'X-pymeNationalId':`${pymeNationalId}`, 'X-pymeId':`${pymeId}`}});
        const result = await getFakePyme(pymeNationalId, pymeId);
        dispatch(
          pymeActions.gotPyme(
            new PymeRelatedRequestImpl(
              PymeActions.PYME_FETCHED,
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

  const getPymeBySystemId = useCallback(
    async (pymeNationalId: string, pymeId: string) => {
      try {
        //   const result = await kpiStartUpManagerAxios.get(`/pyme`, { 'headers' : {'X-pymeNationalId':`${pymeNationalId}`, 'X-pymeId':`${pymeId}`}});
        const result = await getFakePyme(pymeNationalId, pymeId);
        dispatch(
          pymeActions.gotPyme(
            new PymeRelatedRequestImpl(
              PymeActions.PYME_FETCHED,
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

  const getAllPymes = useCallback(async () => {
    try {
      //   const result = await kpiStartUpManagerAxios.get(`/pymes`);
      const result = await getAllFakePymes();
      dispatch(
        pymeActions.gotPymes(
          new PymeRelatedRequestImpl(
            PymeActions.PYMES_FETCHED,
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

  const createPyme = useCallback(async (pyme: StartUpType) => {
    try {
      //   const result = await kpiStartUpManagerAxios.post('/pyme', pyme);
      const result = await createFakePyme(pyme);
      dispatch(
        pymeActions.pymeCreated(
          new PymeRelatedRequestImpl(
            PymeActions.PYME_CREATED,
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

  const updatePyme = useCallback(async (pyme: StartUpType) => {
    try {
      //   const result = await kpiStartUpManagerAxios.put('/pyme', pyme);
      const result = await updateFakePyme(pyme);
      dispatch(
        pymeActions.updatedPyme(
          new PymeRelatedRequestImpl(
            PymeActions.PYME_UPDATED,
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

  const getFakePyme = (
    pymeNationalId?: string,
    pymeId?: string
  ): Promise<PymeContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: SamplePymes[Math.floor(Math.random() * 2)] });
      }, 3000);
    });
  };

  const getAllFakePymes = (): Promise<PymesContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: SamplePymes });
      }, 3000);
    });
  };

  const updateFakePyme = (pyme: StartUpType): Promise<PymeContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: pyme });
      }, 3000);
    });
  };

  const createFakePyme = (pyme: StartUpType): Promise<PymeContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: pyme });
      }, 3000);
    });
  };

  return {
    getPymePointer: getPyme,
    getPymeBySystemIdPointer: getPymeBySystemId,
    getPymesPointer: getAllPymes,
    createPymePointer: createPyme,
    updatePymePointer: updatePyme,
    startPymeOperationPointer: startOperation,
  };
};

export default usePymeAxios;
