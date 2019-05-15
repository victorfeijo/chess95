import { includes, splitEvery } from 'ramda'
import * as React from 'react'
import { Col, Row } from 'react-grid-system';
import { Button, Fieldset, NumberField } from 'react95';

import './board.scss'

const horseImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Chess_tile_nd.svg/240px-Chess_tile_nd.svg.png'

export class Board extends React.Component<any, any> {
  state = {
    knight: null,
  }

  updateKnight = (position) => () => (
    this.setState({ knight: position })
  )

  onClickPossibleMoves = () => {
    const { possibleMoves } = this.props
    const { knight } = this.state

    if (knight) {
      possibleMoves(knight)
    }
  }

  render() {
    const { knight } = this.state
    const possibleMoves = this.props.knight.possibleMoves.map(move => move.notation)
    const rows = splitEvery(8, this.props.board.squares)

    return (
      <Row>
        <Col sm={8}>
          <div className="board">
            { !this.props.board.loading && rows.map((row, rowIdx) => (
            <div className="board__row" key={`board__row-${rowIdx}`}>
              {row.map(({ notation }, squareIdx) => (
              <div
                className={`square ${includes(notation, possibleMoves) ? 'highlight' : ''}`}
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
        </Col>
        <Col sm={4}>
          <Fieldset>
            <NumberField value={2} onChange={value => console.log(value)} />
            <Button fullWidth onClick={this.onClickPossibleMoves} style={{ marginTop: '40px' }}>
              Possible Moves
            </Button>
          </Fieldset>
        </Col>
      </Row>
    )
  }
}
