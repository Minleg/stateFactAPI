let express = require('express')
let routes = require('./routes/facts.js')

let app = express()

app.use('/api', routes)

let server = app.listen(process.env.PORT || 3000, function() {
    console.log('app running on port', server.address().port)
})