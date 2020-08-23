var express = require('express');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

const app = express();

// app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(cookieParser());

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

var client_id = 'c79e14c29df141a7913f82ffeeff89b9'; // Your client id
var client_secret = ; // Your secret
var redirect_uri = 'http://localhost:8888/showplaylists'; // Your redirect uri

app.get('/', function(req, res){
    res.render('index', {});
})

app.get('/login', function(req, res) {
    console.log('Login Button Clicked');

    var scope = 'user-read-private user-read-email playlist-read-collaborative playlist-modify-private playlist-read-private playlist-modify-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri
        }));
});

app.get('/showplaylists', function(req, res){
    console.log('Logged In!');
    var options = {root: __dirname + '/public'};
    // res.sendFile('show-playlists.html', options);
    // console.log('Displaying Playlist List')

    var code = req.query.code || null;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body){
        if(!error && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            var options = {
                url: 'https://api.spotify.com/v1/me/playlists?&limit=50',
                headers: {'Authorization': 'Bearer ' + access_token},
                json:true
            }

            request.get(options, function(error, response, body){
                var playlistarray = body.items;
                var next = body.next;
                var playlistsflat = [];

                for(playlist of playlistarray){
                    let imgsrc = '';
                    if(playlist.images.length > 0){
                        imgsrc = playlist.images[0].url;
                    }
                    const title = playlist.name;

                    const pl = {
                        image: imgsrc,
                        name: title,
                    }
                    
                    playlistsflat.push(pl)
                }
                
                const rowLength = 5;
                let numRows = Math.ceil(playlistsflat.length / rowLength);
                var playliststable = []                
                for(let i=0; i < numRows; i++){
                    row = playlistsflat.slice(rowLength*i, (rowLength*i)+rowLength);
                    playliststable.push(row);
                }

                res.render('./components/playlistTable', {playlists: playliststable});

            })
        }
    });


});

console.log('Listening on port 8888');
app.listen(8888);
