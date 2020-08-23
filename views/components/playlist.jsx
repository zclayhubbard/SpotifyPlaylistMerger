var React = require('react');
// import yoda from "./yeet baby.jpg";

function Playlist(props){
    return (
        <div className='playlist'>
            <img src={props.image} width='300px' height='300px'/>
            <h3>{props.name}</h3>
        </div>
    );
}

module.exports = Playlist;