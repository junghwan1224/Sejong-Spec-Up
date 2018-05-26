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
  res.render('main', { title: 'mainPage' });
});
router.get('/join', function(req, res) {
  res.render('join', { title: 'joinPage' });
});
router.get('/mypage', function(req, res) {
  res.render('mypage', { title: 'myPage' });
});
router.get('/userSearch', function(req, res) {
  res.render('userSearch', { title: 'userSearch' });
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
  var id = req.body.id;
  var password = req.body.password;
  var major = req.body.major;
  var student_number = req.body.student_number;
  var grade = req.body.grade;
  var score = req.body.score;
  var toeic = req.body.toeic;
  var toss = req.body.toss;
  var opic = req.body.opic;
  var volunteer = req.body.volunteer;
  var intern = req.body.intern;
  var competition = req.body.competition;
  var aboard = req.body.aboard;
  var certificate = req.body.certificate;
  var job_Part = req.body.job_Part;

  var sql = 'insert into `ssu_user` (`id`,`password`,`major`,`student_number`,`grade`,`score`,`toeic`,`toss`,`opic`,`volunteer`,`intern`,`competition`,`aboard`,`certificate`,`job_Part`) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
  //입력한 정보를 테이블에 저장하는 쿼리문
  conn.query(sql,[id,password,major,student_number,grade,score,toeic,toss,opic,volunteer,intern,competition,aboard,certificate,job_Part],function(error,results,fields){
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
module.exports = router;
