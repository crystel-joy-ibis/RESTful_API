
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

app.listen(3000,() =>console.log('Express server is running at port no :3000'));


//Get all items

app.get('/items',(req,res)=>{
    mysqlConnection.query('SELECT * FROM items',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Get an items

app.get('/items/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM items WHERE items_id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Delete an items

app.delete('/items/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM items WHERE items_id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Deleted Successfully.');
        else
        console.log(err);
    })
});

//Insert an items

app.post('/items',(req,res)=>{
    let itms = req.body;
    var sql ="SET @items_id = ?;SET @items_name = ?;SET @items_qty = ?;SET @items_amount = ?;\
     CALL new_procedure(@items_id,@items_name,@items_qty,@items_amount);";
    mysqlConnection.query(sql[itms.items_id, itms.items_name, itms.items_qty, itms.items_amount],(err, rows, fields)=>{
        if(!err)
        row.forEach(element => {
            if(element.constructor == Array)
        res.send('Inserted Item id :'+element[0].items_id); 
    });
        else
        console.log(err);
    })
});

//Update an items

app.put('/items',(req,res)=>{
    let itms = req.body;
    var sql ="SET @items_id = ?;SET @items_name = ?;SET @items_qty = ?;SET @items_amount = ?;\
     CALL new_procedure(@items_id,@items_name,@items_qty,@items_amount);";
    mysqlConnection.query(sql[itms.items_id, itms.items_name, itms.items_qty, itms.items_amount],(err, rows, fields)=>{
        if(!err)
       res.send('Updated Successfully.');
        else
        console.log(err);
    })
});