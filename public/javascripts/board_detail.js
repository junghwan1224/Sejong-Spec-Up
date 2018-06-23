var checkbtn=document.getElementsByClassName('checkbtn')[0];
var textUpload = document.getElementById('textUpload');
var numberCheck = document.getElementById('numberCheck');
var writebtn = document.getElementById('writeButton');
var uploadClose = document.getElementById('uploadClose');
var checkClose = document.getElementById('checkClose');
var passwordCheck=document.getElementById("checkPassword");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$('#searchResetButton').click(function(e){
  e.preventDefault();
  window.location.assign("/board/1/");
})


writebtn.onclick=function(){

    $.ajax({
      type: "POST",
      url: "/check/goCheck",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      cache: false,
      datatype: "json", // expecting JSON to be returned
      success: function(result) {
        if(result['results']==100){
          textUpload.style.display = "block";
        }
        else
        alert('글쓰기가 불가능 합니다.');
      },
    })
  }


uploadClose.onclick=function(){
  textUpload.style.display="none";
}
checkClose.onclick=function(){
  numberCheck.style.display="none";
}
//모달 밖을 클릿했을떄 닫히는것
window.onclick = function(event) {
  if (event.target == textUpload) {
    textUpload.style.display = "none";
  }
}
window.onclick = function(event) {
  if (event.target == numberCheck) {
    numberCheck.style.display="none";
  }
}

$('.moveTop').click(function(){
  $(window).attr('location','/');
});

$('#numberCheck').keypress(function(event){
  console.log('ok');
 if ( event.which == 13 ) {
     $('#okay_btn').click();
     return false;
 }
});
$('#textUpload').keypress(function(event){
  console.log('okok');
 if ( event.which == 13 ) {
     $('#ok_button_on_board').click();
     return false;
 }
});




$('#ok_button_on_board').click(function(){
  var title = $('#title_name').val();
  var contents = $('#contents').val();
  var now = new Date();
        function leadingZeros(n, digits){
          var zero='';
          n = n.toString();
          if(n.length < digits){
            for(i = 0 ; i < digits - n.length; i++){
              zero += '0';
            }
          }
          return zero + n;
        }
  var post_date = leadingZeros(now.getYear()-100,2)+ '-'+
                  leadingZeros(now.getMonth()+1,2)+'-' +
                  leadingZeros(now.getDate(),2);




  if(title=='')
  alert("제목을 입력하세요");
  else if(contents == '')
  alert("내용을 입력하세요");
  else{
    var data={
      'title' : title,
      'contents' : contents,
      'date' : post_date
    }
    $.ajax({
      type: 'post',
      url: '/board/goBoard',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      cache: false,
      data: data,
      datatype: 'json',
      success: function(result) {
        if (result['result']=='success'){
          // console.log(result);
          alert('등록완료');
          location.reload();
        }
        else{
          console.log(result);
          alert('등록실패1');
        }
      },
      error: function(error){
        alert('등록실패2');
        location.reload();
      }
    });
  }
});
