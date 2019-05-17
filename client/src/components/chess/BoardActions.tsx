import * as React from 'react'
import { Col, Row } from 'react-grid-system';
import { Button, Checkbox, Fieldset, NumberField } from 'react95';

import { Icon } from '../../components/Icon'

import './board.scss'

export class BoardActions extends React.Component<any, any> {
  state = {
    turns: 2,
    errors: [],
  }

  onChangeTurns = (turns) => (
    this.setState({ turns })
  )

  onClickPossibleMoves = () => {
    const { knightPosition, possibleMoves } = this.props
    const { turns } = this.state

    let errors = ['You should choose a start position first.']

    if (knightPosition) {
      possibleMoves(knightPosition, turns)

      errors = []
    }

    this.setState({ errors })
  }

  render() {
    const { turns } = this.state
    const { displayGrid, knight, onChangeDisplayGrid } = this.props
    const { loading } = knight

    const errors = [...this.props.knight.errors, ...this.state.errors]

    return (
      <Fieldset>
        <Row>
          <Col>
            <Checkbox
              checked={displayGrid}
              onChange={onChangeDisplayGrid}
              label="Display Grid"
            />
          </Col>
        </Row>
        <Row align="center" style={{ marginTop: '12px' }}>
          <Col sm={4}>
            <span>Turns:</span>
          </Col>
          <Col sm={8}>
            <NumberField min={1} value={turns} onChange={this.onChangeTurns} />
          </Col>
        </Row>
        { errors.length > 0 && (<p className="errors">{errors.join(', ')}</p>)}
        <Button
          fullWidth
          onClick={this.onClickPossibleMoves}
          style={{ marginTop: '20px' }}
          disabled={loading}
          >
          { loading ? (
            <Row align="center">
              <Col>
                <Icon name="hourglass" size={28} />
              </Col>
              <Col style={{ paddingLeft: 0 }}>Loading</Col>
            </Row>
          ) : (
            <span>Possible Moves</span>
          )}
        </Button>
      </Fieldset>
    )
  }
}

