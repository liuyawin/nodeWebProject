/**
 * Created by Liuyawin on 2016/12/13 0013.
 */
var express = require('express');

var app = express();

//设置handlebars模板引擎
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});//除非特别指明，否则所有视图默认都是main.handlebars布局
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);
//静态资源
app.use(express.static(__dirname + '/public'));

var fortunes = ["Liuyawin","Xiaoming","Xiaohong","Xiaojingteng"];

//添加路由
app.get('/',function( req, res){
    res.render('home');
});
app.get('/about',function( req, res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune});
});
//定制404页面
app.use(function( req, res, next){
    res.status(404);
    res.render('404');
});
//定制500页面
app.use(function( err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express project started on http://localhost:'+app.get('port')+'.');
})



