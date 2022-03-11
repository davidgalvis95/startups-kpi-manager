import React, { ReactChildren, ReactChild } from "react";

import classes from "./Card.module.css";

interface CardProps {
  children: ReactChild | ReactChildren;
  width: number;
  padding: string;
}

const Card = ({ children, width, padding }: CardProps) => {
  const style = {
    width: width + "%",
    padding: padding,
  };
  return (
    <div className={classes.card} style={style}>
      {children}
    </div>
  );
};

export default Card;
