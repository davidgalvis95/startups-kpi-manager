import { PictureChangeState } from "../actions/pictureChangeActions";

export interface PictureUploadStatus {
  isLoading: boolean;
  imageUrl?: string;
}

class PictureUploadStatusImpl implements PictureUploadStatus {
  isLoading: boolean;
  imageUrl?: string;

  constructor(public loading: boolean, public url: string | undefined) {
    this.isLoading = loading;
    this.imageUrl = url;
  }
}

export const defaultPictureState: PictureUploadStatus = {
  isLoading: false,
  imageUrl: undefined,
};

const pictureChangeReducer = (
  state = defaultPictureState,
  action: PictureChangeState
): PictureUploadStatus => {
  switch (action.type) {
    case "UPLOADING":
      return new PictureUploadStatusImpl(true, "");
    case "UPLOADED":
      return new PictureUploadStatusImpl(false, action.url);
    case "CLEAR":
      return defaultPictureState;
    default:
      return state;
  }
};

export default pictureChangeReducer;
