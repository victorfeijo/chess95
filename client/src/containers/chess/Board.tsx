import classNames from 'classnames'
import { includes, splitEvery, union } from 'ramda'
import * as React from 'react'
import { Col, Row, Visible } from 'react-grid-system';
import { Button, Checkbox, Fieldset, NumberField } from 'react95';

import { Icon } from '../../components/Icon'

import './board.scss'

export class Board extends React.Component<any, any> {
  state = {
    knight: null,
    turns: 2,
    displayGrid: false,
    errors: [],
  }

  updateKnight = (position) => () => {
    this.setState({ knight: position })

    this.props.clearKnight()
  }

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

  onChangeCheckbox = () => (
    this.setState((prevState) => ({...prevState, displayGrid: !prevState.displayGrid }))
  )

  squareClasses = (notation, possibleNotations) => (
    classNames('square', {
      horse: notation === this.state.knight,
      highlight: includes(notation, possibleNotations),
      first: notation === 'A8',
    })
  )

  render() {
    const { turns, displayGrid } = this.state
    const { possibleMoves, loading } = this.props.knight

    const errors = union(this.props.knight.errors, this.state.errors)

    const possibleNotations = possibleMoves.map(move => move.notation)
    const rows = splitEvery(8, this.props.board.squares)

    return (
      <Row>
        <Col md={7}>
          <Fieldset>
            <div className="box">
              <div className="board">
                { !this.props.board.loading && rows.map((row, rowIdx) => (
                <div className="board__row" key={`board__row-${rowIdx}`}>
                  {row.map(({ notation }, squareIdx) => (
                    <div
                      className={this.squareClasses(notation, possibleNotations)}
                      key={`square-${rowIdx}${squareIdx}`}
                      onClick={this.updateKnight(notation)}>
                      { (displayGrid && rowIdx === 0) && (<div className="board__label-top">{notation[0]}</div>)}
                      { (displayGrid && squareIdx === 0) && (<div className="board__label-left">{notation[1]}</div>)}
                    </div>
                  ))}
                </div>
                )) }
              </div>
            </div>
          </Fieldset>
        </Col>
        <Visible sm xs>
          <div style={{ padding: '12px' }} />
        </Visible>
        <Col md={5}>
          <Fieldset>
            <Row>
              <Col>
                <Checkbox
                  checked={displayGrid}
                  onChange={this.onChangeCheckbox}
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
        </Col>
      </Row>
    )
  }
}
