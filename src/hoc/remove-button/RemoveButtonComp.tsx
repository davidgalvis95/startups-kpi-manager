import { Button, styled } from "@mui/material";

interface RemoveButtonCompProps {
  name: string;
  index?: number;
  click?: Function;
  marginTop?: string;
}

const RemoveButtonComp = ({
  name,
  index = -1,
  click = (e: any, index: number) =>
    console.error("Cannot execute function: undefined"),
  marginTop = "1.9rem",
}: RemoveButtonCompProps) => {
  const RemoveButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "4px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#ff7675",
    borderColor: "#ff7675",
    marginTop: marginTop,
    marginLeft: "1.4rem",
    "&:hover": {
      backgroundColor: "#ff7675",
      borderColor: "#ff7675",
      boxShadow: "none",
    },
  });

  return (
    <RemoveButton variant="contained" onClick={(e: any) => click(e, index)}>
      {name}
    </RemoveButton>
  );
};

export default RemoveButtonComp;
