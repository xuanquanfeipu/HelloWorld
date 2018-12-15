 var curNav="nav_2";
$(document).ready(function() {	

	// 全市GDP及产业分布
	var Chart1 = function() {
		this.getOption = function() {
			return {
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: { // 坐标轴指示器，坐标轴触发有效
			          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			        }
			      },
			      legend: {
			        data:['教师','学生','师生比'],
			        y : 'top'
			      },

			      xAxis: [
			        {
			          type: 'category',
			          data: ['普通小学','普通初中','普通高中','普通高等学校'],
			          axisPointer: {
			            type: 'shadow'
			          },
			          splitLine:{
			            show:false
			          }
			        }
			      ],
			      yAxis: [
			        {
			          type: 'value',
			          name: '人数（万人）',
			          axisLabel: {
			            formatter: '{value}'
			          },
			          splitLine:{
			          show:false
			        }
			        },
			        {
			          type: 'value',
			          name: '比率',
			          axisLabel: {
			            formatter: '{value} '
			          },
			          splitLine:{
			            show:false
			          }
			        }
			      ],
			      series:[
			        {  
			        	name:'教师',
			        	type:'bar',
			        	barWidth:30,
			        	itemStyle: {normal: {color: '#3ad6ab'}},
			        	data:[22.608,23.825,2.604,6.662]
			        },
			        {   
			        	name:'学生',
			        	type:'bar',
			        	barWidth:30,
			        	itemStyle: {normal: {color: '#564fbe'}},
			        	data:[488.86,329.85,64.8,117.98]
			        },
			        {   
			        	name:'师生比',
			        	type:'line',
			        	yAxisIndex: 1,
			        	symbol: 'circle',
			        	symbolSize : 10,
			        	itemStyle: {normal: {color: '#ff9f17',lineStyle:{color:'#ffc928'}}},
			        	data:[4.62,7.22,4.01,5.65]
			        }
			      ]
			};
		}
		
		this.chart = echarts.init(document.getElementById("chart1"));
		this.chart.setOption(this.getOption());
	}

	// 全市GDP发展情况
	var Chart2 = function() {

		var yearList = [2010,2011,2012,2013,2014,2015];
		var yearGDPList = [18367.65,20187.65,23005.53,25672.1,28085.35,30426.88];
		var yearGrowthList = [9.91,13.96,11.59,9.40,8.34,7.91];
		
		var quarterList = ['2014一季度', '2014二季度', '2014三季度', '2014四季度', '2015一季度', '2015二季度', '2015三季度', '2015四季度'];
		var quarterGDPList = [5392.25, 7408.19, 7450.06, 8796.71, 5042.72, 6932.38, 6556.14, 8517.22];
		var quarterGrowthList = [7.6, 7.6, 7.6, 7.9, 8.4, 8.5, 8.7, 8.6];

		this.getOption = function(type) {
			var timeList = null;
			var dataList = null;
			var growthList = null;
			if (type == 'year') {
				timeList = yearList;
				dataList = yearGDPList;
				growthList = yearGrowthList;
			} else {
				timeList = quarterList;
				dataList = quarterGDPList;
				growthList = quarterGrowthList;
			}

			return {
				      color: ['#0C6BD9'],
				      calculable: true,
				      xAxis: [{
				        type: "value",
				        boundaryGap: [0, 0],

				        show: false,
				        axisLine: {
				          show: false
				        },
				        splitLine: {
				          show: false
				        },
				        axisTick: {
				          show: false
				        }

				      }],
				      yAxis: [{
				        type: "category",
				        data: ["预计毕业数", "毕业数", "在校数", "招生数"],
				        offset:-1,
				        axisLine: {
				          show: false
				        },
				        splitLine: {
				          show: false
				        },
				        axisTick: {
				          show: false
				        },
				        axisLabel : {
				          show:false,
				          interval: 0,
				          boundaryGap : false,
				          margin:2,
				          width:100
				        }
				      }
				      ],
				      series: [
				        {
				          name: "GDP总量",
				          type: "bar",
				          barMaxHeight:230,
				         // barCategoryGap:'50%',
				          z: 10,
				          tooltip:{
				            show:false
				          },
				          data: [15.42,15.4185,67.8314,17.1289]
				        }
				      ]
			};
		}

		this.chart = echarts.init(document.getElementById("chart2"));
		this.chart.setOption(this.getOption('year'));

		var ins = this;

		$("#chart-pane-2 .toggle-btn a").click(function() {
			var self = $(this);
			if (self.hasClass("target")) {
				return;
			} 
			$("#chart-pane-2 .toggle-btn a.target").removeClass("target");
			self.addClass("target");
			type = self.attr("tp");
			ins.chart.setOption(ins.getOption(type));
		});
	};
	// 全市GDP市州排行
	var Chart3 = function() {

		this.getOption = function(type) {
			return{
			      //color:['#ff9800','#fb5d6f','#4e99ff','#6c6fef','#47c668'],
			      tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c}亿元 (占比{d}%)"
			      },
			      legend: {
			        x : 'right',
			        y : 'bottom',
			        orient: 'vertical',
			        data: ['国家财政性教育经费','民办学校中举办者投入','社会捐赠经费','事业收入','其他教育经费']
			      },
			      series : [
			        {
			          name: '教育经费及占比',
			          type: 'pie',
			          radius : '55%',
			          center: ['45%', '50%'],
			          data:[
				              {value:1100.68,name:'国家财政性教育经费'},
				              {value:368.564,name:'民办学校中举办者投入'},
				              {value:30.654,name:'社会捐赠经费'},
				              {value:59.421,name:'事业收入'},
				              {value:210.841,name:'其他教育经费'},
			              ],
			          itemStyle: {
			            emphasis: {
			              shadowBlur: 10,
			              shadowOffsetX: 0,
			              shadowColor: 'rgba(0, 0, 0, 0.5)'
			            }
			          }
			        }
			      ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart3"));
		this.chart.setOption(this.getOption('year'));
	};
	
		// 全市GDP行业排行
	var Chart4 = function() {

		this.getOption = function(type) {
			return{	
			      tooltip: {
			        trigger: 'axis'
			      },
			      legend: {
			        data:['适龄儿童入学率','小学升学率','初中升学率','高中升学率'],
			        y : 'top',
			        width:'50%',
			        x: 'center'
			      },

			      xAxis: [
			        {
			          type: 'category',
			          data: ['2011','2012','2013','2014','2015'],
					  splitLine: {
				          show: false
				        },
			          axisPointer: {
			            type: 'shadow'
			          }
			        }
			      ],
			      yAxis: [
			        {
			          type: 'value',
			          name: '升学率百分比',
			          axisLabel: {
			            formatter: '{value}% '
			          },
			          splitLine: {
			            show: false
			          }
			        }
			      ],
			      series:[
				      {
				      	 name:'适龄儿童入学率',
				      	 type:'line',
				      	 symbol: 'circle',
				      	 symbolSize : 8,
				      	 // itemStyle: {normal: {lineStyle:{color:'#1286c3'}}},
				      	 data:[99.88,99.85,99.96,99.96,99.97]
				      },
				       {
				      	 name:'小学升学率',
				      	 type:'line',
				      	 symbol: 'circle',
				      	 symbolSize : 8,
				      	 // itemStyle: {normal: {lineStyle:{color:'#2eae34'}}},
				      	 data:[100.65,96.4,99.48,100.59,101.15]
				      },
				       {
				      	 name:'初中升学率',
				      	 type:'line',
				      	 symbol: 'circle',
				      	 symbolSize : 8,
				      	 // itemStyle: {normal: {lineStyle:{color:'#2ec7c9'}}},
				      	 data:[71.34,73.42,80.23,88.57,86.90]
				      },
				       {
				      	 name:'高中升学率',
				      	 type:'line',
				      	 symbol: 'circle',
				      	 symbolSize : 8,
				      	 // itemStyle: {normal: {lineStyle:{color:'#204ece'}}},
				      	 data:[75.43,86.4,79.56,79,78.56]
				      }
			      ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart4"));
		this.chart.setOption(this.getOption());
	};
	new Chart1();
	new Chart2();
	new Chart3();
	new Chart4();
});

