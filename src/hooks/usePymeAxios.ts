import { useCallback } from "react";
import { useDispatch } from "react-redux";
import allActions from "../store/actions/allActions";
import { PymeActions } from "../store/actions/ActionTypes";
import { StartUpType } from "../types/userPymeTypes";
import { kpiStartUpManagerAxios } from "../config/axios/KpiStartUpManagerAxios";
import { SamplePymes } from "../assets/sample-data/SamplePymes";
import { PymeRelatedRequestImpl } from "../store/actions/pymeActions";

interface PymeRelatedData {
  pyme: StartUpType;
  userRights: string;
}

interface PymesRelatedData {
  pymes: StartUpType[];
  userRights: string;
}

interface PymeContainerObject {
  data: PymeRelatedData;
}

interface PymesContainerObject {
  data: PymesRelatedData;
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
          undefined,
          error
        )
      )
    );
  };

  const getPyme = useCallback(
    async (pymeNationalId: string, userId: string, pymeId?: string) => {
      try {
        //   const result = await kpiStartUpManagerAxios.get(`/pyme`, { 'headers' : {'X-pymeNationalId':`${pymeNationalId}`, 'X-pymeId':`${pymeId}`}});
        const result = await getFakePyme(pymeNationalId, userId, pymeId);
        dispatch(
          pymeActions.gotPyme(
            new PymeRelatedRequestImpl(
              PymeActions.PYME_FETCHED,
              result.data.pyme,
              undefined,
              result.data.userRights,
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
    async (pymeNationalId: string, userId: string, pymeId: string) => {
      try {
        //   const result = await kpiStartUpManagerAxios.get(`/pyme`, { 'headers' : {'X-pymeNationalId':`${pymeNationalId}`, 'X-pymeId':`${pymeId}`}});
        const result = await getFakePyme(pymeNationalId, userId, pymeId);
        dispatch(
          pymeActions.gotPyme(
            new PymeRelatedRequestImpl(
              PymeActions.PYME_FETCHED,
              result.data.pyme,
              undefined,
              result.data.userRights,
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

  const getAllPymes = useCallback(async (userId: string) => {
    try {
      //   const result = await kpiStartUpManagerAxios.get(`/pymes`);
      const result = await getAllFakePymes(userId);
      dispatch(
        pymeActions.gotPymes(
          new PymeRelatedRequestImpl(
            PymeActions.PYMES_FETCHED,
            undefined,
            result.data.pymes,
            result.data.userRights,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const createPyme = useCallback(async (pyme: StartUpType, userId: string) => {
    try {
      //   const result = await kpiStartUpManagerAxios.post('/pyme', pyme);
      const result = await createFakePyme(pyme, userId);
      dispatch(
        pymeActions.pymeCreated(
          new PymeRelatedRequestImpl(
            PymeActions.PYME_CREATED,
            result.data.pyme,
            undefined,
            result.data.userRights,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const updatePyme = useCallback(async (pyme: StartUpType, userId: string) => {
    try {
      //   const result = await kpiStartUpManagerAxios.put('/pyme', pyme);
      const result = await updateFakePyme(pyme, userId);
      dispatch(
        pymeActions.updatedPyme(
          new PymeRelatedRequestImpl(
            PymeActions.PYME_UPDATED,
            result.data.pyme,
            undefined,
            result.data.userRights,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const getFakePyme = (
    pymeNationalId: string,
    userId: string,
    pymeId?: string
  ): Promise<PymeContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            pyme: SamplePymes[Math.floor(Math.random() * 2)],
            userRights: "USER",
          },
        });
      }, 3000);
    });
  };

  const getAllFakePymes = (userId: string): Promise<PymesContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { pymes: SamplePymes, userRights: "ADMIN" } });
      }, 3000);
    });
  };

  const updateFakePyme = (
    pyme: StartUpType,
    userId: string
  ): Promise<PymeContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { pyme: pyme, userRights: "USER" } });
      }, 3000);
    });
  };

  const createFakePyme = (
    pyme: StartUpType,
    userId: string
  ): Promise<PymeContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { pyme: pyme, userRights: "ADMIN" } });
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
