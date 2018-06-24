window.onload=function(){
  document.getElementById('applyButton').onclick=function(){
    var user_id = $('#user_ID').val();
    var password = $('#password').val();
    var major = $('#major').val();
    var student_number = $('#student_number').val();
    var test = document.getElementsByClassName('a');
    var grade = test[0].selectedIndex;
    var grade_num;
      if(grade == 0){
        grade_num = 1;
      }else if(grade == 1){
        grade_num =2;
      }else if(grade == 2){
        grade_num = 3;
      }else if(grade == 3){
        grade_num = 4;
      }else if(grade == 4){
        grade_num = 5;
      }else{
        grade_num = 6;
      }
      console.log(grade_num);
    var score = parseFloat($('#score').val());
    console.log(score);
    var toeic = $('#toeic').val();
    var test = document.getElementsByClassName('b');
    var toss = test[0].selectedIndex;
    var toss_num;
      if(toss == 0){
        toss_num = -1;
      }else if(toss == 1){
        toss_num = 4;
      }else if(toss == 2){
        toss_num = 5;
      }else if(toss == 3){
        toss_num = 6;
      }else if(toss == 4){
        toss_num = 7;
      }else if(toss == 5){
        toss_num = 8;
      }
    var test = document.getElementsByClassName('c');
    var opic = test[0].selectedIndex;
    var opic_num;
      if(opic == 0){
        opic_num = -1;
      }else if(opic == 1){
        opic_num = 1;
      }else if(opic == 2){
        opic_num = 2;
      }else if(opic == 3){
        opic_num = 3;
      }else if(opic == 4){
        opic_num = 4;
      }else if(opic == 5){
        opic_num = 5;
      }else if(opic == 6){
        opic_num = 6;
      }

    var volunteer = $('#volunteer option:selected').val();//int
    console.log(volunteer);
    var intern = $('#intern option:selected').val();//int
    var competition = $('#Competition option:selected').val();//int
    var aboard = $('#aboard option:selected').val();;//int
    console.log(aboard);
    var certificate = $('#certificate option:selected').val();//int
    var job_Part = $('#job_Part option:selected').val();
    console.log(job_Part);
    var data = {
      'user_id' : user_id,
      'password' : password,
      'major' : major,
      'student_number' : student_number,
      'grade_num' : grade_num,
      'score' : score,
      'toeic' : toeic,
      'toss_num' : toss_num,
      'opic_num' : opic_num,
      'volunteer' : volunteer,
      'intern' : intern,
      'competition' : competition,
      'aboard' : aboard,
      'certificate' : certificate,
      'job_Part' : job_Part
    };
    console.log(data);


    $.ajax({ // ajax 통신으로 지원자 입력한 정보를 서버에 보낸다.
          type:'POST',
          url:'/goApply',
          contentType:'application/x-www-form-urlencoded; charset=UTF-8',
          cache:false,
          dataType:'json',
          data:data,
          success:function(result){
            if(result['result']=='success'){
              alert('ok');
              $(window).attr('location','/');
            }//result if
          },
          error:function(error){
            console.log('erer');
          }
    });
  }
}
/*

$.ajax({ // ajax 통신으로 지원자 입력한 정보를 서버에 보낸다.
      type:'POST',
      url:'/index/goApply',
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      cache:false,
      dataType:'json',
      data:data,
      success:function(result){
        if(result['result']=='success'){
          alert('ok');
          location.reload();//지원 완료 했으면 페이지 새로고침
        }//result if
      },
      error:function(error){
      }
});//ajax*/
