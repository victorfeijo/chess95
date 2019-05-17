import * as React from 'react'
import { Col, Container, Row } from 'react-grid-system';
import { connect } from 'react-redux'
import { Window, WindowContent, WindowHeader } from 'react95';
import { bindActionCreators } from 'redux'

import { Icon } from '../../components/Icon'
import { getBoard } from '../../redux/ducks/chess/board'
import { clearKnight, possibleMoves } from '../../redux/ducks/chess/knight'
import * as selectors from '../../selectors/chess'
import { Board } from './Board'

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
            <div style={{ marginTop: '80px' }}>
             <Window style={{ width: '100%' }}>
               <WindowHeader>
                <div className="window__title">
                  <Icon name="program" size={20} className="window__title-icon" />
                  <span>chess95.exe</span>
                </div>
               </WindowHeader>
                <WindowContent>
                  { loading ? (
                    <Row align="center" justify="center">
                      <Col sm={1}>
                        <Icon name="hourglass" size={28} />
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
  board: selectors.selectBoard(state),
  boardRows: selectors.selectBoardRows(state),
  knight: selectors.selectKnight(state),
  possibleNotations: selectors.selectPossibleNotations(state),
})

const mapDispatchToProps = (dispatch) => ({
  clearKnight: bindActionCreators(clearKnight, dispatch),
  getBoard: bindActionCreators(getBoard, dispatch),
  possibleMoves: bindActionCreators(possibleMoves, dispatch),
})

const Chess = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChessComponent)

export { Chess }
