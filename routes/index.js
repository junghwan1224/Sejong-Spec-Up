var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'loginPage' });
});
router.get('/main', function(req, res) {
  if (req.session.authId) {
  res.render('main', {
    user : req.session.authId,
    title:'mainPage'
    });
  }
  else {
    res.render('main', {
      user: undefined,
      title:'mainPage'
    });
}
});
router.get('/join', function(req, res) {
  res.render('join', { title: 'joinPage' });
});
router.get('/mypage', function(req, res) {
  if (req.session.authId) {
  res.render('mypage', {
    user : req.session.authId,
    title:'myPage'
    });
  }
  else {
    res.render('mypage', {
      user: undefined,
      title:'mypage'
    });
  }
});
router.get('/userSearch', function(req, res) {
  if (req.session.authId) {
  res.render('userSearch', {
    user : req.session.authId,
    title:'userSearch'
    });
  }
  else {
    res.render('userSearch', {
      user: undefined,
      title:'userSearch'
    });
  }
});
router.get('/userDetail', function(req, res) {
  if (req.session.authId) {
  res.render('userDetail', {
    user : req.session.authId,
    title:'userDetail'
    });
  }
  else {
    res.render('userDetail', {
      user: undefined,
      title:'userDetail'
    });
  }
});
router.get('/specCompare', function(req, res) {
  if (req.session.authId) {
  res.render('specCompare', {
    user : req.session.authId,
    title:'specCompare'
    });
  }
  else {
    res.render('specCompare', {
      user: undefined,
      title:'specCompare'
    });
  }
});

router.get('/user', function(req, res) {
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

router.post('/goApply',function(req,res,next){//접수 버튼 클릭 시 ajax 통신하는 부분입니다.
  var user_id = req.body.user_id;
  var password = req.body.password;
  var major = req.body.major;
  var school_num = req.body.student_number;
  var grade = req.body.grade_num;
  var score = req.body.score;
  var toeic = req.body.toeic;
  var toss_num = req.body.toss_num;
  var opic_num = req.body.opic_num;
  var volunteer = req.body.volunteer;
  var intern = req.body.intern;
  var competition = req.body.competition;
  var aboard = req.body.aboard;
  var certificate = req.body.certificate;
  var job_Part = req.body.job_Part;

  var sql = 'insert into `ssu_user` (`user_id`,`password`,`grade_num`,`school_num`,`major`,`want_job`,`grade`,`toss_num`,`toeic`,`opic_num`,`volunteer`,`intern`,`competition`,`certificate`,`activity`) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

  conn.query(sql,[user_id,password,grade,school_num,major,job_Part,score,toss_num,toeic,opic_num,volunteer,intern,competition,certificate,aboard],function(error,results,fields){
    if(error){
      console.log(error);
      console.log('no');
    }//if
    else{
      console.log(results);
      res.send({result:'success'});//ajax 통신이 성공하면 다시 success 메세지를 보냅니다.
    }
  });//query
});//router post


router.post('/gologin',function(req,res,next){
  var id = req.body.id;
  var password = req.body.password;

  var sql = "select * from ssu_user where user_id=?";
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
  res.redirect('/');
});
module.exports = router;
