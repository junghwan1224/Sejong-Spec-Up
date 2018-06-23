var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

router.get('/', function(req, res, next) {
  if(req.session.authId){
    res.redirect('/');
  }
  else{
    res.render('login',{
      title:'openyearround', // 사이트 제목
    });//render
  }
});

router.post('/gologin',function(req,res,next){
  var id = req.body.id;
  var password = req.body.password;

  var sql = "select * from oyr_user where user_name=?";
  conn.query(sql,[id], function(error,results,fields){
    if(error){
      console.log(id);

    } else {
      var user = results[0];
      if(!user){
        console.log('id fail');
        res.send({result:'error'});
      } else if(password == user.password){
        req.session.authId = id;
        req.session.author = user.authorize;
        req.session.save(function() {
          res.send({result:'success'});
        });
      } else {
        res.send({result:'error'});
      }
    }
  });
});
router.get('/logout',function(req,res){
  delete req.session.authId;
  delete req.session.author;
  res.redirect('/');
});

module.exports = router;
