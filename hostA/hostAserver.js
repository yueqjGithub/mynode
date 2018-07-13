/**
 * Created by llsienna on 2018/3/19.
 */
var express=require('express');
var app=express();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//url及参数分析  GET req.query.xxx   POST req.body.xxx


var mysql=require('mysql');


var path=require('path');
app.use(express.static(path.join(__dirname,'public'))); //将public设为静态文件根路径，

app.get('/index.html',function(req,res){
    res.sendFile(__dirname+'/public/view/'+'indexA.html');
    console.log(__dirname);
    console.log(req.path);
});
// app.get('/jquery-3.2.1.min.js',function(req,res){
//     res.sendFile(__dirname+'/public/resource/js/'+'jquery-3.2.1.min.js');
// });
// app.get('/vue.js',function(req,res){
//     res.sendFile(__dirname+'/public/resource/js/'+'vue.js')
// });

// 数据库连接池
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'test123',
    port:'3306',
    database:'test'
});


app.post('/userlog',function(req,res){
   // console.log(req.params);
   // console.log(req.body);
    var loginName=req.body.loginName;
    var pwd=req.body.pwd;
    // loginName=loginName.toString();
    // pwd=pwd.toString();
    var sql="SELECT * FROM user_name WHERE loginname='"+loginName+"'&& pwd='"+pwd+"'";
    var cxjg=[];
    connection.query(sql,function(err,row){

        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.send(JSON.stringify({isLogin:'no','error':err.message}));
        }else if(row.length==0){
            console.log(row);
            res.send(JSON.stringify({isLogin:'nomessage'}))
        }else if(row.length>0){
            cxjg=row;
            console.log(row[0]);
            var uname=row[0].username;
            res.send(JSON.stringify({isLogin:'yes',username:uname}));
        }
    });
   // res.send(JSON.stringify({isLogin:'YES'}));
});
var server=app.listen(8081,function(){
   var host=server.address().address;
   var port=server.address().port;
   console.log("服务器A启动成功",host,port)
});