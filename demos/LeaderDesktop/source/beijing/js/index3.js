var curmap=0;
var curNav="nav_home";
var mapchart = echarts.init(document.getElementById('mapchart'));
    mapchart.setOption({
        title: {
			text: '北京市经济发展分布情况',
			x:'center',
            y:490,
            subtextStyle:{
            	color:'#564FBE',
            	fontSize: 20,
			    fontWeight: 'bolder'
            },
            textStyle:{
            	fontSize: 14,
			    // fontWeight: 'bolder',
			    color: '#525164'
            }
		},
		tooltip: {
				trigger: 'item',
				formatter: '{b}<br/>{c} 亿元'
			  },
		visualMap: {
				min: 8510.13,
				max: 447.70,
				left: 'center',
				//top: 'bottom',
				bottom: 50,
				orient:'horizontal',
				inverse:true,
				itemWidth:15,
				itemHeight:160,
				text: ['高','低'],           // 文本，默认为数值文本
				calculable: true,
				inRange: {
				  color: ['#f1f3ff','#2e40a4']
				}
			  },
		series: [{
            type: 'map',
            map: '北京',
			roam: false,
			label: {
				  normal: {
					show: true
				  },
				  emphasis: {
					show: true
				  }
				},
			itemStyle: {
                normal: {
                    borderWidth:1,
                    borderColor:'#fff'
                }
			},
			top:20,
			selectedMode : 'single',
			data:[{name:'海淀区',value:8510.13},
				{name:'怀柔区',value:2335.11},
				{name:'密云区',value:1703.10},
				{name:'延庆区',value:2601.58},
				{name:'昌平区',value:1387.00},
				{name:'顺义区',value:2886.28},
				{name:'平谷区',value:2709.02},
				{name:'门头沟区',value:447.70},
				{name:'朝阳区',value:1354.41},
				{name:'丰台区',value:2012.07},
				{name:'通州区',value:1418.18},
				{name:'大兴区',value:1273.25},
				{name:'房山区',value:1291.66},
				{name:'西城区',value:497.44},
				{name:'东城区',value:497.44},
				{name:'石景山区',value:497.44},
				{name:'宣武区',value:497.44},
				{name:'崇文区',value:497.44}]
        }]
    });
var piechart = echarts.init(document.getElementById('piechart'));
    piechart.setOption({
        /*
		title: {
			text: '全省GDP',
			subtext: '31244.68亿',
			x:'center',
            y:80,
            subtextStyle:{
            	color:'#564FBE',
            	fontSize: 20,
			    fontWeight: 'bolder'
            },
            textStyle:{
            	fontSize: 16,
			    // fontWeight: 'bolder',
			    color: '#333'
            }
		},*/
		grid: {
			left: 10
		},
		color: ['#02BFF6','#58E1E7','#B279E2'],
		tooltip: {
				trigger: 'item',
				formatter: '{b}<br/>{c} 亿元 ({d}%)'
			  },
		legend: {
			x:'center',
        	y:'bottom',
			textStyle:{
				fontSize:10
			},
			itemWidth:10,
			itemHeight:10,
			padding:[0,0,5,0],
			width:250,
			data:['第一产业','第二产业','第三产业']
			
		},
		series: [{
            name:'总数',
            type:'pie',
			center:['50%', '45%'],
			radius: ['65%', '90%'],
			label: {
                normal: {
                    show:false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[{value:3287.26,name:'第一产业',selected:false,itemStyle:{normal:{color:'#3AD8AB'}}}, {value:14589.50,name:'第二产业',selected:false,itemStyle:{normal:{color:'#CB64BB'}}}, {value:12550.16,name:'第三产业',selected:false,itemStyle:{normal:{color:'#564fbe'}}}]
        }]
    });




var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321];
var yMax = 500;
var dataShadow = [];
for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}
var barchart1 = echarts.init(document.getElementById('barchart1'));
    barchart1.setOption({
        title: {
			text: ''
		},
		color: ['#3697FF'],
		tooltip: {
				trigger: 'item',
				// show:false,
				// borderColor:"red",
				// showContent:false,
				formatter: '{b}<br/>{c} 亿元'
			  },
		grid:{
              x:65,
              y:30,
              x2:55,
              y2:60,
			  bottom:100,
              borderWidth:1
             },
		xAxis: [
			{
				splitLine:{show: false},//去除网格线
				type: 'category',
				axisLabel:{
					'interval':1,
					 textStyle: {  //X轴字体颜色
					 color: '#8996a3',
					 fontSize:12	 //X轴字体大小
				}
				//rotate: 30
				},
				axisTick:{
					show:false
				},
				nameTextStyle:{
					fontSize:11  //字体大小
				},
				axisLine:{
					lineStyle:{
						color:'#eeedff' //字体颜色
					}
				},

				data: ['制造业','房地产','水利\n环境\n公共设施\n管理业','交通运输\n仓储\n邮政业','批发\n零售业','农林\n牧渔业',
				'电力\n燃气\n水的生产\n供应业','公共管\n理社会\n组织','采矿业','租赁\n商务\n服务业']
			}
		],
		yAxis: [
        {
        	// axisLine: {show: false},//去掉Y轴线
        	splitLine:{show: false},//去除网格线
            type: 'value',
            name: '总额(亿元)',
            nameTextStyle:{
                color:"#8C98A5", //总额的颜色值
                fontSize:12
            },
			axisLine:{
					lineStyle:{
						color:'#eeedff'
					}
				},
            axisTick:{
					show:false
				},
            min: 0,
            max: 10000,
            axisLabel: {
                formatter: '{value} ',
                 textStyle: {
					  fontSize:14,	//Y轴字体大小
                      color: '#8996a3'  //Y轴字体颜色
                }
            }
        }],
		series: [
		
		{
			barWidth:24,
            name:'总额',
            type:'bar',
            data:[9079.12, 3651.92, 3539.62, 1800.94, 1270.61,1116.75,926.00, 690.03, 626.75, 552.93],
            itemStyle:{normal:{color:'#564FBE'}}
        }]
    });
function getCurmap(params){
	//console.log(params.selected['海淀区']);
	if(params.selected['海淀区']){
		return 1;
	}else{
		return 0;
	}
}
var data1 = [];
mapchart.on('mapselectchanged', function (params) {
		//console.log(params);
		curmap=getCurmap(params);
		/*
		mapchart.setOption({
            series: [{
                type: 'map',
                map: 'changsha',
				top:130,
            }]
        });*/
		if(curmap==1){
			//切换到海淀区的数据
			piechart.setOption({
				series: [{
					data:[{value:341.78,name:'第一产业',selected:false,itemStyle:{normal:{color:'#3AD8AB'}}}, 
					{value:433.58,name:'第二产业',selected:false,itemStyle:{normal:{color:'#CB64BB'}}}, 
					{value:3834.77,name:'第三产业',selected:false,itemStyle:{normal:{color:'#564fbe'}}}]
				}]
			});
			$("#pieTitle div").eq(0).html("海淀区GDP");
			$("#pieTitle div").eq(1).html("8510.13亿");
			$("#pieTitle div").eq(2).html("8.76%↑");
			$(".rkzs p").eq(0).html("海淀区人口总数");
			$(".rkzs p").eq(1).html("743.18万");
			$(".ncczrk p:eq(0) span:eq(2)").html("552.78万");
			$(".ncczrk p:eq(1) span:eq(2)").html("190.40万");
			$(".sr_div p span").html("海淀区财政收支情况");
			$(".sr_div div:eq(0) p:eq(0)").html("718.95亿元");
			$(".sr_div div:eq(0) p:eq(1)").html("13.6%↑");
			$(".sr_div div:eq(1) p:eq(0)").html("925.0亿元");
			$(".sr_div div:eq(1) p:eq(1)").html("15.28%↑");
			$(".tzhy_div span").html("海淀区固定投资行业TOP10");
			$(".int_tz").html("6363.28亿元");
			$(".int_zzl").html("17%↑");
			barchart1.setOption({
				xAxis: [
					{	
						data: ['制造业','房地产','水利\n环境\n公共设施\n管理业','交通运输\n仓储\n邮政业','批发\n零售业'
						,'租赁\n商务\n服务业','科学研究\n技术服务','教育','文化\n体育\n娱乐业','住宿\n餐饮业']
					}
				],
				yAxis: [
				{	
					// axisLine: {show: false},//去掉Y轴线
					splitLine:{show: false},//去除网格线
					type: 'value',
					name: '总额(亿元)',
					nameTextStyle:{
						color:"#8C98A5"
					},
					// splitArea : {show : true},
					min: 0,
					max: 2500,
					axisLabel: {
						formatter: '{value} '
					}
				}],
				series: [
				/*{ 	
					tooltip:{
						// showContent:false //隐藏灰色区域气泡
					},
					type: 'bar',
					itemStyle: {
						normal: {color: 'rgba(0,0,0,0.05)'}
					},
					barGap:'-100%',
					barCategoryGap:'40%',
					data: dataShadow,
					// itemStyle: {normal: {color:'#F5F5F5'}},
					//data填你需要的背景的值
					barWidth:24,
					data:[2500,2500,2500,2500,2500,2500,2500,2500,2500,2500],
					animation: false
				},*/
				{
					barWidth:24,
					name:'总额',
					type:'bar',
					data:[2030.73, 1293.64, 752.97, 481.60, 418.91,240.85,220.72, 122.37, 107.36, 98.96],
					itemStyle:{normal:{color:'#564FBE'}}
				}]
			});
		}else{
			//切换到北京市的数据
			piechart.setOption({
				series: [{
					data:[{value:3287.26,name:'第一产业',selected:false,itemStyle:{normal:{color:'#3AD8AB'}}}, 
					{value:14589.50,name:'第二产业',selected:false,itemStyle:{normal:{color:'#CB64BB'}}}, 
					{value:12550.16,name:'第三产业',selected:false,itemStyle:{normal:{color:'#564fbe'}}}]
				}]
			});
			$("#pieTitle div").eq(0).html("全市GDP");
			$("#pieTitle div").eq(1).html("30426.92亿");
			$("#pieTitle div").eq(2).html("8.6%↑");
			$(".rkzs p").eq(0).html("全市人口总数");
			$(".rkzs p").eq(1).html("6783.03万");
			$(".ncczrk p:eq(0) span:eq(2)").html("3451.88万");
			$(".ncczrk p:eq(1) span:eq(2)").html("3331.15万");
			$(".sr_div p span").html("全市财政收支情况");
			$(".sr_div div:eq(0) p:eq(0)").html("4011.04亿元");
			$(".sr_div div:eq(0) p:eq(1)").html("10.3%↑");
			$(".sr_div div:eq(1) p:eq(0)").html("5728.72亿元");
			$(".sr_div div:eq(1) p:eq(1)").html("14.2%↑");
			$(".tzhy_div span").html("全市固定投资行业TOP10");
			$(".int_tz").html("25954.27亿元");
			$(".int_zzl").html("18%↑");
			barchart1.setOption({
				xAxis: [
					{	
						data: ['制造业','房地产','水利\n环境\n公共设施\n管理业','交通运输\n仓储\n邮政业','批发\n零售业','农林\n牧渔业',
				'电力\n燃气\n水的生产\n供应业','公共管\n理社会\n组织','采矿业','租赁\n商务\n服务业']
					}
				],
				yAxis: [
				{	
					// axisLine: {show: false},//去掉Y轴线
					splitLine:{show: false},//去除网格线
					type: 'value',
					name: '总额(亿元)',
					nameTextStyle:{
						color:"#8C98A5"
					},
					// splitArea : {show : true},
					min: 0,
					max: 10000,
					axisLabel: {
						formatter: '{value} '
					}
				}],
				series: [
				/*{ 	
					tooltip:{
						// showContent:false  //隐藏灰色区域气泡
					},
					type: 'bar',
					itemStyle: {
						normal: {color: 'rgba(0,0,0,0.05)'}
					},
					barGap:'-100%',
					barCategoryGap:'40%',
					data: dataShadow,
					// itemStyle: {normal: {color:'#F5F5F5'}},
					//data填你需要的背景的值
					barWidth:24,
					data:[10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],
					animation: false
				},*/
				{
					barWidth:24,
					name:'总额',
					type:'bar',
					data:[9079.12, 3651.92, 3539.62, 1800.94, 1270.61,1116.75,926.00, 690.03, 626.75, 552.93],
					itemStyle:{normal:{color:'#564FBE'}}
				}]
			});
		}
	});
