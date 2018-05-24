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
  var sql = 'select * from msg where recv_name=?';
  if(req.session.authId){
    conn.query(sql, [req.session.authId], function(error, results){
      if(error){
        console.log(error);
        console.log('쪽지 리스트 나열 실패');
      }
      else{
        res.render('msg_test',{
          user: req.session.authId,
          msgList: results
        });
      }
    });
  }
  else
    res.render('login',{
      title:'openyearround', // 사이트 제목
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

router.get('/msgDetail/:id', function(req, res){
  var sql = 'select * from msg where id=? and recv_name=?;';
  var update_sql = 'update `msg` set `check`=? where `id`=? and `recv_name`=?;';
  var id = req.params.id;
  conn.query(sql, [id, req.session.authId], function(error, results){
    if(error){
      console.log(error);
      console.log('msgDetail select 쿼리문 에러');
    }
    else if(req.session.authId){
      console.log('msgDetail select 쿼리문 성공');
      conn.query(update_sql, [1, parseInt(id), req.session.authId], function(err, rows){
        if(err){
          console.log(err);
          console.log('update sql 쿼리문 실패');
        }
        else{
          console.log('update sql 쿼리문 성공');
          res.render('msg_detail', {
            user: req.session.authId,
            title: results[0].title,
            date: results[0].date,
            post_name: results[0].post_name,
            contents: results[0].contents,
          });
        }
      });
    }
    else{
      console.log('update sql 쿼리문 성공 else');
      res.render('msg_detail', {
        user: undefined,
      });
    }
  });
});

module.exports = router;
