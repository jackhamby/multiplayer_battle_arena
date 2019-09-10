import React from 'react';
import PlayerDetail from './player_detail';

class PlayerDetailWrapper extends React.Component {
    render(){
        return (
            <div className="col-12 container">
                <PlayerDetail></PlayerDetail>
            </div>
        )
    }
}

export default PlayerDetailWrapper;