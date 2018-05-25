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
})

$('#cancel_Button').click(function () {
    $('.two_Button_Spec').hide(500);
    $('#reform_Button').show(500);
    $('input').css('background', 'none').css('color', 'white').css('border-color', 'none');
    $('select').css('background', 'none').css('color', 'white').css('border-color', 'none').css('appearance', 'none');;
    $("select").not(":selected").attr("disabled", "disabled");
    $('input').attr('readonly', 'true');
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
setInterval(function () {
    var blink = document.getElementById("message_Update");
    blink.style.visibility = blink.style.visibility == "" ? "hidden" : ""
}, 500);
$('#message_Update').click(function(){
    $(this).css('display','none');
    alert('메세지 확인')
    $('#message').css('display','block');
})
$('#logo_Image').click(function(){
    location.href='http://34.219.126.51:3000/main';
})
