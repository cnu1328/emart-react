import React from "react";
import { StyledBadge } from "./style";

export const Badge = (props: { background: string; text: React.ReactNode; }) => {

  return (
    <StyledBadge centered background={props.background}>{props.text}</StyledBadge>
  )
};