import * as React from 'react'
import { reset, themes } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Chess } from '../chess/Chess'
import { WindowsBar } from './WindowsBar'

import '../../config'
import './home.scss'

const ResetStyles = createGlobalStyle`
  ${reset}
`;

export const Home = () => (
  <div className="home">
    <ResetStyles />
    <ThemeProvider theme={themes.default}>
      <div>
        <WindowsBar />
        <Chess />
      </div>
    </ThemeProvider>
  </div>
)
