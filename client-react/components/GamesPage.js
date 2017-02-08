/**
 * Created by karl on 05/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {fetchGamesAction} from '../actions/gameActions';
import GameList from './GameList';

class GamesPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchGamesAction());
  }

  render() {
    const {games} = this.props;
    return (
      <div className="row">
        <div className="col-xs-12">
          <GameList list={games}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({games}) => ({
  games: games
});

export default connect(mapStateToProps)(GamesPage);