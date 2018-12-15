var curNav = "nav_5";
$(document).ready(function() {		
	// 全市GDP及产业分布
	var Chart1 = function() {
		this.getOption = function() {
			return {
			    color: ['#02BFF6','#58E1E7','#B279E2'],
	            tooltip: {
	              trigger: 'item',
	              formatter: "{a} <br/>{b}: {c} ({d}%)"
	            },
	            grid: {
	              left: '3%',
	              right: '4%',
	              containLabel: true
	            },
	            legend: {
	              orient: 'vertical',
	              right: 2,
	              bottom: 35,
	              data:['药品','检查治疗','材料','其他']
	            },
	            title: [{
	              text: '自费费用\n',
	              left: '49%',
	              top: '40%',
	              textAlign: 'center',
	              textBaseline: 'middle',
	              textStyle: {
	                color: '#5a6e83',
	                fontWeight: 'normal',
	                fontSize: 14
	              }
	            }, {
	              text:'108070万元',
	              left: '49%',
	              top: '51%',
	              textAlign: 'center',
	              textBaseline: 'middle',
	              textStyle: {
	                color: '#3b53a2',
	                fontWeight: 'normal',
	                fontSize: 18
	              }
	            }],
	            series: [{
	              name:'自费费用(万元)',
	              type:'pie',
	              radius: ['50%', '70%'],
	              avoidLabelOverlap: false,
	              center: ['50%', '45%'],
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
	              color: ['#3BD8AB', '#CB65BB', '#574FBE','#1384de'],
	              data:[
		                {value:14580, name:'药品'},
				        {value:43760, name:'检查治疗'},
				        {value:38760, name:'材料'},
				        {value:10970, name:'其他'}
	                 ]
	            }]
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
				          data: [9423,12154,17654,20154,25468,29874]
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
			        color: ['#fb5e6e','#02BFF6'],
		            tooltip : {
		              trigger: 'item',
		              formatter: "{a} <br/>{b} : {c} ({d}%)"
		            },

		            legend: {
		              orient: 'vertical',
		              right: 10,
		              bottom: 15,
		              data:['医保占比','自费占比']
		            },
		            grid: {
		              left: '0%',
		              right: '10%',
		              top: '1%',
		              containLabel: true
		            },
		            series : [
		              {
		                name: '医保占比分析',
		                type: 'pie',
		                radius : '55%',
		                center: ['50%', '40%'],
		                data:[
		                  {value:0.6, name:'医保占比'},
		                  {value:0.4, name:'自费占比'}
		                ],
		                
		              }
		            ]
			};
			
		};

		this.chart = echarts.init(document.getElementById("chart3"));
		this.chart.setOption(this.getOption('year'));
	};
	
		// 全市GDP行业排行
	var Chart4 = function() {

		this.getOption = function(type) {
			return{	
			    color: ['#e91e63','#0c6bd8','#564fbe','#10bd5d','#ffca28','#a349a4'],
		        tooltip : {
		          trigger: 'item',
		          formatter: "{a} <br/>{b} : {c} ({d}%)"
		        },
		        legend: {
		         
				   right : 20,
				  y : 'center',
				  align: 'right',
				  orient: 'vertical',
		          data: ['恶性肿瘤','消化系统疾病','心脏病','脑血管病','内分泌代谢疾病','呼吸系统疾病']
		        },
		        grid: {
		          left: '0%',
		          right: '5%',

		          top: '1%',
		          containLabel: true
		        },
		        series : [
		          {
		            name: '医保分析-疾病分析（万元）',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		               {value:29874,name:"恶性肿瘤"},
		               {value:18954,name:"消化系统疾病"},
		               {value:15897,name:"心脏病"},
		               {value:12347,name:"脑血管病"},
		               {value:12034,name:"内分泌代谢疾病"},
		               {value:11456,name:"呼吸系统疾病"}
		            ],
		            itemStyle: {
		              emphasis: {
		                shadowBlur: 10,
		                shadowOffsetX: 0,
		              }
		            }
		          }
		        ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart4"));
		this.chart.setOption(this.getOption());
	};
	var Chart5 = function() {

		this.getOption = function(type) {
			return{	
				 tooltip: {
		          trigger: 'axis'
		        },
		        grid: {
		          left: '3%',
		          right: '4%',
		          containLabel: true
		        },
		        xAxis : [
		          {
		            type : 'category',
		            data :['2011','2012','2013','2014','2015'],
		            axisTick: {
		              alignWithLabel: false
		            },
		            axisLabel:{
		              interval:0,//横轴信息全部显示
		              textStyle: { color: '#7F7F7F' }
		            },
		            splitLine: {
		              textStyle: { color: 'white' },
		              show: false
		            },
		            axisLine: {
		              textStyle: { color: 'white' }
		            },
		          }
		        ],
		        yAxis : [
		          {
		            name:'总额（万元）',
		            nameTextStyle:{
		              color: '#7F7F7F'
		            },
		            type : 'value',
		            axisLine: {
		              show: true
		            },
		            splitLine: {
		              show: false
		            },
		            axisTick: {
		              show: false
		            },
		            axisLabel: { show: true, textStyle: { color: '#7F7F7F' } }
		          }
		        ],
		        series : [
		          {
		            name:'费用',
		            type:'bar',
		            itemStyle: {
		              normal: {
		                color: '#574FBE'
		              }
		            },
		            tooltip:{
		              formatter: "{b}(万元)",
		              show:true
		            },
		            z: 6,
		            data:['63150','71290','75600','82220','86020']
		          }
		        ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart5"));
		this.chart.setOption(this.getOption());
	};
	new Chart1();
	new Chart2();
	new Chart3();
	new Chart4();
	new Chart5();
});

