import React, {useState, useEffect} from "react";
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import classes from "./CustomSelectComp.module.css";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  min-height: 35px;
  min-width: 300px;
  background: ${"#3c6382"};
  border: 1px solid ${"#00a8ff"};
  border-radius: 4px;
  margin: 0em;
  margin-top: 0.02em;
  padding: 5px;
  padding-left: 10px;
  text-align: left;
  line-height: 1;
  color: ${"#c7ecee"};

  &:hover {
    background: ${""};
    border: 2px solid ${"#00a8ff"};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${"#00a8ff"};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 300px;
  min-height: 35px;
  background: ${"#3c6382"};
  border: 1px solid ${grey[800]};
  border-radius: 0.75em;
  color: ${"#c7ecee"};
  overflow: auto;
  outline: 0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 3px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${blue[900]};
    color: ${blue[100]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${blue[900]};
    color: ${blue[100]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${grey[700]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${grey[800]};
    color: ${grey[300]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

const CustomSelectComp = (props) => {
  const handleClick = (e, index) => {
    props.click(e, index);
  };

  // const [defValue, setDefValue] = useState(10000);

  // useEffect(()=>{
  //   console.log(props.value)
  //   if(props.value !==''){
  //     setDefValue(props.value)
  //   }
  // },[props.value])

  return (
    <div>
      <p className={classes.textBoxLabel}>{props?.label}</p>
      <CustomSelect defaultValue={10000} disabled={props.disabled}>
        <StyledOption value={10000} style={{ display: "none" }}>
          {props.value? props.value:'Seleccione una opcion'}
        </StyledOption>
        {props?.values?.map((value, i) => {
          return (
            <StyledOption key={value} value={value}>
              <div onClick={(e) => handleClick(e, i)}>{value}</div>
            </StyledOption>
          );
        })}
      </CustomSelect>
    </div>
  );
};

export default CustomSelectComp;
