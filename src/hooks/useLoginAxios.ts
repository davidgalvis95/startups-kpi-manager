import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { kpiStartUpManagerAxios } from "../config/axios/KpiStartUpManagerAxios";
import { LoginActions } from "../store/actions/ActionTypes";
import allActions from "../store/actions/allActions";
import { UserLogin, UserLoginResponse } from "../types/userPymeTypes";

interface LoginContainerObject {
  data: UserLoginResponse;
}

const useLoginAxios = () => {
  const loginActions = allActions.loginActions;

  const dispatch = useDispatch();

  const startOperation = () => {
    dispatch(
      loginActions.attemptLogin({
        type: LoginActions.ATTEMPT,
      })
    );
  };

  const finishLoginGracefully = useCallback(async () => {
    dispatch(
      loginActions.loginAccepted({
        type: LoginActions.FINISHED_OK,
      })
    );
  }, []);

  const requestLogin = useCallback(async (userRequest: UserLogin) => {
    try {
      // const result = await kpiStartUpManagerAxios.post(`/login`, userRequest);
      const response = await simulateSuccessfulLogin(userRequest);
      if (response.data.valid) {
        dispatch(
          loginActions.loginAccepted({
            type: LoginActions.ACCEPTED,
            response: response.data,
          })
        );
      } else {
        //If declined the user id should be null
        dispatch(
          loginActions.loginDeclined({
            type: LoginActions.DECLINED,
            response: response.data,
          })
        );
      }
    } catch (error) {
      dispatch(
        loginActions.loginDeclined({
          type: LoginActions.DECLINED,
          loginError: error,
        })
      );
    }
  }, []);

  const simulateSuccessfulLogin = (
    userRequest: UserLogin
  ): Promise<LoginContainerObject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            email: "example@example.com",
            userId: "5951cdbb-4b5d-4389-afcd-3ede85166ecc",
            valid: true,
          },
        });
      }, 3000);
    });
  };

  return {
    requestLoginPointer: requestLogin,
    finishLoginGracefullyPointer: finishLoginGracefully,
    startLoginOperationPointer: startOperation,
  };
};

export default useLoginAxios;
