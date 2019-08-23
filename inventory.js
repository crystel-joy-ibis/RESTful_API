const mysql = require ('mysql');

const express = require ('express');
var app = express();
const bodyparser = require ('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Myrootpassword123',
    database: 'inventory'

});

mysqlConnection.connect((err)=>{
    if (!err)
       console.log('Database Connection Succeded.');
    else    
       console.log('Database Connection Failed \n Error : ' + JSON.stringify(err,undefined,2));
});

app.listen(5000,() =>console.log('Express server is running at port no :5000'));

app.get('./items', (req,res)=>{
    mysqlConnection.query('SELECT *FROM items',(err, rows, fields)=>{
        if(!err)
        console.log(rows[0].items_id);
        else
        console.log(err);
    })
}) 