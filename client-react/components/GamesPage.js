/**
 * Created by karl on 05/02/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { fetchGamesAction } from '../actions/gameActions';
import GameList from './GameList';

class GamesPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchGamesAction());
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <GameList list={this.props.games}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ games }) => ({
  games: games[0]
});

export default connect(mapStateToProps)(GamesPage);