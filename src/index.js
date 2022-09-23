const express = require('express');
const app = express();
// port number of the server
const PORT = 3000;
// calling routes
const routes = require('../routes/routes');
// transforming the req.body into json
app.use(express.json());
// use routes to make the request
app.use('/', routes); 
// if not using any routes return the message below
app.get('*', (req, res) =>{ res.send('Aconteceu um erro, reinicie sua página ou aplicativo')})

app.listen(PORT);


