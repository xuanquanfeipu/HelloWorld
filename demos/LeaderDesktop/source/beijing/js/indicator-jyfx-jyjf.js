 var curNav="nav_2";
$(document).ready(function() {

	// 全市教育经费
	var Chart1 = function() {

		var yearList = [2011,2012,2013,2014,2015];

		var industry1DataList = [661.99,784.04,886.62,1056.37,1100.68];
		var industry2DataList = [32.99,40.04,55.62,44.78,60.22];
		var industry3DataList = [12.24,18.78,20.51,32.95,30.654];
		var industry1GrowthList = [40.88,44.78,46.44,70.48,59.421];
		var industry2GrowthList = [110.99,156.23,254.13,200.42,210.841];

		var legenderList = ['国家财政性教育经费', '民办学校中举办者投入', '社会捐赠经费', '事业收入', '其他教育经费'];

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
					splitLine: {
				          show: false
				        },
					data: years
				}],
				yAxis: [{
					type: 'value',
					name: '金额(亿元)',
					splitLine: {
				          show: false
				        },
					axisLabel: {
						formatter: '{value}'
					}
				}],
				series: [{
					name: '国家财政性教育经费',
					type: 'bar',
					data: ind1List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#ffc928'
						}
					}
				}, {
					name: '民办学校中举办者投入',
					type: 'bar',
					data: ind2List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#0fbd5c'
						}
					}
				}, {
					name: '社会捐赠经费',
					type: 'bar',
					data: ind3List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#564fbe'
						}
					}
				}, {
					name: '事业收入',
					type: 'bar',
					data: ind1GrwList,
					itemStyle: {
						normal: {
							color: '#21a0db'
						}
					}
				}, {
					name: '其他教育经费',
					type: 'bar',
					data: ind2GrwList,
					itemStyle: {
						normal: {
							color: '#0fbd5c'
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

