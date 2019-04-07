var express = require("express")
var bodyParser = require("body-parser")
var fileUpload = require("express-fileupload")
var path = require("path")
var ejs = require("ejs")
var session = require("express-session")
var db = require("./routes/database")
var app = express();

//app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use(fileUpload())


app.get('/dashboard',(req,res)=>{
	res.sendFile(__dirname+"/dashboard.html");
});


//achievement

app.get('/achievements',(req,res)=>{
	db.query("select * from achievements",(err,results)=>{
		res.render('achievement',{
			achievement:results
		})
	})
})

//add_achievement 
var add_achievement=require('./routes/add_achievement')
app.route("/add_achievement").post(add_achievement)
app.get('/add_achievement',(req,res)=>{
	res.sendFile(__dirname+"/add_achievement.html")
})

//inventory page

app.get('/inventory',(req,res)=>{
	db.query("select * from inventory",(err,results)=>{
		res.render('inventory',{
			inventory:results
		})
	})
})

//add item to inventory
var inventory_add_item=require('./routes/inventory_add_item')
app.route("/inventory_add_item").post(inventory_add_item)
app.get('/inventory_add_item',(req,res)=>{
	res.sendFile(__dirname+"/inventory_add_item.html")
})

//extra table page

app.get('/table',(req,res)=>{
	db.query("select * from add_extra_table",(err,results)=>{
       res.render('extra_table',{
       	extra_table:results
       })
	})
})

// add values to extra table
var add_extra_table=require('./routes/add_extra_table')
app.route("/add_extra_table").post(add_extra_table)
app.get('/add_extra_table',(req,res)=>{
	res.sendFile(__dirname+"/add_extra_table.html")
})




app.listen(3000,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("Listening at port 3000...")
})