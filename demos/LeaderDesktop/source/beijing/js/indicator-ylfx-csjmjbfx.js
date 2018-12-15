/**
 * Created by tanxin on 2017/4/24.
 */
var curNav = "nav_4";
$(function(){
    var legend = [];
    var data = [];
    var selected;

    var Chart1 = function(legend1, data1, selected1) {
        this.getOption = function () {
            return {
                //color:['#fb5c6e','#4e99ff','#6c6ff0','#46c667','#ffda4b','#eb1d65','#982ab1','#0c6bd9'],
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'right',
                    y : 'bottom',
                    orient: 'vertical',
                    data: legend1,
                    selected:selected1
                },
                series : [
                    {
                        name: '疾病分类(1/10万)',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '40%'],
                        data:data1,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        };

        this.chart = echarts.init(document.getElementById("Chart1"));
        this.chart.setOption(this.getOption());
        this.chart.on('legendselectchanged', onLegendSelectChanged);
    };

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

    var Chart2 = function(data2) {
        this.getOption = function () {
            return {
                color:['#fd9f19'],
                tooltip: {
                    show: true
                },
                legend: {
                    data:['增长率']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : [2011,2012,2013,2014,2015]
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '死亡率(1/10万)',
                        axisLabel: {
                            formatter: '{value} '
                        }
                    }],
                series : [
                    {
                        "name":"死亡率",
                        "type":"line",
                        "data":data2,
                        itemStyle:{
                            normal : {
                                lineStyle:{
                                    color:'#4ba3d1'
                                }
                            }
                        }
                    }
                ]
            }
        };

        this.chart = echarts.init(document.getElementById("Chart2"));
        this.chart.setOption(this.getOption());
    };

    legend = ['传染病','恶性肿瘤','心脏病','脑血管病','呼吸系统疾病','内分泌代谢疾病','消化系统疾病'];
    data = [{"value":10.63,"name":"传染病"},{"value":124.53,"name":"恶性肿瘤"},{"value":159.58,"name":"心脏病"},{"value":120.48,"name":"脑血管病"},{"value":81.90,"name":"呼吸系统疾病"},{"value":17.25,"name":"内分泌代谢疾病"},{"value":13.60,"name":"消化系统疾病"}];
    selected = {'传染病':true},{'恶性肿瘤':true},{'心脏病':true},{'脑血管病':true},{'呼吸系统疾病':true},{'内分泌代谢疾病':true},{'消化系统疾病':true};
    new Chart1(legend, data, selected);
    new Chart2([1.0,1.4,1.2,1.1,0.3]);

    $("#tableBody tr th img").click(function(){
        if($(this).attr('src')=='images/btn_s.png'){
            $(this).attr('src','images/btn_us.png');
        }else{
            $(this).attr('src','images/btn_s.png');
        }
        setValue();
    });

    $("#tableHead tr th input").click(function(){
        setValue();
    });

    var deathRate = [
        [87.02, 99.41, 109.17, 123.50, 124.23],
        [101.12, 112.23, 133.36, 158.86, 159.58],
        [62.12, 71.26, 86.5, 108.08, 120.48],
        [38.13, 41.31, 51.15, 81.32, 81.90],
        [7.42, 8.15, 10.08, 15.94, 17.25],
        [8.75, 10.20, 11.42, 15.57, 13.60],
        [7.62, 8.53, 9.64, 10.09, 10.63]
    ];

    $("#diseaseType").change(function(){
        new Chart2(deathRate[$(this).val()]);
    });

    function setValue(){
        legend = [];
        data = [];
        //选中的是哪一年
        var year = $("#tableHead tr th input:checked").val();
        //选中的是哪一列
        var col = 2015 - year;
        $("#tableBody tr th img").each(function(){
            var name = $(this).next('span').html();
            var value = $(this).parent().parent().children('td').eq(col).html();
            legend.push(name);
            data.push({'name': name, 'value': value});
            var key = name;
            //选中了的菜单
            if($(this).attr('src').indexOf('btn_s.png')>-1){
                selected[key]=true;
            }else{
                selected[key]=false;
            }
        });
        new Chart1(legend, data, selected);
    }
});
