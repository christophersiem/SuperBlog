const app = require('../app')

app.get('/api/ping',(req, res) =>
res.send('PONG'))

module.exports = app;
