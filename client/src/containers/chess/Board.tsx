import { includes, splitEvery, union } from 'ramda'
import * as React from 'react'
import { Col, Row } from 'react-grid-system';
import { Button, Fieldset, NumberField } from 'react95';

import { Hourglass } from './Hourglass'

import './board.scss'

const horseImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Chess_tile_nd.svg/240px-Chess_tile_nd.svg.png'

export class Board extends React.Component<any, any> {
  state = {
    knight: null,
    turns: 2,
    errors: [],
  }

  updateKnight = (position) => () => (
    this.setState({ knight: position })
  )

  onChangeTurns = (turns) => (
    this.setState({ turns })
  )

  onClickPossibleMoves = () => {
    const { possibleMoves } = this.props
    const { knight, turns } = this.state

    let errors = ['You should choose a start position first.']

    if (knight) {
      possibleMoves(knight, turns)

      errors = []
    }

    this.setState({ errors })
  }

  render() {
    const { knight, turns } = this.state
    const { possibleMoves, loading } = this.props.knight

    const errors = union(this.props.knight.errors, this.state.errors)

    const possibleNotations = possibleMoves.map(move => move.notation)
    const rows = splitEvery(8, this.props.board.squares)

    return (
      <Row>
        <Col sm={8}>
          <Fieldset>
            <div className="board">
              { !this.props.board.loading && rows.map((row, rowIdx) => (
              <div className="board__row" key={`board__row-${rowIdx}`}>
                {row.map(({ notation }, squareIdx) => (
                <div
                  className={`square ${includes(notation, possibleNotations) ? 'highlight' : ''}`}
                  key={`square-${rowIdx}${squareIdx}`}
                  onClick={this.updateKnight(notation)}>
                    { notation === knight ? (
                      <img className="horse" src={horseImage} />
                    ) : '' }
                  </div>
                ))}
              </div>
              )) }
            </div>
          </Fieldset>
        </Col>
        <Col sm={4}>
          <Fieldset>
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
                    <Hourglass size={28} />
                  </Col>
                  <Col style={{ paddingLeft: 0 }}>Loading</Col>
                </Row>
              ) : (
                <span>Possible Moves</span>
              )}
            </Button>
          </Fieldset>
        </Col>
      </Row>
    )
  }
}
