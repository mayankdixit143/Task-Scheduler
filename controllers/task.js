
var mongoose= require('mongoose');

var bodyParser = require('body-parser');

//connect to db
mongoose.connect('mongodb+srv://test:test@task.qx6jj.mongodb.net/task?retryWrites=true&w=majority');

//create a schema
var todoSchema=new mongoose.Schema({
    item:String
});

//create a model which is based on schema
// in this Todo is the var and next Todo is the schema in which data will be stored
var Todo=mongoose.model('Todo', todoSchema);

// var itemone= Todo({ item:'buy fruits'}).save(function (err) {
//     if(err){
//         throw err;
//     }
//     console.log('item saved');
// })


var data =[
    {item:'get Milk'},
    {item:'walk dog'},
    {item:' kick some coding on leetcode'}
]

var urlencodedParser = bodyParser.urlencoded({ extended: false });//this is the middleware we will enrolled
// int this post req 

module.exports = function (app) {
    //so by using the controller we can create the routes and controls our operations like get req post req
    //delete from the list
    
    app.get('/todo', function (req,res) {
        //get data from mongodb
        //find function is used to find in the collection 
        Todo.find({}, function (err, data) {
            if (err) return err;
            res.render('todo', {work: data});   
        })
        
    });

    app.post('/todo',urlencodedParser, function (req,res) {
        //get data from the view and add to db
        var newtask= Todo(req.body).save(function (err,data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    //In this when we push input data to the data array then we responds it into json format 
            /*so basically todo is the obeject of array by which we are itrating on this array so 
            we are comparing that data which we wants to delete with the data in the array
            if we found data then return true else false*/ 
    function myTrim(x) {
        return x.replace(/^\s+|\s+$/gm,'');
    }
    app.delete('/todo/:item', function (req,res) {
        //delete req item from the db
        // as in url there are - in between the words so if we find the word we replace with space
        Todo.find({item: myTrim(req.params.item.replace(/^\-[\w-]+\-$/, ' '))}).deleteOne(function(err, data) {
            if (err) {
                throw err;
            }
            console.log(res.json({data}));
        });
    });

};