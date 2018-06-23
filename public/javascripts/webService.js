
$(".logoClick").click(function(){
  var index = $(".logoClick").index(this);
  $(".webServiceModal:eq(" + index + ")").fadeIn(600);
});
$(".tableImg").click(function(){
  var index = $(".tableImg").index(this);
  $(".memberModal:eq(" + index + ")").fadeIn(600);
});
$(".tableImgM").click(function(){
  var index = $(".tableImgM").index(this);
  $(".memberModal:eq(" + index + ")").fadeIn(600);
});

$(".webServiceClose").click(function(){
  var index = $(".webServiceClose").index(this);
  $(".webServiceModal:eq(" + index + ")").fadeOut(600);
});
$(".memberClose").click(function(){
  var index = $(".memberClose").index(this);
  $(".memberModal:eq(" + index + ")").fadeOut(600);
});


$(".left").click(function(){
  var index = $(".left").index(this);
  if (index==0) {
    var before=6;
  }
  else{
    var before= index-1;
  }
  $(".webServiceModal:eq(" + index + ")").css('display','none');
  $(".webServiceModal:eq(" + before + ")").css('display','block')
});
$(".right").click(function(){
  var index = $(".right").index(this);
  if(index==6){
    var next=0
  }
  else{
    var next = index+1;
  }
  $(".webServiceModal:eq(" + index + ")").css('display','none');
  $(".webServiceModal:eq(" + next + ")").css('display','block')
});

moveTop.onclick=function(){
  $('html,body').animate({'scrollTop':0}, 500);
}

$('#allLogo').recopickSwipe({
  $target: $('ul'),
  total: 3, // total 3 pages
  $curr: $('#pageN'),
});
$('input:radio[name="pos"]').change(function(){
    if (this.checked && this.value == '1') {
      $('#allLogo').trigger('swipe_page', 1);
    }
    else if(this.checked && this.value == '2'){
      $('#allLogo').trigger('swipe_page', 2);
    }
    else{
      $('#allLogo').trigger('swipe_page', 3);
    }
  });

  setInterval(function() {
    if(pageNumber==1){
    $("#pos1").prop("checked", true);
    }
    if(pageNumber==2){
    $("#pos2").prop("checked", true);
    }
    if(pageNumber==3){
    $("#pos3").prop("checked", true);
    }
    if(name==1)
    {
      $('.menuLogin').css('display','none');
      $('#Logout').css('display','block');
    }
  }, 400);
