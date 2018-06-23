var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);


router.post('/goBoard',function(req,res,next){//올리기 버튼 클릭 시 ajax 통신하는 부분입니다.
  console.log(req.body);
  var title = req.body.title;
  var contents = req.body.contents;
  var date = req.body.date;
  var sql = 'insert into `postboard` (`title`,`text`,`file_name`,`date`) values (?,?,?,?);';
  var file;
  console.log(__dirname.replace('/routes',''));
  if(req.files){
    console.log(req.files.upload_file);
    file = req.files.upload_file;
    var filename = file.name;
    file.mv(__dirname.replace('/routes','')+'/public/files/'+filename, function(err){
      if(err){
        console.log(err);
      }
      else{
        conn.query(sql,[title,contents,filename,date],function(error,results,fields){
          if(error){
            console.log('failed file save');
            console.log(error);
          }//if
          else{
            res.send({result:'success'});//ajax 통신이 성공하면 다시 success 메세지를 보냅니다.
          }
        });//query
      }
    });
  }
  else{
    console.log(req.body.upload_file);
    var filename = req.body.upload_file;
    conn.query(sql,[title,contents,filename,date],function(error,results,fields){
      if(error){
        console.log('failed no file save');
        console.log(error);
      }//if
      else{
        res.send({result:'success'});//ajax 통신이 성공하면 다시 success 메세지를 보냅니다.
      }
    });//query
  }


});//router post
router.get('/:page', function(req, res, next) {
  var page = req.params.page;
  var sql='select * from postboard;';

  conn.query(sql,function(error,result,fields){
    if(error){//데이터베이스에서 불러올 때 오류 메세지 띄워줌
    }
    else if(req.session.authId){//화면 렌더링 할 때 보내는 값
        res.render('boarder',{
              user : req.session.authId,
              title:'openyearround', // 사이트 제목
              result : result,
              page : page,
              leng : Object.keys(result).length-1,
              page_num : 10,
              keyword: ''
             }
           );//render

      }else {
        res.render('boarder', {
          user: undefined,
          title:'openyearround',
          result : result,
          page : page,
          leng : Object.keys(result).length-1,
          page_num : 10,
          keyword: ''
        });
      }

  });//query
});


router.get('/title_content/:id',function(req,res){
  var sql='select * from postboard where id=?;';
  conn.query(sql,[req.params.id],function(err,rows){
    res.render('board_title_content',{rows : rows});
  });
});

router.get('/goCheckk/:id', function(req,res){
  var sql = "delete from `postboard` where id = ?;";
  conn.query(sql, [req.params.id], function(error,results){
    if(error){
    }
    else if(req.session.authId){
      res.render('index',{
        user : req.session.authId,
        author : req.session.author,
        title:'openyearround'
      });
    } else {
      res.render('index', {
        user: undefined,
        title:'openyearround'
      });
    }
  });
});

router.get('/:page/search', function(req, res){
  var sql = 'select * from `postboard` where title like ?;';
  var like = '%' + req.query.search_input + '%';
  var page = req.params.page;
  conn.query(sql, [like], function(error, result){
    if(error){
    }
    else{
      res.render(
        'boarder',
        {
          title:'openyearround',
          result: result,
          page: page,
          leng : Object.keys(result).length-1,
          page_num : 10,
          keyword: req.query.search_input
        }
      );
    }//else
  });
});

router.get('/:page/detail/:id', function(req, res, next){
  var detail = req.params.id;
  var page = req.params.page;
  var sql = 'select * from postboard where id=?;';
  var all_sql = 'select * from postboard;';

  conn.query(all_sql, function(error, rows){
    if(error){
    }
    else if(req.session.authId){
      conn.query(sql, [detail], function(err, result){
        res.render('board_detail',{
          user: req.session.authId,
          result: result,
          rows : rows,
          page : page,
          leng : Object.keys(rows).length-1,
          page_num : 10,
          keyword: ''
          }
        );
      });
    }
    else{
      conn.query(sql, [detail], function(err, result){
        res.render('board_detail',{
          user: undefined,
          result: result,
          rows : rows,
          page : page,
          leng : Object.keys(rows).length-1,
          page_num : 10,
          keyword: ''
          }
        );
      });
    }
  });
});

router.post('/reBoard/:id',function(req,res,next){
  var title = req.body.title;
  var contents = req.body.contents;
  var date = req.body.date;
  var id = req.params.id;
  var sql = "update `postboard` set title = ?, date = ?, text = ? where id = ?;";

  conn.query(sql,[title,date,contents,id], function(error,results, fields){
    if(error){
    } else {
      res.send({result : 'success'});
    }
  });
});

module.exports = router;
