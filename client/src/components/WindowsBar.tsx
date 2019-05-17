import * as React from 'react'

import { AppBar, Button, Divider, List, ListItem, Toolbar } from 'react95';

import { Icon } from './Icon'

import './windows_bar.scss'

export class WindowsBar extends React.Component<any, any> {
  state = {
    open: false,
  }

  onClickStart = () => (
    this.setState((prevState) => ({
      open: !prevState.open,
    }))
  )

  render() {
    const { open } = this.state

    return (
      <AppBar style={{ zIndex: '10' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {open && (
              <List horizontalAlign="left" verticalAlign="bottom" open={open} onClick={this.onClickStart}>
                <a href="/">
                  <ListItem>
                    <div className="icon__box">
                      <Icon name="program" size={24} className="icon" />
                      <span>Chess 95</span>
                    </div>
                  </ListItem>
                </a>
                <Divider />
                <ListItem disabled>
                  <div className="icon__box">
                    <Icon name="computer" size={24} className="icon" />
                    <span>Login</span>
                  </div>
                </ListItem>
              </List>
            )}

            <Button onClick={this.onClickStart} active={open} style={{ fontWeight: 'bold' }}>
              <Icon name="logo" size={32} />
              <span style={{ marginLeft: '6px' }}>Start</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
