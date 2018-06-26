window.onload=function(){
    document.getElementById('applyButton').onclick=function(){
      var userP_id = $('#user_ID').val();
      var name = $('#name').val();
      var password = $('#password').val();
      var major = $('#major').val();
      var email = $('#email').val();
      var introduce = $('#introduce').val();


      var data = {
        'userP_id' : userP_id,
        'name' : name,
        'password' : password,
        'major' : major,
        'email' : email,
        'introduce' : introduce
      };
      console.log(data);
  
  
      $.ajax({ // ajax 통신으로 지원자 입력한 정보를 서버에 보낸다.
            type:'POST',
            url:'/goApplyP',
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            cache:false,
            dataType:'json',
            data:data,
            success:function(result){
              if(result['result']=='success'){
                alert(user_id + '님, 가입이 완료되었습니다!\n로그인 해 주세요.');
                $(window).attr('location','/sejongsu/loginP');
              }//result if
            },
            error:function(error){
              console.log('erer');
            }
      });
    }
  }
  