import React from "react";
import propTypes from "prop-types";
import program from "./program.png";

import styled from "styled-components";

const StyledContainer = styled.span`
  display: inline-block;
`;
const StyledImg = styled.img`
  object-fit: cover;
  height: 100%;
  width: auto;
`;

export const Program = ({ size, ...otherProps }) => {
  return (
    <StyledContainer
      style={{
        width: size ? size : "30px",
        height: size ? size : "30px"
      }}
      {...otherProps}
    >
      <StyledImg src={program} alt="program" />
    </StyledContainer>
  );
};

Program.defaultProps = {
  size: '30px',
};

Program.propTypes = {
  size: propTypes.oneOfType([propTypes.string, propTypes.number]),
};
