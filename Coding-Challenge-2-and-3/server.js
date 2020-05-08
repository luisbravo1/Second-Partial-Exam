const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const uuid = require( 'uuid' );
const { DATABASE_URL, PORT } = require( './config' );
const { Sports } = require('./models/sport-model');

const app = express();

/* Your code goes here */
app.post('/sports/post', jsonParser, ( req , res ) => {
    // let {id, name, num_players} = req.body;

    let newSport = {
        id: uuid.v4(),
        name: "Basketball",
        num_players: 5
    }

    Sports
        .createSport(newSport)
        .then(result => {
            if (result.length < 1) {
                res.statusMessage = `The are no sports with the id: ${sportid}`;
                return res.status(404).end();
            }
            return res.status(204).end();
        })
        .catch(err => {
            res.statusMessage = 'Something went wrong with the database. Try again later.'
            return res.status(500).end();
        });
})

app.delete('/sports/delete/:sportid', jsonParser, ( req , res ) => {
    let sportid = req.params.sportid;
    let bodyid = req.body.id
    console.log(`Deleting sport with id: ${sportid}`)

    if (bodyid == '') {
        res.statusMessage = 'The id is missing from the body.'
        return res.status(406).end()
    }

    if (sportid == '') {
        res.statusMessage = 'The id is missing from the param.'
        return res.status(406).end()
    }

    if (sportid !== bodyid) {
        res.statusMessage = 'The id from the body does not match the id from the param.'
        return res.status(409).end()
    }

    Sports
        .deleteSport(bodyid)
        .then(result => {
            if (result.length < 1) {
                res.statusMessage = `The are no sports with the id: ${sportid}`;
                return res.status(404).end();
            }
            return res.status(204).end();
        })
        .catch(err => {
            res.statusMessage = 'Something went wrong with the database. Try again later.'
            return res.status(500).end();
        });
});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});