import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cloudinaryAxios } from "../config/CloudinaryAxios";
import allActions from "../store/actions/allActions";

const FORM_DATA_UPLOAD_PRESET_VALUE = "yiqjdpmj";
const FORM_DATA_UPLOAD_PRESET_PREFIX = "upload_preset";
const FORM_DATA_FILE_NAME_PREFIX = "file";

const useAxios = () => {
  const dispatch = useDispatch();

  const uploadImage = useCallback(async (file: File) => {
    console.log(file);
    const upLoadImageActions = allActions.pictureChangeActions;
    console.log(file);
    dispatch(
      upLoadImageActions.uploadPictureAction({ type: "UPLOAD", url: "" })
    );
    console.log(file);

    const formData = new FormData();
    formData.append(FORM_DATA_FILE_NAME_PREFIX, file);
    formData.append(
      FORM_DATA_UPLOAD_PRESET_PREFIX,
      FORM_DATA_UPLOAD_PRESET_VALUE
    );

    try {
      const response = await cloudinaryAxios.post("", formData);
      dispatch(
        upLoadImageActions.pictureUploadedAction({
          type: "UPLOADED",
          url: response.data.url,
        })
      );
    } catch (error) {}
  }, []);

  // const uploadImage = useCallback(async (file: File) => {
  //   const weatherApiActions = allActions.weatherApiActions;
  //   dispatch(weatherApiActions.sendRequest());
 
  //   try {
  //     //const result = await api.get(query);
  //     const result = await Promise.all([fakeGetApiCall(city), fakeGetApiForecastCall(city)]);

  //     dispatch(weatherApiActions.processResponse((result[0]).data, `${kindOfQuery.CURRENT_WEATHER}${city}`));
  //     dispatch(weatherApiActions.processResponse((result[1]).data, `${kindOfQuery.HOURS_DAYS_FORECAST}${city}`));
  //     dispatch(weatherApiActions.stopLoader());
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(weatherApiActions.handleError(error));
  //   }
  // }, []);

  return {
    uploadImagePointer: uploadImage,
  };
};

export default useAxios;
