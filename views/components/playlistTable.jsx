var React = require('react');
var Playlist = require('./playlist');
var HTMLHead = require('./head')

class PlaylistTable extends React.Component{
    render(){
        return (
            <html>
                <HTMLHead></HTMLHead>
                <body>
                    <table>
                        {this.props.playlists.map(row => {
                            return(
                                <tr>
                                    {row.map(pl =>{ return <td><Playlist image={pl.image} name={pl.name}></Playlist></td>})}
                                </tr>
                            )
                        })}
                    </table>
                </body>
            </html>
        );
    }
    
}

module.exports = PlaylistTable;