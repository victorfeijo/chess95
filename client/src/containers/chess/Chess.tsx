import * as React from 'react'
import { Col, Container, Row } from 'react-grid-system';
import { connect } from 'react-redux'
import { Window, WindowContent, WindowHeader } from 'react95';
import { bindActionCreators } from 'redux'

import { getBoard, possibleMoves } from '../../redux/ducks/chess'
import { Board } from './Board'
import { Hourglass } from './Hourglass'

import './board.scss'

export class ChessComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.getBoard()
  }

  render() {
    const { loading, errors } = this.props.board

    return (
      <Container>
        <Row>
          <Col>
            <div style={{ paddingTop: '80px' }}>
             <Window style={{ width: '100%' }}>
                <WindowHeader>chess95.exe</WindowHeader>
                <WindowContent>
                  { loading ? (
                    <Row align="center" justify="center">
                      <Col sm={1}>
                        <Hourglass size={28} />
                      </Col>
                      <Col sm={1} style={{ paddingLeft: 0 }}>Loading</Col>
                    </Row>
                  ) : (
                    <Board {...this.props} />
                  )}
                  { errors.length > 0 && (<p className="errors">{errors.join(', ')}</p>)}
                  </WindowContent>
              </Window>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  board: state.chess.board,
  knight: state.chess.knight,
})

const mapDispatchToProps = (dispatch) => ({
  getBoard: bindActionCreators(getBoard, dispatch),
  possibleMoves: bindActionCreators(possibleMoves, dispatch),
})

const Chess = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChessComponent)

export { Chess }
