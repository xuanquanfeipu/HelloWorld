var curNav="nav_0";
$(document).ready(function() {
	// 全市GDP及产业分布
	var Chart1 = function() {
		this.getOption = function() {
			return {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        right: 10,
			        bottom: 15,
			        data:['第一产业','第二产业','第三产业']
			    },
			    series: [
			        {
			            name:'GDP总量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            center: ['50%', '45%'],
			            label: {
			                normal: {
			                	show:false
			                    // position: 'inner',
			                    // formatter: '{d}%',			    				
			                    // textStyle: {
			                    //     color: '#FFC84A',
			                    //     fontSize: 10
			                    // }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:3287.26, name:'第一产业'},
			                {value:14589.50, name:'第二产业'},
			                {value:12550.16, name:'第三产业'}
			            ],
			            color: ['#3BD8AB', '#CB65BB', '#574FBE'],
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
		var yearGDPList = [16037.96,19669.56,22154.23,24621.67,27037.32,30426.92];
		var yearGrowthList = [14.21,12.63,11.14,9.4,9.8,12.54];
		
		var quarterList = ['2014一季度', '2014二季度', '2014三季度', '2014四季度', '2015一季度', '2015二季度', '2015三季度', '2015四季度'];
		var quarterGDPList = [5042.72, 6932.38, 6556.14, 8517.22, 5392.25, 7408.19, 7450.06, 8796.71];
		var quarterGrowthList = [-33.54, 37.47, -5.42, 29.91,-36.69,37.38, 0.57, 18.07];

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
				tooltip: {
					trigger: 'axis',
					formatter: '{b0}<br/>GDP总量：{c0}亿元<br/>GDP增长率：{c1}%'
				},
				legend: {
					data: ['总量', '增长率']
				},
				grid: {
					left: 60,
					right: 50,
					bottom: 40
				},
				xAxis: [{
					type: 'category',
					axisLabel: {
						rotate: 0
					},
					data: timeList,
		            splitLine: {
		            	show: false
		            },
		            axisTick: {
				        show: false
				    }
				}],
				yAxis: [{
					type: 'value',
					name: '数量：亿元',
					axisLabel: {
						formatter: '{value}'
					},
		            splitLine: {
		            	show: false
		            },
		            axisTick: {
				        show: false
				    }
				}, {
					type: 'value',
					name: '增长率(%)',
					axisLabel: {
						formatter: '{value} %'
					},
		            splitLine: {
		            	show: false
		            },
		            axisTick: {
			            show: false
			        }
				}],
				series: [{
					name: '总量',
					type: 'bar',
					data: dataList,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#2EC8CA'
						}
					}
				}, {
					name: '增长率',
					type: 'line',
					yAxisIndex: 1,
					data: growthList,
					itemStyle: {
						normal: {
							color: '#1488C2'
						}
					}
				}]
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
				color: ['#0C6BD9'],
				//tooltip: {
				//	trigger: 'axis',
				//	formatter: '{b0}<br/>GDP总量：{c0}亿元'
				//},
				
				calculable: true,
				grid: {
		          left: 50
		        },
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
					data: ["宣武区", "昌平区", "丰台区", "朝阳区", "海淀区"],
					//offset:5,
					axisLine: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				}
				],
				series: [
				{
						name: "GDP总量",
						
						type: "bar",
						//barWidth: 22,
						barMaxHeight:230,
						barCategoryGap:'50%',
						z: 10,
						tooltip:{
						 show:false
						},
						data: [2335.1, 2601.5, 2709.0, 2886.2, 8510.1]
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
					trigger: 'axis',
					formatter: '{b0}<br/>GDP总量：{c0}亿元'
				},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							data : ['农、林、\n牧、渔业', '批发和零\n售业', '工业', '交通运输\n、仓储和\n邮政业', '房地产业', '水利、环\n境和公共\n设施管理\n业', '教育','公共管理\n、社会保\n障和社会\n组织','其他'],
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
				            axisTick: {
					            show: false
					        }		 
						}
					],
					yAxis : [
						{
							name:'总额（亿元）',
							nameTextStyle:{
								color: '#7F7F7F'
							},
							type : 'value',
							splitLine: {
								show: false
							},
				            axisTick: {
					            show: false
					        },
							/*axisLine: {
							show: false
							},
							axisTick: {
								show: false
							},*/
							axisLabel: { show: true, textStyle: { color: '#7F7F7F' } } 
						}
					],
					series : [
						{
							name:'GDP',
							type:'bar',
							 itemStyle: {
								normal: {
									color: '#574FBE'
								}
							},
						   tooltip:{
							 formatter: "{b}(亿元)",
							 show:true
							},
							  z: 10,
							data:[3343.52,1879.26,12724.69,1132.4,900.25,150.54,433.91,877.75,8984.6]
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

