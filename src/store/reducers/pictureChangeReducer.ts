import { PictureChangeState } from "../actions/pictureChangeActions";

interface PictureUploadStatus {
  isLoading: boolean;
  imageUrl: string;
}

class PictureUploadStatusImpl implements PictureUploadStatus {
  isLoading: boolean;
  imageUrl: string;

  constructor(public loading: boolean, public url: string) {
    this.isLoading = loading;
    this.imageUrl = url;
  }
}

const defaultState: PictureUploadStatus = {
  isLoading: false,
  imageUrl: "",
};

const pictureChangeReducer = (
  state = defaultState,
  action: PictureChangeState
): PictureUploadStatus => {
  switch (action.type) {
    case "UPLOAD":
      return new PictureUploadStatusImpl(true, "");
    case "UPLOADED":
      return new PictureUploadStatusImpl(false, action.url);
    default:
      return defaultState;
  }
};

export default pictureChangeReducer;
