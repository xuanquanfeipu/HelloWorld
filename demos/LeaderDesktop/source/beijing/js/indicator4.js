var curNav="nav_0";
$(document).ready(function() {

	dataSet = {
		'hunan': {			
			industryDistrib: [{
				value: 3287.26,
				growth:8.89,
				name: '第一产业'
			}, {
				value: 14589.5,
				growth:2.89,
				name: '第二产业'
			}, {
				value: 12550.16,
				growth:15.28,
				name: '第三产业'
			}]
		},
		'海淀区': {
			value: 8510.13,
			growth: 8.76,
			industryDistrib: [{
				value: 341.78,
				growth:8.74,
				name: '第一产业'
			}, {
				value: 4333.58,
				growth:2.13,
				name: '第二产业'
			}, {
				value: 3834.77,
				growth:14.68,
				name: '第三产业'
			}]
		},
		'昌平区': {
			value: 2335.1,
			growth: 8.05,
			industryDistrib: [{
				value: 179.54,
				growth:7.05,
				name: '第一产业'
			}, {
				value: 1337.1,
				growth:4.25,
				name: '第二产业'
			}, {
				value: 818.46,
				growth:12.76,
				name: '第三产业'
			}]
		},
		'宣武区': {
			value: 1703.1,
			growth: 8.44,
			industryDistrib: [{
				value: 140.63,
				growth:9.18,
				name: '第一产业'
			}, {
				value: 933.79,
				growth:4.15,
				name: '第二产业'
			}, {
				value: 628.68,
				growth:12.85,
				name: '第三产业'
			}]
		},
		'朝阳区': {
			value: 2601.57,
			growth: 8.55,
			industryDistrib: [{
				value: 395.84,
				growth:9.24,
				name: '第一产业'
			}, {
				value: 1161.02,
				growth:3.54,
				name: '第二产业'
			}, {
				value: 1044.71,
				growth:12.18,
				name: '第三产业'
			}]
		},
		'平谷区': {
			value: 1387,
			growth: 9.94,
			industryDistrib: [{
				value: 299.38,
				growth:9.24,
				name: '第一产业'
			}, {
				value: 508.05,
				growth:5.24,
				name: '第二产业'
			}, {
				value: 579.57,
				growth:12.25,
				name: '第三产业'
			}]
		},
		'东城区': {
			value: 2886.28,
			growth: 8.09,
			industryDistrib: [{
				value: 317.33,
				growth:9.19,
				name: '第一产业'
			}, {
				value: 1446.83,
				growth:0.53,
				name: '第二产业'
			}, {
				value: 1122.12,
				growth:15.95,
				name: '第三产业'
			}]
		},
		'西城区': {
			value: 2709.02,
			growth: 7.75,
			industryDistrib: [{
				value: 355.2,
				growth:4.87,
				name: '第一产业'
			}, {
				value: 1237.48,
				growth:3.20,
				name: '第二产业'
			}, {
				value: 1116.34,
				growth:12.35,
				name: '第三产业'
			}]
		},
		'崇文区': {
			value: 447.7,
			growth: 9.19,
			industryDistrib: [{
				value: 51.83,
				growth:8.25,
				name: '第一产业'
			}, {
				value: 101.89,
				growth:2.16,
				name: '第二产业'
			}, {
				value: 293.98,
				growth:10.60,
				name: '第三产业'
			}]
		},
		'通州区': {
			value: 1354.41,
			growth: 8.08,
			industryDistrib: [{
				value: 251.41,
				growth:7.83,
				name: '第一产业'
			}, {
				value: 570.31,
				growth:3.25,
				name: '第二产业'
			}, {
				value: 532.69,
				growth:11.82,
				name: '第三产业'
			}]
		},
		'顺义区': {
			value: 2012.07,
			growth: 7.45,
			industryDistrib: [{
				value: 196.53,
				growth:8.98,
				name: '第一产业'
			}, {
				value: 1099.69,
				growth:3.31,
				name: '第二产业'
			}, {
				value: 715.85,
				growth:11.93,
				name: '第三产业'
			}]
		},
		'怀柔区': {
			value: 1418.17,
			growth: 8.97,
			industryDistrib: [{
				value: 308.57,
				growth:8.56,
				name: '第一产业'
			}, {
				value: 518.02,
				growth:5.21,
				name: '第二产业'
			}, {
				value: 591.58,
				growth:10.69,
				name: '第三产业'
			}]
		},
		'门头区': {
			value: 1273.24,
			growth: 7.79,
			industryDistrib: [{
				value: 184.36,
				growth:7.13,
				name: '第一产业'
			}, {
				value: 532.68,
				growth:3.18,
				name: '第二产业'
			}, {
				value: 556.2,
				growth:11.12,
				name: '第三产业'
			}]
		},
		'房山区': {
			value: 1291.65,
			growth: 6.67,
			industryDistrib: [{
				value: 189.19,
				growth:7.36,
				name: '第一产业'
			}, {
				value: 650.12,
				growth:0.35,
				name: '第二产业'
			}, {
				value: 452.34,
				growth:14.26,
				name: '第三产业'
			}]
		},
		'大兴区': {
			value: 497.44,
			growth: 8.85,
			industryDistrib: [{
				value: 75.66,
				growth:9.06,
				name: '第一产业'
			}, {
				value: 158.91,
				growth:1.54,
				name: '第二产业'
			}, {
				value: 262.87,
				growth:11.83,
				name: '第三产业'
			}]
		},
		'石景山区': {
			value: 1273.24,
			growth: 7.79,
			industryDistrib: [{
				value: 184.36,
				growth:7.13,
				name: '第一产业'
			}, {
				value: 532.68,
				growth:3.18,
				name: '第二产业'
			}, {
				value: 556.2,
				growth:11.12,
				name: '第三产业'
			}]
		},
		'门头沟区': {
			value: 1291.65,
			growth: 6.67,
			industryDistrib: [{
				value: 189.19,
				growth:7.36,
				name: '第一产业'
			}, {
				value: 650.12,
				growth:0.35,
				name: '第二产业'
			}, {
				value: 452.34,
				growth:14.26,
				name: '第三产业'
			}]
		},
		'延庆区': {
			value: 497.44,
			growth: 8.85,
			industryDistrib: [{
				value: 75.66,
				growth:9.06,
				name: '第一产业'
			}, {
				value: 158.91,
				growth:1.54,
				name: '第二产业'
			}, {
				value: 262.87,
				growth:11.83,
				name: '第三产业'
			}]
		},
		'丰台区': {
			value: 1273.24,
			growth: 7.79,
			industryDistrib: [{
				value: 184.36,
				growth:7.13,
				name: '第一产业'
			}, {
				value: 532.68,
				growth:3.18,
				name: '第二产业'
			}, {
				value: 556.2,
				growth:11.12,
				name: '第三产业'
			}]
		},
		'密云区': {
			value: 1291.65,
			growth: 6.67,
			industryDistrib: [{
				value: 189.19,
				growth:7.36,
				name: '第一产业'
			}, {
				value: 650.12,
				growth:0.35,
				name: '第二产业'
			}, {
				value: 452.34,
				growth:14.26,
				name: '第三产业'
			}]
		},
		'大兴区': {
			value: 497.44,
			growth: 8.85,
			industryDistrib: [{
				value: 75.66,
				growth:9.06,
				name: '第一产业'
			}, {
				value: 158.91,
				growth:1.54,
				name: '第二产业'
			}, {
				value: 262.87,
				growth:11.83,
				name: '第三产业'
			}]
		}
	};

	// 北京市GDP地域分布情况
	var Chart1 = function() {

		var self = this;

		this.getOption = function(type) {
			var rangeColor = null;
			if (window.theme == 1) {
				rangeColor = ['#fffbed', '#0078a2'];
			} else if (window.theme == 2) {
				rangeColor = ['#ebf4ff', '#065ec2'];
			} else {
				rangeColor = ['#f1f3ff','#2e40a4'];
			}
			return {
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						var data = dataSet[params.name];
						return params.name + '<br/>GDP：' + params.value + '亿元<br/>比率：' + data.growth + '%';
					}
				},
				visualMap: {
					min: 400,
					max: 8600,
					left: 'center',
					bottom: 0,
					orient: 'horizontal',
					inverse: true,
					itemWidth: 15,
					itemHeight: 160,
					text: ['高', '低'], // 文本，默认为数值文本
					calculable: true,
					inRange: {
						color: rangeColor
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
							borderWidth: 1,
							borderColor: '#FFF'
						}
					},
					top: 20,
					selectedMode: 'single',
					data: [{
						name: '海淀区',
						value: 8510.13
					}, {
						name: '昌平区',
						value: 2335.1
					}, {
						name: '宣武区',
						value: 1703.1
					}, {
						name: '朝阳区',
						value: 2601.57
					}, {
						name: '平谷区',
						value: 1387
					}, {
						name: '东城区',
						value: 2886.28
					}, {
						name: '西城区',
						value: 2709.02
					}, {
						name: '崇文区',
						value: 447.7
					}, {
						name: '通州区',
						value: 1354.41
					}, {
						name: '顺义区',
						value: 2012.07
					}, {
						name: '怀柔区',
						value: 1418.17
					}, {
						name: '门头区',
						value: 1273.24
					}, {
						name: '房山区',
						value: 1291.65
					}, {
						name: '大兴区',
						value: 497.44
					}, {
						name: '石景山区',
						value: 1273.24
					}, {
						name: '门头沟区',
						value: 1291.65
					}, {
						name: '延庆区',
						value: 497.44
					}, {
						name: '丰台区',
						value: 1273.24
					}, {
						name: '密云区',
						value: 1291.65
					}]
				}]
			};
		};

		this.chart = echarts.init(document.getElementById("chart1"));
		this.chart.setOption(this.getOption());
	};

	var Chart2 = function() {
		this.getOption = function(areaName) {
			var data = dataSet[areaName].industryDistrib;
			return {
			    tooltip : {
			        trigger: 'item',			        
					formatter:"{a} <br/>{b}: {c}<br/>占比：{d}%",
			        // formatter: function(params) {
			        // 	var data = params.data;
			        // 	return params.name + '<br/>GDP：' + params.value + '亿元<br/>增长率：' + params.data.growth + '%'
			        // }
			    },
			    legend: {
			        orient: 'vertical',
			        right: 10,
			        bottom: 15,
			        data:['第一产业','第二产业','第三产业']
			    },
			    series : [
			        {
			            name: 'GDP总量',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '40%'],
			            data: data,
			            color: ['#3AD8AB', '#564FBE', '#CB64BB'],
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
		};

		this.changeArea = function(areaName) {
			this.chart.setOption(this.getOption(areaName));
			var titleName = areaName=='hunan' ? '北京市' : areaName;
			$("#chart2-pane .title").text(titleName + "GDP产业分布情况");
		};

		this.chart = echarts.init(document.getElementById("chart2"));
		this.chart.setOption(this.getOption('hunan'));
	};

	var Chart3 = function() {

		var yAxisList = [
							["东城区", "西城区", "崇文区", "宣武区", "海淀区"], 
							['朝阳区', '丰台区', '通州区', '怀柔区', '大兴区'],
							['石景山区', '门头沟区', '延庆区', '密云区']
						];
		var dataList = [
							[9000, 9000, 9000, 9000, 9000], 
							[8510, 8510, 8510, 8510, 8510],
							//[22.44, 22.44, 22.44, 22.44, 22.44]
						];
		var data1List = [
							[2335.1, 2601.5, 2709.0, 2886.2, 8510.1], 
							[1510.1, 1586.2, 1709.0, 1791.5, 1935.1],
							//[1.27, 4.32, 5.10, 5.32, 6.43]
						];

		this.getOption = function(idx) {
			var yAxis = yAxisList[idx];
			var data = dataList[idx];
			var data1 = data1List[idx];
			return {
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
					data: yAxis,
					offset:-10,
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
						data: data1
					  }
				]
			};
		};

		this.setData = function(name) {
			var title = "";
			if (name == '海淀区') {
				title = "海淀区GDP区县排行TOP5";
				this.chart.setOption(this.getOption(1));
				$("#order1-1").hide();
				$("#order1-2").hide();
				$("#order2-1").show();
				$("#order2-2").show();
				$("#order3-1").hide();
				$("#order3-2").hide();
			} 
			// else if (name == '大兴区') {
			// 	title = "大兴区GDP区县排行";
			// 	this.chart.setOption(this.getOption(2));
			// 	$("#order1-1").hide();
			// 	$("#order1-2").hide();
			// 	$("#order2-1").hide();
			// 	$("#order2-2").hide();
			// 	$("#order3-1").show();
			// 	$("#order3-2").show();
			// } 
			else{
				this.chart.setOption(this.getOption(0));
				title = "北京市GDP区县排行TOP5";
				$("#order1-1").show();
				$("#order1-2").show();
				$("#order2-1").hide();
				$("#order2-2").hide();
				$("#order3-1").hide();
				$("#order3-2").hide();
			}
			
			$("#chart3-pane .title").text(title);
		}

		this.chart = echarts.init(document.getElementById("chart3"));
		this.setData(0);
	};

	var Chart4 = function() {

		var datas = [{
			'农林\n牧渔业': [2087.5,2308.2,2504.1,2743.6,3070.34,3343.52],
			'工业': [12281.16,12116.96,11952.75,11788.54,12460.13,12724.69],
			'建筑业': [1315.01,1407.92,1483.84,1620.97,1738.37,1884.79],
			'批发和\n零售业': [1214.96,1434.19,1517.14,1644.77,1752.71,1879.26],
			'交通运输\n仓储和\n邮政业': [972.16,1059.52,1046.88,1094.24,1108.96,1132.4],
			'住宿和\n餐饮业': [552.14,567.5675,582.995,613.85,613.85,670.31],
			'房地产业': [782.36,782.36,792.85,803.34,824.32,900.25],
			'金融业': [496.12,535.85,575.58,655.04,655.04,847.49],
			'其他': [1244.93,1471.6,1789.9,1425.28,5860.61,927.24]
		}, {
			'农林\n牧渔业': [279.48,287.13,294.77,302.45,317.72,348.31],
			'工业': [3543.09,3549.46,3555.85,3562.19,3574.93,3600.4],
			'建筑业': [586.91,603.68,620.44,637.21,670.75,737.82],
			'批发和\n零售业': [581.96,590.05,598.13,606.22,622.39,654.73],
			'交通运输\n仓储和\n邮政业': [232.47,234.69,236.90,239.12,243.56,252.43],
			'住宿和\n餐饮业': [180.06,184.89,189.72,194.55,204.21,223.53],
			'房地产业': [172.94,182.79,192.63,202.47,222.16,261.53],
			'金融业': [191.06,217.21,243.35,269.495,321.78,426.35],
			'其他': [581.96,590.05,598.13,606.22,622.39,654.73]
		}, {
			'农林\n牧渔业': [60.545,62.27,63.995,65.72,69.17,76.07],
			'工业': [122.98,123.44,123.9,124.36,125.28,127.12],
			'建筑业': [30.7725,30.93,31.0875,31.245,31.56,32.19],
			'批发和\n零售业': [30.96,31.48,32,32.52,33.56,35.64],
			'交通运输\n仓储和\n邮政业': [29.5475,29.7,29.8525,30.005,30.31,30.92],
			'住宿和\n餐饮业': [19.3375,19.88,20.4225,20.965,22.05,24.22],
			'房地产业': [13.1475,13.42,13.6925,13.965,14.51,15.6],
			'金融业': [,6.2125,6.84,7.4675,8.095,9.35,11.86],
			'其他': [99.1375,105.42,111.7025,117.985,130.55,155.68]
		}];

		this.getOption = function(dataIdx) {
			var data = datas[dataIdx];
			return {
				tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:['农林\n牧渔业','工业','建筑业','批发和\n零售业','交通运输\n仓储和\n邮政业','住宿和\n餐饮业','房地产业','金融业','其他'],
		        left: 'center',
		        bottom: 0,
		        selected: {
		        	'住宿和\n餐饮业':false,
		        	'房地产业':false,
		        	'金融业':false,
		        	'其他':false
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: 80,
		        borderWidth: 0,
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['2010','2011','2012','2013','2014','2015'],
		            splitLine: {
		            	show: false
		            },
		            axisTick: {
				        show: false
				    }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine: {
		            	show: false
		            },
		            axisTick: {
				        show: false
				    }
		        }
		    ],
		    series : [
		        {
		            name:'农林\n牧渔业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#FFDB4B'
		            	}
		            },
		            data:data['农林\n牧渔业']
		        },
		        {
		            name:'工业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#FB5D6F'
		            	}
		            },
		            data:data['工业']
		        },
		        {
		            name:'建筑业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#4E99FF'
		            	}
		            },
		            data:data['建筑业']
		        },
		        {
		            name:'批发和\n零售业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#6C6FEF'
		            	}
		            },
		            data:data['批发和\n零售业']
		        },
		        {
		            name:'交通运输\n仓储和\n邮政业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#47C668'
		            	}
		            },
		            data:data['交通运输\n仓储和\n邮政业']
		        },
		        {
		            name:'住宿和\n餐饮业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#FF9743'
		            	}
		            },
		            data:data['住宿和\n餐饮业']
		        },
		        {
		            name:'房地产业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#9BD134'
		            	}
		            },
		            data:data['房地产业']
		        },
		        {
		            name:'金融业',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#35C3DB'
		            	}
		            },
		            data:data['金融业']
		        },
		        {
		            name:'其他',
		            type:'bar',
		            itemStyle: {
		            	normal: {
		            		color: '#FF5DBB'
		            	}
		            },
		            data:data['其他']
		        }
		    ]
			};
		};

		this.chart = echarts.init(document.getElementById("chart4"));
		this.chart.setOption(this.getOption(0));

		this.curIdx = 0;

		this.setData = function(name) {
			var title = "";
			if (name == '海淀区') {
				title = "海淀区GDP行业分布情况";
				this.chart.setOption(this.getOption(1));
			} else if (name == '大兴区') {
				title = "大兴区GDP行业分布情况";
				this.chart.setOption(this.getOption(2));
			} else {
				this.chart.setOption(this.getOption(0));
				title = "北京市GDP行业分布情况";
			}
			
			$("#chart4-pane .title").text(title);
		}
	};

	var chart1 = new Chart1();
	var chart2 = new Chart2();
	var chart3 = new Chart3();
	var chart4 = new Chart4();

	var changshaSelected = false;
	var xiangxiSelected = false;
	function toggleChangsha() {
		if (changshaSelected) {
			changshaSelected = false;
			chart2.changeArea('hunan');
			chart3.setData('hunan');
			chart4.setData('hunan');
		} else {
			changshaSelected = true;
			chart2.changeArea('海淀区');
			chart3.setData('海淀区');
			chart4.setData('海淀区');
		}
	}

	function toggleXiangXi() {
		if (xiangxiSelected) {
			xiangxiSelected = false;
			chart2.changeArea('hunan');
			chart3.setData('hunan');
			chart4.setData('hunan');
		} else {
			xiangxiSelected = true;
			chart2.changeArea('大兴区');
			chart3.setData('大兴区');
			chart4.setData('大兴区');
		}
	}

	chart1.chart.on('click', function(params) {
		if (params.name == '海淀区') {
			toggleChangsha();
		} else if (params.name == '大兴区') {
			toggleXiangXi();
		} else {
			chart2.changeArea('hunan');
			chart3.setData('hunan');
			chart4.setData('hunan');
			changshaSelected = false;
			xiangxiSelected = false;
		}
		
	});
});
