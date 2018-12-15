 var curNav="nav_2";
$(document).ready(function() {

	// 全市GDP及产业分布
	var Chart1 = function() {

		var yearList = [2011,2012,2013,2014,2015];

		var industry1DataList = [106.79,108.22,110.08,113.63,118.06];
		var industry2DataList = [31.02,32.51,32.65,34.53,36];
		var industry3DataList = [28.42,30.68,29.44,29.59,30.05];
		var industry1GrowthList = [30.87,32.47,31.05,31.02,32.51];

		var legenderList = ['在校人数', '招生人数', '毕业人数', '预计毕业人数'];

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
					},splitLine: {
				          show: false
				        },
					data: years
				}],
				yAxis: [{
					type: 'value',
					name: '数量(万人)',
					axisLabel: {
						formatter: '{value}'
					},splitLine: {
				          show: false
				        }
				}],
				series: [{
					name: '在校人数',
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
					name: '招生人数',
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
					name: '毕业人数',
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
					name: '预计毕业人数',
					type: 'bar',
					data: ind1GrwList,
					itemStyle: {
						normal: {
							color: '#21a0db'
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

