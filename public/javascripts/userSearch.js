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
$('#logo_Image').click(function(){
    $(window).attr('location','/main');
})
function studentListOnClick(index) { //학생 리스트 클릭시 인덱스로 식별
    alert("student_" + index);
}