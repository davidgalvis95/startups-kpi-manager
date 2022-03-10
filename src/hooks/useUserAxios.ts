import { useCallback } from "react";
import { useDispatch } from "react-redux";
import allActions from "../store/actions/allActions";
import { UserActions } from "../store/actions/ActionTypes";
import { UserRelatedRequestImpl } from "../store/actions/userActions";
import { SampleUsers } from "../assets/sample-data/SampleUsers";
import { UserDataType } from "../types/userPymeTypes";
import User from "../types/User";
import UserWithoutPyme from "../types/UserWithoutPyme";
import { kpiStartUpManagerAxios } from "../config/axios/KpiStartUpManagerAxios";

interface UserContainerObject {
  data: UserDataType;
}

const useUserAxios = () => {
  const dispatch = useDispatch();

  const userActions = allActions.userActions;

  const startOperation = () => {
    dispatch(
      userActions.loadingUserOperation(
        new UserRelatedRequestImpl(
          UserActions.LOADING_USER_CREATION_OR_FETCHING,
          undefined,
          undefined
        )
      )
    );
  };

  const handleError = (error: Error) => {
    dispatch(
      userActions.errorOnUserOperation(
        new UserRelatedRequestImpl(UserActions.USER_ERROR, undefined, error)
      )
    );
  };

  const getUser = useCallback(async (emailAddress: string, userId?: string) => {
    try {
      //   const result = await kpiStartUpManagerAxios.get(`/user`, { 'headers' : {'email':`${emailAddress}`, 'userId':`${userId}`}});
      const result = await getFakeUser(emailAddress, userId);
      dispatch(
        userActions.gotUser(
          new UserRelatedRequestImpl(
            UserActions.USER_FETCHED,
            result.data,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const createUser = useCallback(async (user: UserWithoutPyme) => {
    try {
      //   const result = await kpiStartUpManagerAxios.post('/user', user);
      const result = await createFakeUser(user);
      dispatch(
        userActions.userCreated(
          new UserRelatedRequestImpl(
            UserActions.USER_CREATED,
            result.data,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const updateUser = useCallback(async (user: User) => {
    try {
      //   const result = await kpiStartUpManagerAxios.put('/user', user);
      const result = await updateFakeUser(user);
      dispatch(
        userActions.updatedUser(
          new UserRelatedRequestImpl(
            UserActions.USER_UPDATED,
            result.data,
            undefined
          )
        )
      );
    } catch (error: any) {
      handleError(error);
    }
  }, []);

  const getFakeUser = (
    emailAddress: string,
    userId?: string
  ): Promise<UserContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: SampleUsers[Math.floor(Math.random() * 2)] });
      }, 3000);
    });
  };

  const getAllFakeUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: SampleUsers });
      }, 3000);
    });
  };

  const updateFakeUser = (user: User): Promise<UserContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: user });
      }, 3000);
    });
  };

  const createFakeUser = (
    user: UserWithoutPyme
  ): Promise<UserContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: user });
      }, 3000);
    });
  };

  return {
    getUserPointer: getUser,
    createUserPointer: createUser,
    updateUserPointer: updateUser,
    startUserOperationPointer: startOperation,
  };
};

export default useUserAxios;
