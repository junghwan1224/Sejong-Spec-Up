var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

// var http = require('http');
// var app = express();
// var server = http.createServer(app);
// var io = require('socket.io').listen(server);

// io.on('connection', function(socket){
//   console.log('connected');
// });

router.get('/', function(req, res, next) {
  var sql = 'select * from msg where recv_name=?;';
  var new_msgSql = 'select * from msg_new where recv_name=?;';
  if(req.session.authId){
    conn.query(sql, [req.session.authId], function(error, results){
      if(error){
        console.log(error);
        console.log('쪽지 리스트 나열 실패');
      }
      else{
        conn.query(new_msgSql, [req.session.authId], function(err, rows){
          if(err){
            console.log(err);
            console.log('msg new error');
          }
          else{
            console.log('msg new sccess');
            res.render('msg_test',{
              user: req.session.authId,
              msgList: results,
              new_msg: rows[0],
            });
          }
        });
        // res.render('msg_test',{
        //   user: req.session.authId,
        //   msgList: results
        // });
      }
    });
  }
  else
    res.render('login',{
      title:'Login', // 사이트 제목
    });//render
});

router.post('/postMsg', function(req, res){
  var sql = 'insert into `msg` (`post_name`, `recv_name`, `title`, `contents`, `date`) values (?, ?, ?, ?, ?);';
  var post_name = req.body.post_user;
  var recv_name = req.body.recv_user;
  var title = req.body.title;
  var contents = req.body.contents;
  var date = req.body.post_date;
  conn.query(sql, [post_name, recv_name, title, contents, date], function(error, results){
    if(error){
      console.log(error);
      console.log('쪽지 전송 실패');
    }
    else{
      console.log('쪽지 전송 성공');
      res.send({result: 'success'});
    }
  });
});

router.get('/msgList', function(req, res){
  var sql = 'select * from msg where recv_name=?;';
  conn.query(sql, [req.session.authId], function(error, results){
    if(error){
      console.log(error);
      console.log('메세지 리스트 나열 실패');
    }
    else{
      console.log('msg new delete success');
      res.render('msg_list', {
        msgList: results,
        user: req.session.authId,
      });
    }
  });
});

router.get('/msgDetail', function(req, res){
  var sql = 'select * from msg where recv_name=?;';
  conn.query(sql, [req.session.authId], function(error, results){
    if(error){
      console.log(error);
      console.log('msgDetail select 쿼리문 에러');
    }
    else{
      console.log('msgDetail select 쿼리문 성공');
      res.render('msg_detail', {
        msgList: results,
      });
    }
  });
});

router.post('/readCheck/:id', function(req, res){
  var sql = 'update `msg` set `check`=? where `id`=? and `recv_name`=?;';
  var idx = req.params.id;
  conn.query(sql, [1, idx, req.session.authId], function(error, results){
    if(error){
      console.log(error);
      console.log('read check failed');
    }
    else{
      console.log('read check success');
      res.send({result:'success'});
    }
  });
});

module.exports = router;
