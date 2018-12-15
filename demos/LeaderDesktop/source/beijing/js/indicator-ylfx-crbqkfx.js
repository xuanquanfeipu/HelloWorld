/**
 * Created by tanxin on 2017/4/24.
 */
var curNav = "nav_4";
$(function(){
    var legend = [];
    var data = [];
    var year = [];
    var cssSelected;
    var Chart1 = function(legend1,cssSelected1, data1, year) {
        this.getOption = function () {
            return {
                color:['#ff9801','green','#0c6bd9','red'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:legend1,
                    y : 'top',
                    selected: cssSelected1
                },

                xAxis: [
                    {
                        type: 'category',
                        data: year,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisTick:{//刻度消失
                            show:false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '总量:万人',
                        axisLabel: {
                            formatter: '{value} '
                        },
                        splitLine: {
                            show: true
                        },
                        axisTick:{//刻度消失
                            show:false
                        }
                    },
                    {
                        type: 'value',
                        name: '发病率及死亡率(%)',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick:{//刻度消失
                            show:false
                        }
                    }
                ],
                series: data1
            }
        };

        this.chart = echarts.init(document.getElementById("Chart1"));
        this.chart.setOption(this.getOption());
        this.chart.on('legendselectchanged', onLegendSelectChanged);
    };

    legend = ['发病人数','发病率','死亡人数','死亡率'];
    cssSelected = {'发病人数':true,'发病率':true,'死亡人数':true,'死亡率':true};
    data = [{"name":"发病人数","type":"bar","data":[50.632,55.121,45.321,40.215,36.90]},{"name":"发病率","type":"line","yAxisIndex":1,"data":[0.71,0.768,0.634,0.558,0.544]},{"name":"死亡人数","type":"bar","data":[1230,1021,857,923,775]},{"name":"死亡率","type":"line","yAxisIndex":1,"data":[0.196,0.253,0.189,0.191,0.243]}];
    year = [2011,2012,2013,2014,2015];
    new Chart1(legend, cssSelected, data, year);

    $("#tableBody tr th img").click(function(){
        if($(this).attr('src')=='images/btn_s.png'){
            $(this).attr('src','images/btn_us.png');
        }else{
            $(this).attr('src','images/btn_s.png');
        }
        setValue();
    });

    $("#tableHead tr th img").click(function(){
        if($(this).attr('src')=='images/btn_s.png'){
            $(this).attr('src','images/btn_us.png');
        }else{
            $(this).attr('src','images/btn_s.png');
        }
        setValue();
    });

    function onLegendSelectChanged(params){
        $("#tableBody tr th img").next('span').each(function(){
            if($(this).html() == params.name){
                if($(this).prev('img').attr('src').indexOf('images/btn_s.png')>-1){
                    $(this).prev('img').attr('src','images/btn_us.png');
                }else{
                    $(this).prev('img').attr('src','images/btn_s.png');
                }
            }
        });
    }

    function setValue(){
        legend = [];
        data = [];
        var yearSelected = [];
        //选中的是哪几年
        $("#tableHead tr th img").each(function(){
            if($(this).attr('src')=='images/btn_s.png'){
                yearSelected.push(parseInt($(this).next().html()));
            }
        });
        year.sort();
        //选中了哪几个指标
        $("#tableBody tr th img").each(function(){
            var name;
            name = $(this).next('span').html();
            legend.push(name);
            var key = name;
            var dataItem = [];
            for(var i=0; i<yearSelected.length; i++){
                var col = 2016 - yearSelected[i];
                dataItem.push($(this).parent().parent().children('td').eq(col).html());
            }
            if(name == '发病人数' || name == '死亡人数'){
                data.push({'name': name, 'type': 'bar', 'data': dataItem});
            }else{
                data.push({'name': name, 'type': 'line', 'data': dataItem, "yAxisIndex":1});
            }
            if($(this).attr('src')=='images/btn_s.png'){
                cssSelected[key]=true;
            }else{
                cssSelected[key]=false;
            }
        });
        new Chart1(legend, cssSelected, data, year);
    }

});
