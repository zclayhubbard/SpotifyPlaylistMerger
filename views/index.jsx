var React = require('react');
var HTMLHead = require('./components/head');

function LoginPage(props){
    return (
        <html>
            <HTMLHead></HTMLHead>
            <body>
            <div className='container-fluid'>
                <h1>Spotify Playlist Merger</h1>
                <a href='/login' className='btn btn-success col-2 offset-5'>Log Into Spotify</a>
            </div>
            </body>
        </html>
    )
}

module.exports = LoginPage;