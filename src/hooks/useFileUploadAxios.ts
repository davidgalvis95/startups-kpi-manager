import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cloudinaryAxios } from "../config/axios/CloudinaryAxios";
import allActions from "../store/actions/allActions";


const FORM_DATA_UPLOAD_PRESET_VALUE = "yiqjdpmj";
const FORM_DATA_UPLOAD_PRESET_PREFIX = "upload_preset";
const FORM_DATA_FILE_NAME_PREFIX = "file";

const useFileUploadAxios = () => {
  const dispatch = useDispatch();

  const uploadImage = useCallback(async (file: File) => {
    const upLoadImageActions = allActions.pictureChangeActions;
    dispatch(
      upLoadImageActions.uploadPictureAction({ type: "UPLOADING", url: "" })
    );

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

  return {
    uploadImagePointer: uploadImage,
  };
};

export default useFileUploadAxios;
