import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import logo from './icons/logo.png';
import horse from './icons/horse.png';
import hourglass from './icons/hourglass.gif';
import program from './icons/program.png';
import computer from './icons/computer.png';

const StyledContainer = styled.span`
  display: inline-block;
`;
const StyledImg = styled.img`
  object-fit: cover;
  height: 100%;
  width: auto;
`;

const icons = {
  'logo': logo,
  'horse': horse,
  'hourglass': hourglass,
  'program': program,
  'computer': computer,
}

export const Icon = ({ name, size, ...otherProps }) => {
  return (
    <StyledContainer
      style={{
        width: size ? size : "30px",
        height: size ? size : "30px"
      }}
      {...otherProps}
    >
      <StyledImg src={icons[name]} alt={name} />
    </StyledContainer>
  );
};

Icon.defaultProps = {
  name: 'logo',
  size: '30px',
};

Icon.propTypes = {
  name: propTypes.string,
  size: propTypes.oneOfType([propTypes.string, propTypes.number]),
};
