import classNames from 'classnames'
import { includes } from 'ramda'
import * as React from 'react'
import { Col, Row, Visible } from 'react-grid-system';
import { Fieldset } from 'react95';

import { BoardActions } from './BoardActions'

import './board.scss'

export class Board extends React.Component<any, any> {
  state = {
    displayGrid: false,
    knight: null,
  }

  updateKnight = (position) => () => {
    this.setState({ knight: position })

    this.props.clearKnight()
  }

  onChangeDisplayGrid = () => (
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
    const { knight, displayGrid } = this.state
    const { boardRows, possibleNotations } = this.props

    return (
      <Row>
        <Col md={7}>
          <Fieldset>
            <div className="box">
              <div className="board">
                { !this.props.board.loading && boardRows.map((row, rowIdx) => (
                <div className="board__row" key={`board__row-${rowIdx}`}>
                  {row.map(({ notation }, squareIdx) => (
                    <div
                      className={this.squareClasses(notation, possibleNotations)}
                      key={`square-${rowIdx}${squareIdx}`}
                      onClick={this.updateKnight(notation)}>
                      { (displayGrid && rowIdx === 0) && (
                        <div className="board__label-top">{notation[0]}</div>
                      )}
                      { (displayGrid && squareIdx === 0) && (
                        <div className="board__label-left">{notation[1]}</div>
                      )}
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
          <BoardActions
            knightPosition={knight}
            displayGrid={displayGrid}
            onChangeDisplayGrid={this.onChangeDisplayGrid}
            {...this.props}
          />
        </Col>
      </Row>
    )
  }
}
