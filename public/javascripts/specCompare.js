var myChart=null;

$('#logo_Image').click(function(){
    $(window).attr('location','/main');
})

//학점 누르면 보이게 하는 함수
function showGraph(graphTitle, graphLabels, graphDatas) {

    var ctx = document.getElementById("barCanvas").getContext('2d');

    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.legend.display=false;
    Chart.defaults.global.tooltips.enabled=false;

    if(myChart!=null){ myChart.destroy();}
    myChart = new Chart(ctx, {
    type: 'bar', //막대그래프
    data: {
        labels: graphLabels, //x축
        datasets: [{
        //label: '속한 학생 수',
        data: graphDatas, //이거 숫자로밖에 안됨주의 y축
        backgroundColor: [ //#ababba이런거써도댐 labels 수만큼 작성
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(25, 19, 164, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(25, 19, 164, 1)'
        ],
        borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        legend: {
        display: false
        },
        title: {
        display: true,
        text: graphTitle
        },
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true
            }
        }]
        }
    }
    });
}
