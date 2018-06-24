
var tbody = document.getElementById('upload_Table');
$("select").not(":selected").attr("disabled", "disabled");
$('input').css('background', 'none').css('color', 'white').css('border-color', 'none');
$('select').css('background', 'none').css('color', 'white').css('border-color', 'none');
$('.select_Result').css('background', 'none').css('color', 'white').css('border', 'none');

$('#reform_Button').click(function () {
    $(this).hide(500);
    $('.two_Button_Spec').show(500);
    $('#myspec input').css('background', 'white').css('color', 'black').css('border-color', 'none');
    $('select').css('background', 'white').css('color', 'black').css('border-color', 'none').css('appearance', 'menulist');
    $("select").removeAttr('disabled');
    $('input').removeAttr("readonly");
    $('.original_Form').css('display','none');
    $('.when_Reform').css('display','block');
})

$('#cancel_Button').click(function () {
    $('.two_Button_Spec').hide(500);
    $('#reform_Button').show(500);
    $('input').css('background', 'none').css('color', 'white').css('border-color', 'none');
    $('select').css('background', 'none').css('color', 'white').css('border-color', 'none').css('appearance', 'none');;
    $("select").not(":selected").attr("disabled", "disabled");
    $('input').attr('readonly', 'true');
    $('.original_Form').css('display','block');
    $('.when_Reform').css('display','none');
})

$('.mypage_Menu:eq(0)').click(function () {
    $('.container-fluid:eq(0)').show(500);
    $('.container-fluid:eq(1)').hide(500);
})

$('.mypage_Menu:eq(1)').click(function () {
    $('.container-fluid:eq(1)').show(500);
    $('.container-fluid:eq(0)').hide(500);
})
$('#upload_Button').click(function () {

    var row = tbody.insertRow(tbody.rows.length); // 하단에 추가
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = '<input type=text class="new_Daily" id="new_Date">'
    cell2.innerHTML = '<input type=text class="new_Daily" id="new_Content">';
    cell3.innerHTML = '<input type=text class="new_Daily" id="new_Result">';
    $('.upload_Two_Button').hide('slow');
    $('.two_Button_Table_Upload').show('slow');
})
$('#cancel_Button_Table').click(function () {

    if (tbody.rows.length < 1) return;
    tbody.deleteRow(tbody.rows.length - 1); // 하단부터 삭제
    $('.two_Button_Table_Upload').hide('slow');
    $('.upload_Two_Button').show('slow');
})
$('#reform_Button_Table').click(function () {
    $('.update_Daily').removeAttr("readonly");
    $('.update_Daily').css('border', 'solid');
    $('.upload_Two_Button').hide('slow');
    $('.two_Button_Table_Reform').show('slow');
})
$('#reform_Cancel_Button_Table').click(function () {
    $('.update_Daily').css('border', 'none');
    $('.update_Daily').attr('readonly', 'true');
    $('.two_Button_Table_Reform').hide('slow');
    $('.upload_Two_Button').show('slow');
})
// setInterval(function () {
//     var blink = document.getElementById("message_Update");
//     blink.style.visibility = blink.style.visibility == "" ? "hidden" : ""
// }, 500);
$('#message_Update').click(function(){
    // $(this).css('display','none');
    // alert('메세지 확인');
    // $('#message').css('display','block');
})


function newMsgCheck(){
  var blink = document.getElementById("message_Update");
  blink.style.visibility = blink.style.visibility == "" ? "hidden" : ""
}

$.get('/msg/msgList', function(data){
  $('#msg_list').html(data);
});

$.get('/msg/msgDetail', function(data){
  $('#msg_detail').html(data);
});

// $('#msgListCloseBtn').click(function(){
//   clearInterval(newMsgCheck);
//   location.reload();
// });


$('#logo_Image').click(function(){
    $(window).attr('location','/main');
})

$('#upload_Button_DB').click(function(){
  var result = $('#new_Result').val();
  var date = $('#new_Date').val();
  var content = $('#new_Content').val();

  var data = {
    'result' : result,
    'date' : date,
    'content' : content
  };
  console.log(data);

  $.ajax({ // ajax 통신으로 지원자 입력한 정보를 서버에 보낸다.
        type:'POST',
        url:'/goContent',
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        cache:false,
        dataType:'json',
        data:data,
        success:function(result){
          if(result['result']=='success'){
            alert('등록되었습니다');
            $(window).attr('location','/mypage');
          }//result if
        },
        error:function(error){
          console.log('erer');
        }
  });
})

//수정

$('#reform_Button_DB').click(function(){
  var result = document.getElementById('update_Result').value;
  var date = document.getElementById('update_Date').value;
  var content = document.getElementById('update_Content').value;

  var data = {
    'result' : result,
    'date' : date,
    'content' : content
  };
  console.log(data);

  $.ajax({ // ajax 통신으로 지원자 입력한 정보를 서버에 보낸다.
        type:'POST',
        url:'/regoContent',
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        cache:false,
        dataType:'json',
        data:data,
        success:function(result){
          if(result['result']=='success'){
            alert('수정되었습니다');
            $(window).attr('location','/mypage');
          }//result if
        },
        error:function(error){
          console.log('erer');
        }
  });
})


$('#my_spec').click(function(){
  var a = document.getElementById('score_toss').value;
  if(a == 1){
    a = 'Level 1';
  }else if(a == 2)
  {
    a = 'Level 2';
  }else if(a == 3)
  {
    a = 'Level 3';
  }else if(a == 4)
  {
    a = 'Level 4';
  }else if(a == 5)
  {
    a = 'Level 5';
  }else if(a == 6)
  {
    a = 'Level 6';
  }else if(a == 7)
  {
    a = 'Level 7';
  }else if(a == 8)
  {
    a = 'Level 8';
  }else if(a == -1)
  {
    a = '미응시';
  }
  document.getElementById('score_toss').value = a;
  var b = document.getElementById('score_opic').value;
  if(b == 1){
    b = 'NL';
  }else if(b == 2)
  {
    b = 'NM';
  }else if(b == 3)
  {
    b = 'NH';
  }else if(b == 4)
  {
    b = 'IL';
  }else if(b == 5)
  {
    b = 'IM';
  }else if(b == 6)
  {
    b = 'IH';
  }else if(b == 7)
  {
    b = 'AL';
  }else if(b == -1)
  {
    b = '미응시';
  }
  document.getElementById('score_opic').value = b;
});
