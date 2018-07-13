
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var mysql=require('mysql');
app.use(express.static('resource'));



app.get('/index.html',function(req,res){
    res.sendFile(__dirname+'/view/'+'indexB.html');
    console.log(__dirname);
    console.log(req.path);
});

app.get('/kuayu',function(req,res){
    var func=req.query.callback;//参数值
    var data=[
        {
            name:'小江江',
            age:25
        },
        {
            name:'大江江',
            age:25
        },
        {
            name:'中江江',
            age:25
        }
    ];
    console.log(func);
    // console.log(__dirname);
    // console.log(req.path);
    res.send(func+ '(' + JSON.stringify(data) + ')');
});


var server=app.listen(8082,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log("服务器B启动成功",host,port)
});
