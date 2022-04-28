let express = require('express')
let routes = require('./routes/facts.js')
let path = require('path')

let app = express()

app.use(express.static(path.join(__dirname, 'content')))

app.use('/api', routes)

// error handlers
app.use(function(req, res, next){
    res.status(404).send('Not found')
})

app.use(function(err, req, res, next){ 
    console.error('Request to ' + req.originalUrl + ' errored because\n', err)
    res.status(500).send('Server error')
})

let server = app.listen(process.env.PORT || 3000, function() {
    console.log('app running on port', server.address().port)
})