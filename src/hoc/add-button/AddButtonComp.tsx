import { Button, styled } from "@mui/material";

interface AddButtonCompProps {
  name: string;
}

const AddButtonComp = ({ name }: AddButtonCompProps) => {
  const AddButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "4px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#45aaf2",
    borderColor: "#45aaf2",
    marginTop: "1.9rem",
    marginLeft: "1.4rem",
    "&:hover": {
      backgroundColor: "#45aaf2",
      borderColor: "#45aaf2",
      boxShadow: "none",
    },
  });
  return <AddButton variant="contained">{name}</AddButton>;
};

export default AddButtonComp;
