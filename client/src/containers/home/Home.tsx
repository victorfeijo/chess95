import * as React from 'react'
import { reset, themes, AppBar, Toolbar } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Chess } from '../chess/Chess'

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
        <AppBar>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <h1>oi</h1>
          </Toolbar>
        </AppBar>
        <Chess />
      </div>
    </ThemeProvider>
  </div>
)
