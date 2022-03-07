import { Button, styled } from "@mui/material";

interface RemoveButtonCompProps {
  name: string;
}

const RemoveButtonComp = ({ name }: RemoveButtonCompProps) => {
  const RemoveButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "4px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#ff7675",
    borderColor: "#ff7675",
    marginTop: "1.9rem",
    marginLeft: "1.4rem",
    "&:hover": {
      backgroundColor: "#ff7675",
      borderColor: "#ff7675",
      boxShadow: "none",
    },
  });

  return <RemoveButton variant="contained">{name}</RemoveButton>;
};

export default RemoveButtonComp;
