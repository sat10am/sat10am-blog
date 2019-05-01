import React from "react";
import PropTypes from "prop-types";
import { Logo } from "./Icons";

const SVGIcon = props => {
  const iconMap = {
    logo: Logo,
  };
  const { id } = props;

  const Icon = iconMap[id];

  return <Icon className={`icon-${id}`} {...props} />;
};

SVGIcon.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.number,
};

SVGIcon.defaultProps = {
  size: 16,
};

export default SVGIcon;
