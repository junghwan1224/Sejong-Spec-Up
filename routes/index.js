var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET home page. */
router.get('/', function(req, res) {
  var sql = 'select * from ssu_user;';
  conn.query(sql,function(error,results,fields){
    if(error){
      console.log(error);
      console.log('faield');
    }else{
      res.render('index', {
        title: 'userData',
        userdata : results
       });
    }
  });
});

module.exports = router;
