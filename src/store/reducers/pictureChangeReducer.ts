import { PictureChangeState } from "../actions/pictureChangeActions";


interface PictureUploadStatus {
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

const defaultState: PictureUploadStatus = {
  isLoading: false,
  imageUrl: undefined,
};

const pictureChangeReducer = (
  state = defaultState,
  action: PictureChangeState
): PictureUploadStatus => {
  switch (action.type) {
    case "UPLOADING":
      return new PictureUploadStatusImpl(true, "");
    case "UPLOADED":
      return new PictureUploadStatusImpl(false, action.url);
    default:
      return state;
  }
};

export default pictureChangeReducer;
