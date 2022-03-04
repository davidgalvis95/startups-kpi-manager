import React from "react";
import { Grid } from "@mui/material";
import Card from "../../../hoc/Card";
import { SideBarMenuCard } from "../../../types/types";
import classes from "./Profile.module.css";
import ProfileModifiableSection from "./ProfileModifiableSection";
import CustomButton from "../../../hoc/CustomButton";

interface ProfileProps {
  card: SideBarMenuCard;
}

const Profile = ({ card }: ProfileProps) => {
  // TODO implement this function
  const uploadPhoto = (): void => {};

  const outputComponent = (
    <Grid container>
      <Grid item xs={12} sm={12} md={6}>
        <Grid xs={12}>
          <Card width={80} padding={"1rem"}>
            <div>
              <div className={classes.photoContainer}>
                <img
                  className={classes.profileImage}
                  src={card.photoUrl}
                  width="100%"
                />
              </div>
              <CustomButton
                clickHandler={() => uploadPhoto()}
                text={"Cargar Foto"}
                padding={"8px"}
                width={"70px"}
                fontSize={"12px"}
              />
            </div>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <div>
          <Card width={80} padding={"1rem"}>
            <ProfileModifiableSection />
          </Card>
        </div>
        <div>
          <Card width={80} padding={"1rem"}>
            <ProfileModifiableSection />
          </Card>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <div>{outputComponent}</div>
    </div>
  );
};

export default Profile;
