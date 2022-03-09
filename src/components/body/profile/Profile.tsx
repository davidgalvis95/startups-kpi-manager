import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Card from "../../../hoc/Card";
import { SideBarMenuCard } from "../../../types/types";
import classes from "./Profile.module.css";
import UserModifiableSection from "./UserModifiableSection";
import PymeModifiableSection from "./PymeModifiableSection";
import { UserDataType } from "../../../types/userPymeTypes";
import useFileUploadAxios from "../../../hooks/useFileUploadAxios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducer";
import RemoveButtonComp from "../../../hoc/remove-button/RemoveButtonComp";

interface ProfileProps {
  user: UserDataType;
}

const defualtUser: UserDataType = {
  id: "30a97c3f-81ec-41bd-822e-a43eb63f60d6",
  firstName: "",
  lastName: "",
  cityOfResidence: "",
  countryOfResicence: "",
  address: "",
  photoUrl: "./assets/images/profile.png",
  phone: "",
  emailAddress: "",
  rights: "",
  pymeId: "",
  pyme: {
    pymeId: "",
    active: true,
    name: "",
    city: "",
    country: "",
    address: "",
    emailAddress: "",
    photoUrl: "",
    phone: "",
  },
};

const Profile = () => {
  const { isLoading, imageUrl } = useSelector(
    (state: RootState) => state?.pictureChangeReducer
  );

  const { user } = useSelector(
    (state: RootState) => state?.userReducer
  );

  const { uploadImagePointer } = useFileUploadAxios();

  useEffect(() => {
    const newUser = { ...user, photoUrl: imageUrl };
    // TODO: send api request to save image
  }, [imageUrl]);

  const uploadPhoto = (files: FileList | null): void => {
    if (files) {
      uploadImagePointer(files[0]);
    }
  };

  const exitHandler = () => {
    // TODO:implement this
  }

  const outputComponent = (
    <Grid container>
      <Grid item xs={12} sm={12} md={6}>
        <Grid xs={12}>
          <Card width={80} padding={"1rem"}>
            <div>
              <div className={classes.photoContainer}>
                {isLoading ? (
                  <div className={classes.ldsSpinner}></div>
                ) : (
                  <img
                    className={classes.profileImage}
                    src={imageUrl === "" ? defualtUser.photoUrl : imageUrl}
                    width="100%"
                  />
                )}
              </div>
              <div className={classes.imageUploadCont}>
                <div className={classes.fileInput}>
                  <input
                    type="file"
                    id="file"
                    className={classes.file}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      uploadPhoto(event.target.files)
                    }
                  />
                  <label>
                    Cargar Foto
                    <p className={classes.fileName}></p>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <div>
          <Card width={80} padding={"1rem"}>
            <UserModifiableSection userData={user!} />
          </Card>
        </div>
        <div>
          <Card width={80} padding={"1rem"}>
            <PymeModifiableSection
              pymeData={user!.pyme}
              accessRights={user!.rights}
            />
          </Card>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Card width={90} padding={"1rem"}>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
        <div className={classes.title}>
          {/* TODO set this to be dynamic */}
          <label>Formulario Para Actualizacion de Informacion de Usuario y Start-up</label>
        </div>
        <RemoveButtonComp name={"Salir"} click={exitHandler} marginTop={"0rem"}/>
        </div>

        </Card>

      <div>
        <div>{outputComponent}</div>
      </div>
    </div>
  );
};

export default Profile;
