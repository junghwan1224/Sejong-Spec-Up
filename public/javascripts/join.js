window.onload=function(){
  document.getElementById('applyButton').onclick=function(){
    var id = $('#user_ID').val();
    var password = $('#password').val();
    var major = $('#major').val();
    var student_number = $('#student_number').val();
    var grade = [document.getElementByName('grade_selbox').selectedindex].text;
    var score = $('#score').val();
    var toeic = $('#toeic').val();
    var toss = [document.getElementByName('toss_grade').selectedindex].text;//char
    var opic = [document.getElementByName('opic_grade').selectedindex].text;//char
    var volunteer = $('#volunteer option:selected').val();//int
    var intern = $('#intern option:selected').val();//int
    var competition = $('#Competition option:selected').val();//int
    var aboard = $('#aboard option:selected').val();;//int
    var certificate = $('#certificate option:selected').val();//int
    var job_Part = [document.getElementByName('job_Part').selectedindex].text;//char$('#volunteer option:selected').text();

    var data = {
      'id' : id,
      'password' : password,
      'major' : major,
      'student_number' : student_number,
      'grade' : grade,
      'score' : score,
      'toeic' : toeic,
      'toss' : toss,
      'opic' : opic,
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
    });//ajax
  }
}
