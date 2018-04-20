var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var path = require('path');

app.use(express.static( __dirname + '/angular/dist' ));

var PetSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name must be 3 or more characters!'], minlength: 3},
    type: {type: String, required: [true, 'Type must be 3 or more characters!'], minlength: 1},
    desc: {type: String, required: [true, 'Description must be 3 or more characters!'], minlength: 1},
    skill1: {type: String, required: false, default: " "}, 
    skill2: {type: String, required: false, default: " "}, 
    skill3: {type: String, required: false, default: " "},
    likes: {type: Number, default: 0}
}, {timestamps: true });

mongoose.model('Pet', PetSchema);

var Pet = mongoose.model('Pet');

app.use(bodyParser.json());

app.use(express.static( __dirname + '/angular/dist' ));

mongoose.connect('mongodb://localhost/pet');

mongoose.Promise = global.Promise;

app.post('/new', function(request, response){ //add pet
    console.log("p",request.body.type)
    var add = new Pet(
        {name: request.body.name, 
        type: request.body.type,
        desc: request.body.desc, 
        skill1: request.body.skill1, 
        skill2: request.body.skill2, 
        skill3: request.body.skill3}
    )
    console.log("add",add)
    add.save(function(err){
        if(err){
            console.log("err")
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success!", data: add});
        }
    })
})

app.get('/getPets', function(request, response) { //view all pets
    Pet.find({}, function(err, task) {
    if(err) {
        console.log("returned error", err)
        response.json({message: "Error", error: err})
    }
    else {
        response.json({message: "success", data: task})
        }
    })
})

app.delete("/adoptPet/:id", function(request, response)  { //delete pet
    Pet.remove({_id: request.params.id}, function(err){
        if(err){
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success"});
        }
    })
})

app.put("/likePet/:id", function(request, response){ //Like pet
    Pet.findOne({_id: request.params.id}, function(err, pets){
        console.log(request.body)
        pets.likes +=1;

    pets.save(function(err){
        if(err){
            console.log("error")
            response.json({message: "Error", error: err});
        }
        else{
            console.log("success")
            response.json({message: "success", data: pets});
        }
    })
})
})

app.put("/update/:id", function(request, response) { //update pet
    Pet.findOne({_id: request.params.id}, function(err, pets){
        pets.name = request.body.name;
        pets.type = request.body.type;
        pets.desc = request.body.desc;
        pets.skill1 = request.body.skill1;
        pets.skill2 = request.body.skill2;
        pets.skill3 = request.body.skill3;
    pets.save(function(err){
        if(err){
            console.log("error update")
            response.json({message: "Error", error: err});
        }
        else{
            console.log("success update")
            response.json({message: "success", data: pets});
        }
    })
})
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})