import * as React from 'react'
import { Col, Container, Row } from 'react-grid-system';
import { connect } from 'react-redux'
import { Window, WindowContent, WindowHeader } from 'react95';
import { bindActionCreators } from 'redux'

import { getBoard, possibleMoves } from '../../redux/ducks/chess'
import { Board } from './Board'

export class ChessComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.getBoard()
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div style={{ paddingTop: '80px' }}>
             <Window style={{ width: '100%' }}>
                <WindowHeader>chess95.exe</WindowHeader>
                <WindowContent>
                  <Board {...this.props} />
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
