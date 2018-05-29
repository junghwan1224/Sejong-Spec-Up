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
    conn.query('select * from ssu_user where user_id = ?',[req.session.authId],function(err,rows){
      if(err){
        throw err;
      }else{
        if(req.session.authId){
          conn.query('select * from ssu_content where user_id =?',[req.session.authId],function(err,results){
            if(err){
              throw err;
            }else{
              res.render('mypage', {
              results : results,
              user : req.session.authId,
              rows : rows,
              title:'myPage'
                });
            }
          })
        }else{
          res.render('mypage', {
            user: undefined,
            title:'mywwwpage'
          });
        }
      }
    })
  }
  else {
    res.render('mypage', {
      user: undefined,
      title:'mywwwpage'
    });
  }
});
router.get('/userSearch', function(req, res) {
  if (req.session.authId) {
  res.render('userSearch', {
    user : req.session.authId,
    title:'userSearch',
    jobPart:req.session.job_Part,
  });
  }
  else {
    res.render('userSearch', {
      user: undefined,
      title:'userSearch'
    });
  }
});


router.post('/userSearch', function(req, res){
  var sql = 'select * from ssu_user where';
  var grade;
  var toeic;
  var tos;
  var opic;
  var vol;
  var intern;
  var act;
  var abroad;
  var li;

  var query_value = [];

  if( req.body.grade == -1 ){ grade = ' (grade is NULL or grade is not NULL)'}
  else{ grade =  ' grade>=?'; query_value.push(req.body.grade); }

  if( req.body.toeic == -1 ){ toeic = ' and (toeic is NULL or toeic is not NULL)'}
  else{ toeic = ' and toeic>=?'; query_value.push(req.body.toeic); }

  if( req.body.tos == -1 ){ tos = ' and (toss_num is NULL or toss_num is not NULL)' }
  else{ tos = ' and toss_num>=?'; query_value.push(req.body.tos); }

  if( req.body.opic == -1 ){ opic = ' and (opic_num is NULL or opic_num is not NULL)' }
  else{ opic =  ' and opic_num>=?'; query_value.push(req.body.opic); }

  if( req.body.vol == -1 ){ vol = ' and (volunteer is NULL or volunteer is not NULL)' }
  else{ vol =  ' and volunteer>=?'; query_value.push(req.body.vol); }

  if( req.body.intern == -1 ){ intern = ' and (intern is NULL or intern is not NULL)' }
  else{ intern = ' and intern>=?'; query_value.push(req.body.intern); }

  if( req.body.act == -1 ){ act = ' and (competition is NULL or competition is not NULL)' }
  else{ act = ' and competition>=?'; query_value.push(req.body.act); }

  if( req.body.license == -1 ){ li = ' and (certificate is NULL or certificate is not NULL)' }
  else{ li = ' and certificate>=?'; query_value.push(req.body.license); }

  if( req.body.abroad == -1 ){ abroad = ' and (activity is NULL or activity is not NULL)' }
  else{ abroad = ' and activity>=?'; query_value.push(req.body.abroad); }

  query_value.push(req.session.authId);
  var exclude_me = ' and user_id!=?;';

  sql += grade + toeic + tos + opic + vol + intern + act + li + abroad + exclude_me;

  conn.query(sql, query_value, function(error, results){
    if(error){
      console.log(error);
      console.log('user search failed');
    }
    else{
      res.send({
        result: 'success',
        users: results,
      });
    }
  });

});


router.get('/userDetail', function(req, res) {
  if (req.session.authId) {
  res.render('userDetail', {
    user : req.session.authId,
    title:'userDetail',
    major: req.session.major
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


router.post('/goContent',function(req,res,next){//접수 버튼 클릭 시 ajax 통신하는 부분입니다.
  var user_id = req.session.authId;
  var result = req.body.result;
  var date = req.body.date;
  var content = req.body.content;

  var sql = 'insert into `ssu_content` (`user_id`,`result`,`date`,`content`) values (?,?,?,?);';

  conn.query(sql,[user_id,result,date,content],function(error,results,fields){
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
        req.session.major = user.major;
        req.session.job_Part = user.want_job;
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
  delete req.session.major;
  delete req.session.job_Part;
  res.redirect('/');
});
module.exports = router;
