//학생 리스트 추가
function addStudentList(i, name, major) { //인덱스, 성명, 학과
    var listParent = document.createElement("ul");
    listParent.setAttribute("class", "std_list");

    var html = '<li id="stdlst_'+ i +'"class="std_list_item type="button" onclick='+'"studentListOnClick('+ i +')"'+'>';
        html+= '<div class="std_item_div">';
        html+= '<span class="std_list_left">' + name + '</span><span class="std_list_right">'+ major +'</span>';
        html+= '</div>';
        html+= '</li>';

    listParent.innerHTML = html;
    document.getElementById('std_list_parent').appendChild(listParent);
}

//지원 정보 리스트 추가
//인덱스, 일자, 내용, 합격 여부
function addApplyList(date, details, passed) {
    var listParent = document.createElement("ul");
    listParent.setAttribute("class", "aply_list");

    var html = '';

    for(i = 0; i < date.length * 4; i++) {
        html+= '<li class="aply_list_item">';
        html+= '<div class="container-fluid">';
        html+= '<div class="row">';
        html+= '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" title="'+ date[i] +'">';
        html+= '<p class="apply_list_item_header_p">'+ date[i] +'</p>';
        html+= '</div>';
        html+= '<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" title="'+ details[i] +'">';
        html+= '<p class="apply_list_item_header_p">'+ details[i] +'</p>';
        html+= '</div>';
        html+= '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" title="'+ passed[i] +'">';
        html+= '<p class="apply_list_item_header_p">'+ passed[i] +'</p>';
        html+= '</div>';
        html+= '</div>';
        html+= '</div>';
        html+= '</li>';
    }

    listParent.innerHTML = html;
    document.getElementById('aply_list_parent').appendChild(listParent);
}

$('#logo_Image').click(function(){
    $(window).attr('location','/main');
});

$.get('/msg/msgList', function(data){
  $('#msg_list').html(data);
});

$.get('/msg/msgDetail', function(data){
  $('#msg_detail').html(data);
});
