const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {queries} = require('./models/sport-model'); 
const app = express();


/* Your code goes here */
app.delete('/sports/delete', (req, res)=>{
    let idBody = req.body.id; 
    let idParam = req.query.id; 

    if (!idParam)
    {
        res.statusMessage("You must send the id of the sport to delete on the query of the request"); 
         return res.status(406).end(); 
    }

     if (!idBody)
     {
         res.statusMessage("You must send the id of the sport to delete on the body of the request"); 
         return res.status(406).end(); 
     }

     if(idParam !== idBody)
     {
        res.statusMessage("The id's sent are different from each other"); 
        return res.status(409).end(); 
     }
     queries
            .deleteSport(idBody)
            .then(result=>{
                console.log(result)
                return res.status(204).end(); 
            })
            .catch(err=> {
                res.statusMessage(err);
                return res.status(500).end();  
            })



})

app.post('/create/sport/',jsonParser, (req, res)=>{
    let id = req.body.id; 
    let titulo = req.body.titulo; 
    let num_players = req.body.num_players; 

    let created = {id, titulo, num_players}; 

    queries
        .addSport(created)
        .then(result=>{
            console.log(result)
            return res.status(204).end(); 
        })
        .catch(err=> {
            res.statusMessage(err);
            return res.status(500).end();  
        })
})


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