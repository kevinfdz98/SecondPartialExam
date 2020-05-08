const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );


/* Your code goes here */

const sport = mongoose.Schema({
    id : {
        type : String, 
        unique : true, 
        required : true
    }, 
    name : {
        type : String, 
        required : true
    }, 
    num_players : {
        type : Number, 
        required : true
    }
}); 

const sportsCollection = mongoose.model('sports', sport)

const queries = {
    deleteSport : function(idTodelete){
        return sportsCollection
                        .deleteOne({'id': idTodelete})
                        .then(deleted =>{
                            return deleted; 
                        })
                        .catch(err=> {
                            return err; 
                        })
    }, 
    addSport : function(params){
        return sportsCollection
        .create({params})
        .then(created=>{
            return created; 
        })
        .catch(err=>{
            return err; 
        })
    }
}
module.exports = {queries};