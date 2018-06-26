function addPfList(i, name, major, email, introdMsg) { //인덱스, 성함, 전공, 이메일, 소개글
    var listParent = document.createElement("ul");
    listParent.setAttribute("class", "pf_list");

    var html = '<li id="_'+ i +'" class="pf_list_item">'
        html += `<div class="container-fluid">
                <div class="row">

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div id="message_Div" data-toggle="modal" data-target="#myModal">
                        <img id="message_Update" src="/images/message_Icon.png" height="13%"/>
                    </div>

                    <div class="pflistcont1">`
        html +=           '<span>'+name+'</span>'
        html +=     `</div>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="pflistcont1">`
        html +=            '<span>'+major+'</span>'
        html += `</div>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="pflistcont1">`
        html +=            '<span>'+email+'</span>'
        html +=    `</div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">`
        html +=         '<textarea class="area_intro" name="" id="pfintro_" cols="30" rows="10">'+introdMsg+'</textarea>'
        html += `</div>
                </div>
                </div>
                </li>`

    listParent.innerHTML = html;
    document.getElementById('pf_list_parent').appendChild(listParent);
}
$('#logo_Image').click(function(){
    $(window).attr('location','/main');
})
function pfListOnClick(index) { //학생 리스트 클릭시 인덱스로 식별
    alert("pf_" + index);
}

function listTest() {
    for(var i=0; i < 5; i++) {
        addPfList(i, '이름'+i, '전공'+i, '이메일'+i, '소개메시지'+i);
    }
}