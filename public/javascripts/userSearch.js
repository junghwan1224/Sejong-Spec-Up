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

document.getElementsByClassName('search_button_div')[0].onclick = function(){
  var select_tags = document.getElementsByClassName('form_control_styler');
  var grade_sel = select_tags[0].options[select_tags[0].selectedIndex].value;
  var toeic_sel = select_tags[1].options[select_tags[1].selectedIndex].value;
  var tos_sel = select_tags[2].options[select_tags[2].selectedIndex].value;
  var opic_sel = select_tags[3].options[select_tags[3].selectedIndex].value;
  var vol_sel = select_tags[4].options[select_tags[4].selectedIndex].value;
  var intern_sel = select_tags[5].options[select_tags[5].selectedIndex].value;
  var act_sel = select_tags[6].options[select_tags[6].selectedIndex].value;
  var abroad_sel = select_tags[7].options[select_tags[7].selectedIndex].value;
  var li_sel = select_tags[8].options[select_tags[8].selectedIndex].value;

  var grade;
  var toeic;
  var tos;
  var opic;
  var vol;
  var intern;
  var act;
  var abroad;
  var li;
  if(grade_sel == '무관'){
    //grade = ' and (grade is not NULL or grade is NULL)'
    grade = -1;
    console.log(grade);
  }
  else{
    grade = parseFloat(grade_sel.split(' ')[0]);
    console.log(grade);
  }

  if(toeic_sel == '무관') { toeic = -1; }
  else{ toeic = parseInt(toeic_sel.split(' ')[0]); }

  if(tos_sel == '무관'){ tos = -1; }
  else{ tos = tos_sel.split(' ')[0]; }

  if(opic_sel == '무관'){ opic = -1;}
  else{ opic = opic_sel.split(' ')[0]; }

  if(vol_sel == '무관'){ vol = -1; }
  else{ vol = parseInt(vol_sel.split(' ')[0].replace('회', '')); }

  if(intern_sel == '무관'){ intern = -1; }
  else{ intern = parseInt(intern_sel.split(' ')[0].replace('회', '')); }

  if(act_sel == '무관'){ act = -1; }
  else{ act = parseInt(act_sel.split(' ')[0].replace('회', '')); }

  if(abroad_sel == '무관'){ abroad = -1; }
  else{ abroad = parseInt(abroad_sel.split(' ')[0].replace('회', '')); }

  if(li_sel == '무관'){ li = -1; }
  else{ li = parseInt(li_sel.split(' ')[0].replace('회', '')); }

  var data = {
    'grade': grade,
    'toeic': toeic,
    'tos': tos,
    'opic': opic,
    'vol': vol,
    'intern': intern,
    'act': act,
    'abroad': abroad,
    'license': li,
  };
  console.log(data);
  $.ajax({
    type: "POST",
    url: "/userSearch",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    cache: false,
    data: data,
    datatype: "json",
    success: function(result) {
      if(result['result']=='success'){
        alert('good');
      }
      else
        alert('search failed');
    },
    error:function(error){
      console.log(error);
      console.log('user search failed');
    }
  });
}
