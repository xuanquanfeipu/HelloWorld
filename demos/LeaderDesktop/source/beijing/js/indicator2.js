var curNav="nav_0";
$(document).ready(function() {
	// 全市GDP及产业分布
	var Chart1 = function() {
		var yearList = [2010,2011,2012,2013,2014,2015];
		var industry1DataList = [2325.50,2768.03,3004.21,2990.31,3148.75,3287.26];
		var industry2DataList = [7343.19,9361.99,10506.42,11553.97,12482.06,14589.5];
		var industry3DataList = [6369.27,7539.54,8643.60,10077.39,11406.51,12550.16];
		var industry1GrowthList = [18.04,19.03,8.53,-0.46,5.30,5.81];
		var industry2GrowthList = [29.12,27.49,12.22,9.97,8.03,2.63];
		var industry3GrowthList = [17.89,18.37,14.64,16.29,13.19,11.86];
		var legenderList = ['第一产业', '第二产业', '第三产业', '第一产业增长率', '第二产业增长率', '第三产业增长率'];
		this.getOption = function(years, unselectedLegenders) {
			if (!years) {
				years = yearList;
			}
			var ind1List = [];
			var ind2List = [];
			var ind3List = [];
			var ind1GrwList = [];
			var ind2GrwList = [];
			var ind3GrwList = [];			
			for (var i=0; i<years.length; i++) {
				var year = parseInt(years[i]);
				for (var j=0; j<yearList.length; j++) {
					if (yearList[j] == year) {
						ind1List.push(industry1DataList[j]);
						ind2List.push(industry2DataList[j]);
						ind3List.push(industry3DataList[j]);
						ind1GrwList.push(industry1GrowthList[j]);
						ind2GrwList.push(industry2GrowthList[j]);
						ind3GrwList.push(industry3GrowthList[j]);
					}
				}
			}
			if (!unselectedLegenders) {
				unselectedLegenders = {};
			}			
			return {
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: legenderList,
					selected: unselectedLegenders
				},
				xAxis: [{
					type: 'category',
					axisLabel: {
						rotate: 0
					},
		            axisTick: {
			            show: false
			        },
					data: years
				}],
				yAxis: [{
					type: 'value',
					name: '数量：亿元',
					axisLabel: {
						formatter: '{value}'
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
		            axisTick: {
			            show: false
			        }
				}],
				series: [{
					name: '第一产业',
					type: 'bar',
					data: ind1List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#3BD8AB'
						}
					}
				}, {
					name: '第二产业',
					type: 'bar',
					data: ind2List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#CB65BB'
						}
					}
				}, {
					name: '第三产业',
					type: 'bar',
					data: ind3List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#574FBE'
						}
					}
				}, {
					name: '第一产业增长率',
					type: 'line',
					yAxisIndex: 1,
					data: ind1GrwList,
					itemStyle: {
						normal: {
							color: '#139819'
						}
					}
				}, {
					name: '第二产业增长率',
					type: 'line',
					yAxisIndex: 1,
					data: ind2GrwList,
					itemStyle: {
						normal: {
							color: '#e08c07'
						}
					}
				}, {
					name: '第三产业增长率',
					type: 'line',
					yAxisIndex: 1,
					data: ind3GrwList,
					itemStyle: {
						normal: {
							color: '#1286c3'
						}
					}
				}]
			};
		};

		this.updateChart = function() {
			var years = [];
			$("#c21-datatbl thead i.checked-btn").each(function() {
				years.push($(this).attr("year"));
			});
			years = years.reverse();

			var unselectedLegenders = {};
			$("#c21-datatbl tbody i.uncheck-btn").each(function() {
				var legenderName = $(this).attr("legender");
				unselectedLegenders[legenderName] = false;
			});
			var options = this.getOption(years, unselectedLegenders);
			this.chart.clear();
			this.chart.setOption(options);
		}

		this.chart = echarts.init(document.getElementById("chart1"));
		this.updateChart();
	};
	
	var chart1 = new Chart1();

	$(window).resize(function() {
		chart1.chart.resize();
	});


	$("#c21-datatbl i.checked-btn, #c21-datatbl i.uncheck-btn").click(function() {		
		var self = $(this);		
		if (self.hasClass("checked-btn")) {
			self.removeClass("checked-btn").addClass("uncheck-btn");
		} else {
			self.removeClass("uncheck-btn").addClass("checked-btn");
		}

		if (self.attr("id") == 'cbxall') {
			if (self.hasClass("checked-btn")) {
				$("#c21-datatbl i.uncheck-btn").removeClass("uncheck-btn").addClass("checked-btn");				
			} else {
				return;
			}
		} 
		chart1.updateChart();
	});
});

