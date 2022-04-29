
let express = require('express')
const { route } = require('express/lib/application')
let router = express.Router()

let stateData = require('./state_fact.json')

// Permit requests from fetch requests in browsers 
router.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

router.get('/about', function(req, res, next) {
    return res.json({
        'about': 'A state fact API to share interesting informations about the different states of the United States Of America'
    })
})

router.get('/state-list', function(req, res, next) {
    let stateNames = Object.keys(stateData)  // array of all the keys from the object
    console.log(stateNames)
    res.json(stateNames)
})

// /fact/Minnesota responds with a fact about Minnesota
// /fact/qwerty responds with 404 State Not Found 
router.get('/fact/:stateName', function(req, res, next){
    let stateName = req.params.stateName 
    let fact = stateData[stateName]
    if (fact) {
        res.json({ name: stateName, fact: fact })
    } else {
        res.status(404).send('State not found')
    }

    /* To send an error to the error handlers
    next(Error('Oops')) // not in a callback/then/catch
    return next(Error('Oops'))  // from a callback/then/catch
    You'd obviously provide more useful info in the message.
    You may have an error object, for example, from Sequelize, that you can pass to the error handler. 
    */
})

/*
router.get('/fact/:stateInitial', function(req,res,next){
    let stateInitial = req.params.stateInitial
    let stateNames = Object.keys(stateData)
    for( let stateindex in stateNames){
        let state = stateNames[stateindex]
        if(state.startsWith(stateInitial){
            let fact = stateData[state]
            if(fact){
                res.json({name: state, fact: fact})
            } else {
                res.send(404).send('No state with such initial')
            }
        })
    }
})
*/

router.get('/fact/letter/:letter', function(req, res, next){
    let initial = req.params.letter
    if(initial.length > 1){ // checks if the length of state initial that user entered is greater than one
        initial = initial[0].toUpperCase() + initial.slice(1) // capitalises the first character since all States initials are capitilized, result of mi or Mi would result in same
    } else {
        initial = initial.toUpperCase() // makes sure the single letter user entered is capitalised.
    }
    let states = {}
    for(state in stateData){
        if(state.startsWith(initial)){
            states[state] = stateData[state]
        }
    }
    if(Object.keys(states).length === 0) { // checks if states object is empty
        res.status(404).send('State not found') // returns this states not found when the letter entered doesn't match any states like /qwerty or /1233
    } else {
        res.json(states)
    }
})
module.exports = router