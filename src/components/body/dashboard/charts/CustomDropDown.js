import classes from './CustomDropDown.module.css'

const CustomDropDown = () => {

    const options = ['op1', 'op2','op3'];
  return (
    <div classes= {classes.customDropDown}>
      <details>
        <summary>Test Dropdown</summary>
        <ul>
            {options.map((option, index) => <li key={index}>{option}</li>)}
        </ul>
      </details>
    </div>
  );
};

export default CustomDropDown;
