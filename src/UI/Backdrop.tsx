import React from 'react';
import classes from './Backdrop.module.css'

const Backdrop = () => {
    return <div className={classes.Backdrop}>
        {/* <div className="ldsSpinnerContainer"> */}
          <div className="ldsSpinner"></div>
        {/* </div> */}
    </div>
}

export default Backdrop;