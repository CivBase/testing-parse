var express = require('express');
var app = express();

// routes
app.get('/app.js', function(request, response) {
    'use strict';

    if (process.env.PRODUCTION) {
        response.sendFile(__dirname + '/build/app.js');
        return;
    }

    response.redirect('//localhost:9090/build/app.js');
});

app.get('*', function(request, response) {
    'use strict';

    response.sendFile(__dirname + '/build/index.html');
});

app.post('/home', function(request, response) {
    'use strict';

    response.json({
        title: 'Testing Parse'
    });
});

app.post('/login', function(request, response) {
    'use strict';

    response.json({
        title: 'Login'
    });
});

app.post('/register', function(request, response) {
    'use strict';

    response.json({
        title: 'Register'
    });
});

// start hot module replacement server
if (!process.env.UBR_PRODUCTION) {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('./webpack.local.config');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        noInfo: true,
        historyApiFallback: true
    }).listen(9090, 'localhost', function(error) {
            'use strict';

            if (error) {
                console.log(error);
            }
        });
}

// start app server
var port = process.env.UBR_PORT || 8080;
var server = app.listen(port, function() {
    'use strict';

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
