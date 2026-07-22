import React from "react";
import { NavLink } from "react-router-dom";

export function LinkContainer({ children, to }) {
  return React.cloneElement(children, {
    as: NavLink,
    to,
  });
}
