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
       console.log('Database Connection Failed \n Error : '+ JSON.stringify(err,undefined,2));
});