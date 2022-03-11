export interface PictureChangeState {
  type: string;
  url?: string;
}

export class PictureChangeStateImpl implements PictureChangeState {
  type: string;
  url?: string;

  constructor(public typeOfAction: string, public uri: string) {
    this.type = typeOfAction;
    this.url = uri;
  }

  public getType(): string {
    return this.type;
  }
}

const clear: Function = (request: PictureChangeState): PictureChangeState => {
  // console.log(request);
  return {
    type: request.type,
  };
};

const uploadPictureAction: Function = (
  request: PictureChangeState
): PictureChangeState => {
  // console.log(request);
  return {
    type: request.type,
    url: "",
  };
};

const pictureUploadedAction: Function = (
  request: PictureChangeState
): PictureChangeState => {
  return {
    type: request.type,
    url: request.url,
  };
};

export default {
  uploadPictureAction,
  pictureUploadedAction,
  clear
};
