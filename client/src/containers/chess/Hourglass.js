import React from "react";
import propTypes from "prop-types";
import hourglass from "./hourglass.gif";

import styled from "styled-components";

const StyledContainer = styled.span`
  display: inline-block;
`;
const StyledImg = styled.img`
  object-fit: cover;
  height: 100%;
  width: auto;
`;

export const Hourglass = ({ size, ...otherProps }) => {
  return (
    <StyledContainer
      style={{
        width: size ? size : "30px",
        height: size ? size : "30px"
      }}
      {...otherProps}
    >
      <StyledImg src={hourglass} alt="hourglass" />
    </StyledContainer>
  );
};

Hourglass.defaultProps = {
  size: '30px',
};

Hourglass.propTypes = {
  size: propTypes.oneOfType([propTypes.string, propTypes.number]),
};
