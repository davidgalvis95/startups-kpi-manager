import classes from "./CustomButton.module.css";

interface ProfileCustomButtonProps {
  clickHandler: () => void;
  text: string;
  padding: string;
  width: string;
  fontSize: string;
}

const CustomButton: React.FC<ProfileCustomButtonProps>  = ({
  clickHandler,
  text,
  padding,
  width,
  fontSize
}: ProfileCustomButtonProps) => {
  const buttonStyle = {
    padding: padding,
    width: width,
    fontSize: fontSize,
  };

  return (
    <div className={classes.buttonWrapper}>
      <button
        className={classes.buttonEl}
        onClick={clickHandler}
        style={buttonStyle}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
